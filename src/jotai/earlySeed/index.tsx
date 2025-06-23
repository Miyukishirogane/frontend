import { atom, useAtomValue, useSetAtom } from 'jotai';
import { appStore } from '../AppStore';
import { readContracts, getBalance } from 'wagmi/actions';
import { configEvmChain, contractAddress } from '../wallet/config';
import { useChainId, useClient } from 'wagmi';
import { TEARLYSEED, TEARLYSEEDDETAIL } from './type';
import { abiEarlySeedSpecialUser } from '../wallet/abi/EarlySeedSpecialUser';
import { abiEarlySeedTrava } from '../wallet/abi/EarlySeed';
import { BN } from 'src/utils';
import { Address } from 'viem';
import BigNumber from 'bignumber.js';
import { configTokenEarlySeed } from 'src/constants/mapTokenToIcon';
import useAccount from 'src/hooks/useAccount';

export type TEarlySeedInfo = {
  messError?: boolean;
  dataList: TEARLYSEED[] | [];
  detail: TEARLYSEEDDETAIL | object;
  loading?: boolean;
  error?: Error | null;
  checkJoin?: number[] | [];
  check?: boolean;
  loadingBtn?: number | null;
  balance: { [key: string]: BigNumber };
  user: 'special' | 'trava' | null;
  claimeAmount: {
    specical?: string;
    trava?: string;
  };
  withdrawableAmount: {
    specical?: string;
    trava?: string;
  };
  checkTrava: boolean;
};

const state = atom<TEarlySeedInfo>({
  messError: false,
  loading: false,
  error: null,
  check: false,
  loadingBtn: null,
  balance: {},
  user: null,
  claimeAmount: {},
  withdrawableAmount: {},
  checkJoin: [],
  checkTrava: false,
} as TEarlySeedInfo);

appStore.set(state, {
  detail: {},
  messError: false,
  loading: false,
  error: null,
  dataList: [],
  check: false,
  loadingBtn: null,
  balance: {},
  user: null,
  claimeAmount: {},
  withdrawableAmount: {},
  checkJoin: [],
  checkTrava: false,
});

export const useEarlySeed = () => useAtomValue(state);

export const useEarlySeedFunction = () => {
  const _setState = useSetAtom(state);
  const { address } = useAccount();
  const client = useClient();
  const chainIdSelected = useChainId();

  const TCVEARLYSEEDSPECIALUSER = contractAddress[chainIdSelected].TCV_EARLY_SEED_SPECIAL_USER;
  const TCVEARLYSEEDTRAVA = contractAddress[chainIdSelected].TCV_EARLY_SEED_TRAVA_USERS;

  // dùng để update hết
  async function updateData(key: string, data: string | boolean | number[] | []) {
    _setState((prev) => {
      return {
        ...prev,
        [key]: data,
      };
    });
  }

  async function getDataInfoByContract(userType?: 'special' | 'trava' | null) {
    const abi = userType === 'special' ? abiEarlySeedSpecialUser : abiEarlySeedTrava;
    const tcvEarlySeed = userType === 'special' ? TCVEARLYSEEDSPECIALUSER : TCVEARLYSEEDTRAVA;

    const TCVPrice = await readContracts(configEvmChain, {
      contracts: [
        {
          abi: abi,
          address: tcvEarlySeed,
          functionName: 'getTCVPrice',
          args: [],
        },
      ],
    });

    const terms = await readContracts(configEvmChain, {
      contracts: [
        {
          abi: abi,
          address: tcvEarlySeed,
          functionName: 'terms',
          args: [],
        },
      ],
    });

    const totalDebt = await readContracts(configEvmChain, {
      contracts: [
        {
          abi: abi,
          address: tcvEarlySeed,
          functionName: 'totalDebt',
          args: [],
        },
      ],
    });

    return { TCVPrice, terms, totalDebt };
  }

  async function getDataList(check?: 'special' | 'trava' | null) {
    _setState((prev: TEarlySeedInfo) => ({
      ...prev,
      error: null,
      loading: true,
    }));
    try {
      if (address) {
        const { TCVPrice: TCVPriceTrava, terms: termsTrava, totalDebt: totalDebtTrava } = await getDataInfoByContract(check);

        const datagetTrava = {
          user: 'trava',
          tcvPrice: BN(TCVPriceTrava[0]?.result || '0').toFixed(0) || '',
          totalDebt: BN(totalDebtTrava[0]?.result || '0').toFixed(0) || '',
          terms: {
            buyingTimeStart: BN((termsTrava[0]?.result && termsTrava[0].result[0]) || '0').toFixed(0) || '',
            buyingTime: BN((termsTrava[0]?.result && termsTrava[0].result[1]) || '0').toFixed(0) || '',
            cliffingTimeStart: BN((termsTrava[0]?.result && termsTrava[0].result[2]) || '0').toFixed(0) || '',
            cliffingTerm: BN((termsTrava[0]?.result && termsTrava[0].result[3]) || '0').toFixed(0) || '',
            vestingTimeStart: BN((termsTrava[0]?.result && termsTrava[0].result[4]) || '0').toFixed(0) || '',
            vestingTerm: BN((termsTrava[0]?.result && termsTrava[0].result[5]) || '0').toFixed(0) || '',
            discountRatio: BN((termsTrava[0]?.result && termsTrava[0].result[6]) || '0').toFixed(0) || '',
            maxDebt: BN((termsTrava[0]?.result && termsTrava[0].result[7]) || '0').toFixed(0) || '',
            maxPayout: BN((termsTrava[0]?.result && termsTrava[0].result[8]) || '0').toFixed(0) || '',
            TGE: BN((termsTrava[0]?.result && termsTrava[0].result[9]) || '0').toFixed(0) || '',
          },
        } as TEARLYSEED;

        if (check === 'special') {
          const { TCVPrice, terms, totalDebt } = await getDataInfoByContract(check);

          const { TCVPrice: TCVPriceTrava, terms: termsTrava, totalDebt: totalDebtTrava } = await getDataInfoByContract('trava');

          const dataget = {
            user: 'special',
            tcvPrice: BN(TCVPrice[0]?.result || '0').toFixed(0) || '',
            totalDebt: BN(totalDebt[0]?.result || '0').toFixed(0) || '',
            terms: {
              buyingTimeStart: BN((terms[0]?.result && terms[0].result[0]) || '0').toFixed(0) || '',
              buyingTime: BN((terms[0]?.result && terms[0].result[1]) || '0').toFixed(0) || '',
              cliffingTimeStart: BN((terms[0]?.result && terms[0].result[2]) || '0').toFixed(0) || '',
              cliffingTerm: BN((terms[0]?.result && terms[0].result[3]) || '0').toFixed(0) || '',
              vestingTimeStart: BN((terms[0]?.result && terms[0].result[4]) || '0').toFixed(0) || '',
              vestingTerm: BN((terms[0]?.result && terms[0].result[5]) || '0').toFixed(0) || '',
              discountRatio: BN((terms[0]?.result && terms[0].result[6]) || '0').toFixed(0) || '',
              maxDebt: BN((terms[0]?.result && terms[0].result[7]) || '0').toFixed(0) || '',
              maxPayout: BN((terms[0]?.result && terms[0].result[8]) || '0').toFixed(0) || '',
              TGE: BN((terms[0]?.result && terms[0].result[9]) || '0').toFixed(0) || '',
            },
          } as TEARLYSEED;

          const datagetTrava = {
            user: 'trava',
            tcvPrice: BN(TCVPriceTrava[0]?.result || '0').toFixed(0) || '',
            totalDebt: BN(totalDebtTrava[0]?.result || '0').toFixed(0) || '',
            terms: {
              buyingTimeStart: BN((termsTrava[0]?.result && termsTrava[0].result[0]) || '0').toFixed(0) || '',
              buyingTime: BN((termsTrava[0]?.result && termsTrava[0].result[1]) || '0').toFixed(0) || '',
              cliffingTimeStart: BN((termsTrava[0]?.result && termsTrava[0].result[2]) || '0').toFixed(0) || '',
              cliffingTerm: BN((termsTrava[0]?.result && termsTrava[0].result[3]) || '0').toFixed(0) || '',
              vestingTimeStart: BN((termsTrava[0]?.result && termsTrava[0].result[4]) || '0').toFixed(0) || '',
              vestingTerm: BN((termsTrava[0]?.result && termsTrava[0].result[5]) || '0').toFixed(0) || '',
              discountRatio: BN((termsTrava[0]?.result && termsTrava[0].result[6]) || '0').toFixed(0) || '',
              maxDebt: BN((termsTrava[0]?.result && termsTrava[0].result[7]) || '0').toFixed(0) || '',
              maxPayout: BN((termsTrava[0]?.result && termsTrava[0].result[8]) || '0').toFixed(0) || '',
              TGE: BN((termsTrava[0]?.result && termsTrava[0].result[9]) || '0').toFixed(0) || '',
            },
          } as TEARLYSEED;

          const checkBondTrava = await readContracts(configEvmChain, {
            contracts: [
              {
                abi: abiEarlySeedTrava,
                address: TCVEARLYSEEDTRAVA,
                functionName: 'getBondInfo',
                args: [address],
              },
            ],
          });

          if (TCVPrice[0]?.status !== 'failure' && TCVPriceTrava[0]?.status !== 'failure') {
            // console.log('TCVPrice', TCVPrice, TCVPriceTrava);
            _setState((prev: TEarlySeedInfo) => ({
              ...prev,
              dataList: [{ ...datagetTrava }, { ...dataget }],
              loading: false,
              checkTrava: (checkBondTrava[0]?.result && checkBondTrava[0].result.isTravaHolder) || false,
            }));
          } else if (TCVPrice[0]?.status === 'failure' && TCVPriceTrava[0]?.status !== 'failure') {
            _setState((prev: TEarlySeedInfo) => ({
              ...prev,
              dataList: [{ ...datagetTrava }],
              loading: false,
              checkTrava: (checkBondTrava[0]?.result && checkBondTrava[0].result.isTravaHolder) || false,
            }));
          } else if (TCVPrice[0]?.status !== 'failure' && TCVPriceTrava[0]?.status === 'failure') {
            _setState((prev: TEarlySeedInfo) => ({
              ...prev,
              dataList: [{ ...dataget }],
              loading: false,
              checkTrava: (checkBondTrava[0]?.result && checkBondTrava[0].result.isTravaHolder) || false,
            }));
          } else {
            _setState((prev: TEarlySeedInfo) => ({
              ...prev,
              dataList: [],
              loading: false,
              checkTrava: (checkBondTrava[0]?.result && checkBondTrava[0].result.isTravaHolder) || false,
            }));
          }

          return;
        }

        if (TCVPriceTrava[0]?.status !== 'failure') {
          _setState((prev: TEarlySeedInfo) => ({
            ...prev,
            dataList: [{ ...datagetTrava }],
            loading: false,
            checkTrava: true,
          }));
        } else {
          _setState((prev: TEarlySeedInfo) => ({
            ...prev,
            dataList: [],
            loading: false,
            checkTrava: true,
          }));
        }
      }
    } catch (err) {
      _setState((prev: TEarlySeedInfo) => ({
        ...prev,
        loading: false,
        error: err as Error,
      }));
    }
  }

  async function getBondInfo(item: TEARLYSEEDDETAIL, userProps: 'special' | 'trava' | null, index?: number) {
    if (address) {
      _setState((prev: TEarlySeedInfo) => ({
        ...prev,
        error: null,
        loadingBtn: index,
      }));

      getNativeTokenBalance(configTokenEarlySeed[chainIdSelected]['USDT'].address as Address);
      getNativeTokenBalance(configTokenEarlySeed[chainIdSelected]['TCV'].address as Address);

      if (userProps === 'special') {
        const checkBond = await readContracts(configEvmChain, {
          contracts: [
            {
              abi: abiEarlySeedSpecialUser,
              address: TCVEARLYSEEDSPECIALUSER,
              functionName: 'getBondInfo',
              args: [address],
            },
          ],
        });

        const getClaimedAmount = await readContracts(configEvmChain, {
          contracts: [
            {
              abi: abiEarlySeedSpecialUser,
              address: TCVEARLYSEEDSPECIALUSER,
              functionName: 'getClaimedAmount',
              args: [address],
            },
          ],
        });

        const getWithdrawableAmount = await readContracts(configEvmChain, {
          contracts: [
            {
              abi: abiEarlySeedSpecialUser,
              address: TCVEARLYSEEDSPECIALUSER,
              functionName: 'getWithdrawableAmount',
              args: [address],
            },
          ],
        });

        const getPayOut = await readContracts(configEvmChain, {
          contracts: [
            {
              abi: abiEarlySeedSpecialUser,
              address: TCVEARLYSEEDSPECIALUSER,
              functionName: 'getPayout',
              args: [BigInt(BN((checkBond[0]?.result && checkBond[0].result.userLimit) || '0').toFixed(0))],
            },
          ],
        });

        if (!BN(checkBond[0]?.result?.userLimit || '0').isEqualTo(BN(0))) {
          _setState((prev: TEarlySeedInfo) => ({
            ...prev,
            error: null,
            check: true,
            user: 'special',
            detail: {
              ...item,
              getBondInfo: {
                amountClaim: BN((checkBond[0]?.result && checkBond[0].result.amountClaim) || '0').toFixed(0) || '',
                lastBlock: BN((checkBond[0]?.result && checkBond[0].result.lastBlock) || '0').toFixed(0) || '',
                payout: BN((checkBond[0]?.result && checkBond[0].result.payout) || '0').toFixed(0) || '',
                pricePaid: BN((checkBond[0]?.result && checkBond[0].result.pricePaid) || '0').toFixed(0) || '',
                totalBought: BN((checkBond[0]?.result && checkBond[0].result.totalBought) || '0').toString() || '',
                userLimit: BN((checkBond[0]?.result && checkBond[0].result.userLimit) || '0').toFixed(0) || '',
                vesting: BN((checkBond[0]?.result && checkBond[0].result.vesting) || '0').toFixed(0) || '',
              },
              getPayOut: BN(getPayOut[0]?.result || '0').toFixed(0) || '',
            },
            claimeAmount: {
              specical: BN(getClaimedAmount[0]?.result || '0').toFixed(0) || '',
            },
            withdrawableAmount: {
              specical: BN(getWithdrawableAmount[0]?.result || '0').toString() || '',
            },
            loadingBtn: null,
          }));
        } else {
          _setState((prev: TEarlySeedInfo) => {
            console.log('prev', prev);

            return {
              ...prev,
              error: null,
              check: false,
              loadingBtn: null,
              checkJoin: index
                ? prev?.checkJoin && prev?.checkJoin?.filter((item) => item === index).length <= 0
                  ? [...prev.checkJoin, index]
                  : prev?.checkJoin && prev?.checkJoin?.filter((item) => item === index).length > 0
                  ? [...prev.checkJoin]
                  : [index]
                : prev?.checkJoin,
              user: 'special',
            };
          });
        }
      } else {
        const checkBondTrava = await readContracts(configEvmChain, {
          contracts: [
            {
              abi: abiEarlySeedTrava,
              address: TCVEARLYSEEDTRAVA,
              functionName: 'getBondInfo',
              args: [address],
            },
          ],
        });

        const getClaimedAmountTrava = await readContracts(configEvmChain, {
          contracts: [
            {
              abi: abiEarlySeedTrava,
              address: TCVEARLYSEEDTRAVA,
              functionName: 'getClaimedAmount',
              args: [address],
            },
          ],
        });

        const getWithdrawableAmountTrava = await readContracts(configEvmChain, {
          contracts: [
            {
              abi: abiEarlySeedTrava,
              address: TCVEARLYSEEDTRAVA,
              functionName: 'getWithdrawableAmount',
              args: [address],
            },
          ],
        });

        _setState((prev: TEarlySeedInfo) => ({
          ...prev,
          error: null,
          check: true,
          user: 'trava',
          detail: {
            ...item,
            getBondInfoTrava: {
              amountClaim: BN((checkBondTrava[0]?.result && checkBondTrava[0].result.amountClaim) || '0').toFixed(0) || '',
              isTravaHolder: checkBondTrava[0]?.result && checkBondTrava[0].result.isTravaHolder,
              lastBlock: BN((checkBondTrava[0]?.result && checkBondTrava[0].result.lastBlock) || '0').toFixed(0) || '',
              payout: BN((checkBondTrava[0]?.result && checkBondTrava[0].result.payout) || '0').toFixed(0) || '',
              pricePaid: BN((checkBondTrava[0]?.result && checkBondTrava[0].result.pricePaid) || '0').toFixed(0) || '',
              totalBought: BN((checkBondTrava[0]?.result && checkBondTrava[0].result.totalBought) || '0').toString() || '',
              vesting: BN((checkBondTrava[0]?.result && checkBondTrava[0].result.vesting) || '0').toFixed(0) || '',
            },
          },
          claimeAmount: {
            trava: BN(getClaimedAmountTrava[0]?.result || '0').toFixed(0) || '',
          },
          withdrawableAmount: {
            trava: BN(getWithdrawableAmountTrava[0]?.result || '0').toString() || '',
          },
          loadingBtn: null,
        }));
      }
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

          _setState((prev) => {
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
          _setState((prev) => {
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

  async function ClearAll() {
    _setState((prev) => {
      return {
        ...prev,
        detail: {},
        messError: false,
        loading: false,
        error: null,
        dataList: [],
        check: false,
        loadingBtn: null,
        balance: {},
        user: null,
        claimeAmount: {},
        withdrawableAmount: {},
        checkTrava: false,
      };
    });
  }
  return {
    updateData,
    getDataList,
    getBondInfo,
    ClearAll,
  };
};
