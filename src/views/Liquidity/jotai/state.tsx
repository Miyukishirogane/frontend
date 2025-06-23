import BigNumber from 'bignumber.js';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { TTokenInfo, getListVaultByChainId } from 'src/services/api/liquidity';
import { BN, sleep } from 'src/utils';
import { useChainId, useClient } from 'wagmi';
import { TAccordionVaultState, TAddLiquidState, TRemoveLiquidState } from './type';
import { UniswapV3 } from 'tcv-platform-sdk/src/uniswapv3';
import { getBalance, readContracts } from 'wagmi/actions';
import { configEvmChain } from 'src/jotai/wallet/config';
import { Address, erc20Abi } from 'viem';
import { fetchDataChart } from '../../../services/api/fetchDataChart';
import { FeeUtil } from 'tcv-platform-sdk';
import { TVaultRawData } from 'src/services/api/liquidity';
import useAccount from 'src/hooks/useAccount';

export type TLiquidityDataState = {
  loading: boolean;
  error: Error | null;
  listVault: TAccordionVaultState[];
  isFetchingBalance: boolean;
  isFetchingRate: boolean;
  isFetchingUserVaultData: boolean;
  balance: { [key: string]: BigNumber };
  priceTokens: { [key: string]: BigNumber };
};

export const liquidityStateData = atom<TLiquidityDataState>({
  loading: true,
  isFetchingRate: true,
  error: null,
  listVault: [],
  balance: {},
  isFetchingBalance: true,
  priceTokens: {},
  isFetchingUserVaultData: false,
} as TLiquidityDataState);

export const useLiquidityData = () => useAtomValue(liquidityStateData);

export const viewAtom = atom(0);

export const useLiquidityFunction = () => {
  const setLiquidityStateData = useSetAtom(liquidityStateData);
  const chainIdSelected = useChainId();
  const { address } = useAccount();
  const client = useClient();

  function isCanChangeToNativeToken(token: string) {
    return token == 'WETH';
  }

  async function getNativeTokenBalance() {
    try {
      if (address) {
        const balanceNative = await getBalance(configEvmChain, { address: address });
        const nativeTokenSymbol =
          chainIdSelected == 97 ? client.chain.nativeCurrency.name : client.chain.nativeCurrency.symbol;

        setLiquidityStateData(prev => {
          return {
            ...prev,
            balance: {
              ...prev.balance,
              [nativeTokenSymbol]: BN(balanceNative.value).div(BN(10).pow(balanceNative.decimals)),
            },
          };
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  function changeAddLpStateByIndex(index: number, data: Partial<TAddLiquidState>) {
    setLiquidityStateData(prev => {
      const listVault = [...prev.listVault];
      listVault[index].addLiquidity = { ...prev.listVault[index].addLiquidity, ...data };
      return {
        ...prev,
        listVault: listVault,
      };
    });
  }

  function changeWithdrawLpStateByIndex(index: number, data: Partial<TRemoveLiquidState>) {
    setLiquidityStateData(prev => {
      const listVault = [...prev.listVault];
      listVault[index].removeLiquidity = { ...prev.listVault[index].removeLiquidity, ...data };
      return {
        ...prev,
        listVault: listVault,
      };
    });
  }

  function changeVaultStateByIndex(index: number, data: Partial<TAccordionVaultState>) {
    setLiquidityStateData(prev => {
      const listVault = [...prev.listVault];
      if (listVault.length > 0) {
        listVault[index] = { ...prev.listVault[index], ...data };
      }
      return {
        ...prev,
        listVault: listVault,
      };
    });
  }

  async function getStateAllVaultsData() {
    setLiquidityStateData(prev => ({
      ...prev,
      loading: true,
      error: null,
    }));

    if (chainIdSelected) {
      try {
        const response = await getListVaultByChainId(chainIdSelected);
        const listVaultAddress = response.map(vault => ({ tcvVault: vault.addressVault }));
        getRateTokenInVault(listVaultAddress, true);
        getFeeTierInVault(listVaultAddress, true);
        getPriceTokens(listVaultAddress, true);
        getFeeEarnAmountsInVault(response, true);
        setLiquidityStateData(prev => {
          return {
            ...prev,
            listVault: response.map(vault => {
              return {
                tvl: vault.tvl,
                apr: vault.apr,
                tvlPool: vault.tvlPool,
                addressVault: vault.addressVault,
                vaultStaking: vault.vaultStaking,
                token1Info: { ...vault.token1, rate: BN(0), amount: '0' },
                token2Info: { ...vault.token2, rate: BN(0), amount: '0' },
                tokenRewardInfo: vault.tokenReward,
                isCanUseETH: isCanChangeToNativeToken(vault.token1.symbol)
                  ? 'token1'
                  : isCanChangeToNativeToken(vault.token2.symbol)
                  ? 'token2'
                  : null,
                // removeLiquidity: { amount1Input: '0', amount2Input: '0', isUseETH: false },
                // addLiquidity: { amount1Input: '0', amount2Input: '0', isUseETH: false, isZapIn: false, slippage: '1', tokenSelectedZapInOn: 'token1' },
                removeLiquidity: { amount1Input: '0', amount2Input: '0', isUseETH: true },
                addLiquidity: {
                  amount1Input: '0',
                  amount2Input: '0',
                  isUseETH: true,
                  isZapIn: false,
                  slippage: '1',
                  tokenSelectedZapInOn: 'token1',
                },
                dataChart: null,
                avgApr: null,
                tcvApr: null,
                isFetchingPoolData: true,
              } as TAccordionVaultState;
            }),
            loading: false,
          };
        });
      } catch (err) {
        setLiquidityStateData(prev => {
          return {
            ...prev,
            listVault: [],
            loading: false,
            error: err as Error,
          };
        });
      }
    }
  }

  async function getBalanceToken(listVault: TAccordionVaultState[]) {
    if (address) {
      try {
        const mapAddressTokenInfo: { [key: string]: TTokenInfo } = {};
        const querylist = [];
        for (const vault of listVault) {
          const token1 = vault.token1Info;
          const token2 = vault.token2Info;
          if (!mapAddressTokenInfo[token1.address]) {
            mapAddressTokenInfo[token1.address] = token1;
            querylist.push({ abi: erc20Abi, address: token1.address, functionName: 'balanceOf', args: [address] });
          }
          if (!mapAddressTokenInfo[token2.address]) {
            mapAddressTokenInfo[token2.address] = token2;
            querylist.push({ abi: erc20Abi, address: token2.address, functionName: 'balanceOf', args: [address] });
          }
        }

        const tokenBalances = await readContracts(configEvmChain, {
          contracts: querylist,
        });
        const tokenBalanceObj: { [key: string]: BigNumber } = {};
        const lengthOfTokenList = querylist.length;
        for (let i = 0; i < lengthOfTokenList; i++) {
          const tokenInfo = mapAddressTokenInfo[querylist[i].address];
          const balanceData = tokenBalances[i];
          if (balanceData.status == 'success') {
            tokenBalanceObj[tokenInfo.symbol] = BN(balanceData.result).div(BN(10).pow(tokenInfo.decimal));
          }
        }
        setLiquidityStateData(prev => {
          return {
            ...prev,
            balance: { ...prev.balance, ...tokenBalanceObj },
          };
        });
        return tokenBalanceObj;
      } catch (err) {
        setLiquidityStateData(prev => {
          return {
            ...prev,
            balance: {},
          };
        });
      }
    }
    return {};
  }

  async function getFeeTierInVault(addressVaults: { tcvVault: string }[], isFetchAll: boolean = false) {
    if (isFetchAll) {
      setLiquidityStateData(prev => ({ ...prev, isFetchingRate: true }));
    }
    try {
      const getFeeTier = new FeeUtil(chainIdSelected);
      for (let i = 0; i < addressVaults.length; i++) {
        const response = await getFeeTier.getFeeTier(addressVaults[i].tcvVault);

        setLiquidityStateData(prev => {
          const newListVault = prev.listVault.map((vault, index) => {
            if (index === i) {
              return {
                ...vault,
                ranges: response,
              };
            } else {
              return vault;
            }
          });
          return {
            ...prev,
            listVault: newListVault,
          };
        });
      }
    } catch (err) {
      console.log(err);
    }
    if (isFetchAll) {
      setLiquidityStateData(prev => ({ ...prev, isFetchingRate: false }));
    }
  }
  async function getFeeEarnAmountsInVault(reponse: TVaultRawData[], isFetchAll: boolean = false) {
    if (isFetchAll) {
      setLiquidityStateData(prev => ({ ...prev, isFetchingRate: true }));
    }
    if (address) {
      try {
        const getFeeEarnAmounts = new FeeUtil(chainIdSelected);
        ///// check lại
        const vaultConfigList = reponse.map(item => ({
          tcvVault: item?.addressVault,
          vaultStaking: item.vaultStaking,
          stakerAddress: address,
        }));
        const response = (await getFeeEarnAmounts.getSimulateEarnAmounts(vaultConfigList)) as unknown as {
          0: string;
          1: { amount0: string; amount1: string };
        }[];

        const array = [...response] as unknown as { 0: string; 1: { amount0: string; amount1: string } }[];

        setLiquidityStateData(prev => {
          const newListVault = prev.listVault.map((vault, index) => {
            if (array && array[index]) {
              const amount0 = array[index][1].amount0;
              const amount1 = array[index][1].amount1;

              return {
                ...vault,
                token1Info: {
                  ...vault.token1Info,
                  amount: amount0,
                },
                token2Info: {
                  ...vault.token2Info,
                  amount: amount1,
                },
              };
            } else {
              return vault;
            }
          });

          return {
            ...prev,
            isFetchingUserVaultData: false,
            listVault: newListVault,
          };
        });
      } catch (err) {
        setLiquidityStateData(prev => {
          return prev;
        });
        console.error(err);
      }
    }

    if (isFetchAll) {
      setLiquidityStateData(prev => ({ ...prev, isFetchingRate: false }));
    }
  }

  async function getRateTokenInVault(addressVaults: { tcvVault: string }[], isFetchAll: boolean = false) {
    if (isFetchAll) {
      setLiquidityStateData(prev => ({ ...prev, isFetchingRate: true }));
    }
    try {
      const uniswapv3 = new UniswapV3(client.chain.rpcUrls.default.http[0], chainIdSelected);
      const response = await uniswapv3.rateAddLiquidity(addressVaults);

      setLiquidityStateData(prev => {
        const newListVault = prev.listVault.map(vault => {
          const rates = response.get(vault.addressVault);
          const rate1 = rates ? BN(rates?.Ratio1div0).div(BN(10).pow(18)) : vault.token1Info.rate || BN(0);
          const rate2 = rates ? BN(rates.Ratio0div1).div(BN(10).pow(18)) : vault.token2Info.rate || BN(0);
          return {
            ...vault,
            token1Info: {
              ...vault.token1Info,
              rate: rate1,
            },
            token2Info: {
              ...vault.token2Info,
              rate: rate2,
            },
          };
        });

        return {
          ...prev,
          listVault: newListVault,
        };
      });
    } catch (err) {
      console.log(err);
    }
    if (isFetchAll) {
      setLiquidityStateData(prev => ({ ...prev, isFetchingRate: false }));
    }
  }

  async function getPriceTokens(addressVaults: { tcvVault: string }[], isFetchAll: boolean = false) {
    if (isFetchAll) {
      setLiquidityStateData(prev => ({ ...prev, isFetchingRate: true }));
    }
    try {
      const uniswapv3 = new UniswapV3(client.chain.rpcUrls.default.http[0], chainIdSelected);
      const response = await uniswapv3.getPriceTokens(addressVaults);

      const priceTokens: { [k in string]: BigNumber } = {};

      Object.keys(response).forEach(token => {
        priceTokens[token] = BN(response[token]).div(BN(10).pow(18));
      });
      await sleep(150);

      setLiquidityStateData(prev => ({ ...prev, priceTokens: priceTokens }));
    } catch (err) {
      console.log(err);
    }
    if (isFetchAll) {
      setLiquidityStateData(prev => ({ ...prev, isFetchingRate: false }));
    }
  }

  async function getUserDepositReward(
    data: { tcvVault: string; vaultStaking: string; stakerAddress: string }[],
    isFetchAll: boolean = false,
  ) {
    if (isFetchAll) {
      setLiquidityStateData(prev => ({ ...prev, isFetchingUserVaultData: true }));
    }
    if (address) {
      try {
        const uniswapv3 = new UniswapV3(client.chain.rpcUrls.default.http[0], chainIdSelected);
        const dataUserInAllVault = await uniswapv3.getInForVault(data);

        setLiquidityStateData(prev => {
          const listVault = prev.listVault.map(vault => {
            const dataUserInVault = dataUserInAllVault.get(vault.addressVault);
            const deposited = dataUserInVault
              ? BN(dataUserInVault.deposits).div(BN(10).pow(18)).toFixed()
              : vault.deposited;
            const reward = dataUserInVault
              ? BN(dataUserInVault.rewards).div(BN(10).pow(vault.tokenRewardInfo.decimal)).toFixed()
              : vault.rewards;
            return {
              ...vault,
              deposited: deposited,
              rewards: reward,
            };
          });

          return {
            ...prev,
            listVault: listVault,
          };
        });
      } catch (err) {
        console.log(err);
      }
    }
    if (isFetchAll) {
      setLiquidityStateData(prev => ({ ...prev, isFetchingUserVaultData: false }));
    }
  }

  async function getVaultChartAndApr(index: number, vaultAddress: Address) {
    if (vaultAddress) {
      try {
        const data = await fetchDataChart(vaultAddress, chainIdSelected);
        changeVaultStateByIndex(index, {
          dataChart: data.dataChart,
          tcvApr: data.tcvApr,
          avgApr: data.avgApr,
          isFetchingPoolData: false,
        });
      } catch (err) {
        console.log(err);
        changeVaultStateByIndex(index, { isFetchingPoolData: false });
      }
    }
  }

  async function test(data: { tcvVault: string; vaultStaking: string; stakerAddress: string }[]) {
    try {
      //   const response = await getBalance(configEvmChain,{address:})
      console.log('test', data);
    } catch (err) {
      console.log(err);
    }
  }

  return {
    getUserDepositReward,
    getRateTokenInVault,
    getStateAllVaultsData,
    setLiquidityStateData,
    getBalanceToken,
    getVaultChartAndApr,
    changeAddLpStateByIndex,
    changeVaultStateByIndex,
    changeWithdrawLpStateByIndex,
    test,
    isCanChangeToNativeToken,
    nativeToken: chainIdSelected == 97 ? client.chain.nativeCurrency.name : client.chain.nativeCurrency.symbol,
    getNativeTokenBalance,
    getFeeEarnAmountsInVault,
  };
};
