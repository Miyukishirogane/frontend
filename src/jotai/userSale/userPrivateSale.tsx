import { atom, useAtomValue, useSetAtom } from 'jotai';
import { appStore } from '../AppStore';
import { LoginSale } from 'src/services/api/loginSale';
import { Bounce, toast } from 'react-toastify';
import { readContracts, getBalance } from 'wagmi/actions';
import { configEvmChain, contractAddress } from '../wallet/config';
import { abiPrivateSale } from '../wallet/abi/PrivateSale';
import { TPRIVATESALE, TDETAIL } from './type';
import { useModalJoinInction } from '../modals/ModalJoinIn/ModalJoinIn';
import { BN } from 'src/utils';
import { useAccount, useClient, useChainId } from 'wagmi';
import BigNumber from 'bignumber.js';
import { Address } from 'viem';

export type TUserPrivateSaleInfo = {
  name?: string;
  url?: string;
  messError?: boolean;
  dataList: TPRIVATESALE[] | [];
  detail: TDETAIL | object;
  loading?: boolean;
  loadingPage?: boolean;
  error?: Error | null;
  balance: { [key: string]: BigNumber };
};

const state = atom<TUserPrivateSaleInfo>({
  url: '',
  name: '',
  messError: false,
  loading: false,
  loadingPage: false,
  error: null,
  balance: {},
} as TUserPrivateSaleInfo);
appStore.set(state, {
  url: '',
  name: '',
  detail: {},
  balance: {},
  messError: false,
  loading: false,
  loadingPage: false,
  error: null,
  dataList: [],
});

export const useUserPrivateSale = () => useAtomValue(state);

export const useUserPrivateSaleFunction = () => {
  const _setState = useSetAtom(state);
  const { address } = useAccount();
  const client = useClient();
  const chainIdSelected = useChainId();
  const { closeModal } = useModalJoinInction();

  const TCVTCVPRIVATESALEROUTER = contractAddress[chainIdSelected].TCV_PRIVATE_SALE;

  function setState(data: Partial<TUserPrivateSaleInfo>) {
    _setState(prev => {
      return {
        ...prev,
        ...data,
      };
    });
  }

  async function clearState() {
    _setState(prev => {
      return {
        ...prev,
        url: '',
        name: '',
        messError: false,
        loading: false,
        loadingPage: false,
        error: null,
        detail: {},
        dataList: [],
      };
    });
  }

  async function postLogin(param: { password: string; url: string }) {
    _setState(prev => ({
      ...prev,
      loading: true,
    }));
    try {
      const response = (await LoginSale({ password: param.password, url: param.url })) as any;

      if (response?.response) {
        if (response?.response?.status !== 200 && response?.response?.status !== 401) {
          toast.error(response?.message || '', {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
            transition: Bounce,
          });
          _setState((prev: TUserPrivateSaleInfo) => ({
            ...prev,
            loading: false,
          }));
        } else if (response?.response?.status === 401) {
          _setState((prev: TUserPrivateSaleInfo) => ({
            ...prev,
            messError: true,
            loading: false,
          }));
        }
      } else {
        sessionStorage.setItem('PrivateSaleToken', response.token);
        getDataList();
      }
    } catch (err) {
      _setState((prev: TUserPrivateSaleInfo) => ({
        ...prev,
        loading: false,
      }));
    }
  }

  async function getStateAllVaultsPrivateSaleData() {
    _setState((prev: TUserPrivateSaleInfo) => ({
      ...prev,
      error: null,
      loadingPage: true,
    }));
    try {
      const checkPrivateSale = sessionStorage.getItem('PrivateSaleToken');
      if (checkPrivateSale) {
        getDataList();
      } else {
        _setState((prev: TUserPrivateSaleInfo) => ({
          ...prev,
          loadingPage: false,
          error: null,
        }));
      }
    } catch (err) {
      _setState((prev: TUserPrivateSaleInfo) => ({
        ...prev,
        loadingPage: false,
        error: err as Error,
      }));
    }
  }

  async function getDataList() {
    _setState((prev: TUserPrivateSaleInfo) => ({
      ...prev,
      error: null,
      loadingPage: true,
    }));
    try {
      const TCVPrice = await readContracts(configEvmChain, {
        contracts: [
          {
            abi: abiPrivateSale,
            address: TCVTCVPRIVATESALEROUTER,
            functionName: 'getTCVPrice',
            args: [],
          },
        ],
      });

      const bondPrice = await readContracts(configEvmChain, {
        contracts: [
          {
            abi: abiPrivateSale,
            address: TCVTCVPRIVATESALEROUTER,
            functionName: 'bondPrice',
            args: [],
          },
        ],
      });

      const terms = await readContracts(configEvmChain, {
        contracts: [
          {
            abi: abiPrivateSale,
            address: TCVTCVPRIVATESALEROUTER,
            functionName: 'terms',
            args: [],
          },
        ],
      });

      const dataget = {
        tcvPrice: BN(TCVPrice[0]?.result || '0').toFixed(0) || '',
        bondPrice: BN(bondPrice[0]?.result || '0').toFixed(0) || '',
        terms: {
          buyingTimeStart: BN((terms[0]?.result && terms[0].result[0]) || '0').toFixed(0) || '',
          buyingTime: BN((terms[0]?.result && terms[0].result[1]) || '0').toFixed(0) || '',
          vestingTimeStart: BN((terms[0]?.result && terms[0].result[2]) || '0').toFixed(0) || '',
          vestingTerm: BN((terms[0]?.result && terms[0].result[3]) || '0').toFixed(0) || '',
          discountRatio: BN((terms[0]?.result && terms[0].result[4]) || '0').toFixed(0) || '',
          maxDebt: BN((terms[0]?.result && terms[0].result[5]) || '0').toFixed(0) || '',
          maxPayout: BN((terms[0]?.result && terms[0].result[6]) || '0').toFixed(0) || '',
          TGE: BN((terms[0]?.result && terms[0].result[7]) || '0').toFixed(0) || '',
        },
      } as TPRIVATESALE;
      if (TCVPrice[0]?.status !== 'failure') {
        _setState((prev: TUserPrivateSaleInfo) => ({
          ...prev,
          dataList: [{ ...dataget }],
          loadingPage: false,
        }));
      } else {
        _setState((prev: TUserPrivateSaleInfo) => ({
          ...prev,
          dataList: [],
          loadingPage: false,
        }));
      }
      closeModal();
    } catch (err) {
      console.log('err', err);
      _setState((prev: TUserPrivateSaleInfo) => ({
        ...prev,
        error: null,
        loadingPage: false,
      }));
    }
  }

  async function getDetail(item?: TPRIVATESALE) {
    try {
      _setState((prev: TUserPrivateSaleInfo) => ({
        ...prev,
        loadingPage: true,
      }));
      if (address) {
        const ClaimedAmount = await readContracts(configEvmChain, {
          contracts: [
            {
              abi: abiPrivateSale,
              address: TCVTCVPRIVATESALEROUTER,
              functionName: 'getClaimedAmount',
              args: [address],
            },
          ],
        });

        const WithdrawableAmount = await readContracts(configEvmChain, {
          contracts: [
            {
              abi: abiPrivateSale,
              address: TCVTCVPRIVATESALEROUTER,
              functionName: 'getWithdrawableAmount',
              args: [address],
            },
          ],
        });

        const bondInfo = await readContracts(configEvmChain, {
          contracts: [
            {
              abi: abiPrivateSale,
              address: TCVTCVPRIVATESALEROUTER,
              functionName: 'bondInfo',
              args: [address],
            },
          ],
        });

        const totalDebt = await readContracts(configEvmChain, {
          contracts: [
            {
              abi: abiPrivateSale,
              address: TCVTCVPRIVATESALEROUTER,
              functionName: 'totalDebt',
              args: [],
            },
          ],
        });

        getNativeTokenBalance('0x5Af7c16A7c2A8DD5126b1a3B4bF31094bdd395F5');
        getNativeTokenBalance('0xc7cc017cbae97e9fcf04feb10b2b855cc3809112');

        _setState((prev: TUserPrivateSaleInfo) => ({
          ...prev,
          detail: {
            ...prev.detail,
            ...item,
            received: BN(ClaimedAmount[0]?.result || '0').toFixed(0) || '',
            withdrawable: BN(WithdrawableAmount[0]?.result || '0').toFixed(0) || '',
            bondInfo: {
              totalBought: BN((bondInfo[0]?.result && bondInfo[0].result[0]) || '0').toFixed(0) || '',
              amountClaim: BN((bondInfo[0]?.result && bondInfo[0].result[1]) || '0').toFixed(0) || '',
              payout: BN((bondInfo[0]?.result && bondInfo[0].result[2]) || '0').toFixed(0) || '',
              vesting: BN((bondInfo[0]?.result && bondInfo[0].result[3]) || '0').toFixed(0) || '',
              lastBlock: BN((bondInfo[0]?.result && bondInfo[0].result[4]) || '0').toFixed(0) || '',
              pricePaid: BN((bondInfo[0]?.result && bondInfo[0].result[5]) || '0').toFixed(0) || '',
            },
            totalDebt: BN(totalDebt[0]?.result || '0').toFixed(0) || '',
          },
          loading: false,
          loadingPage: false,
        }));
      } else {
        _setState((prev: TUserPrivateSaleInfo) => ({
          ...prev,
          detail: {
            ...prev.detail,
            ...item,
          },
          loading: false,
        }));
      }
    } catch (err) {
      console.log('err', err);
    }
  }

  async function getNativeTokenBalance(tokenSelect?: Address) {
    try {
      if (address) {
        if (tokenSelect) {
          const balanceNativeSelect = await getBalance(configEvmChain, {
            address: address,
            token: tokenSelect,
          });

          const nativeTokenSymbolSelect = balanceNativeSelect.symbol;

          _setState(prev => {
            return {
              ...prev,
              balance: {
                ...prev.balance,
                [nativeTokenSymbolSelect]: BN(balanceNativeSelect.value).div(BN(10).pow(balanceNativeSelect.decimals)),
              },
            };
          });
        } else {
          const balanceNative = await getBalance(configEvmChain, {
            address: address,
          });
          const nativeTokenSymbol = client.chain.nativeCurrency.symbol;
          _setState(prev => {
            return {
              ...prev,
              balance: {
                ...prev.balance,
                [nativeTokenSymbol]: BN(balanceNative.value).div(BN(10).pow(balanceNative.decimals)),
              },
            };
          });
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  return {
    setState,
    postLogin,
    clearState,
    getDataList,
    getDetail,
    getNativeTokenBalance,
    getStateAllVaultsPrivateSaleData,
  };
};
