// jotai dùng cho page
// 1. maket
// 2. pool
// 3. Portfolio

import { atom, useAtomValue, useSetAtom } from 'jotai';
// import { YieldToken } from 'pendle-fork-sdk';
import { UserInfo } from 'pendle-fork-sdk/src';
import { getAddr } from 'pendle-fork-sdk/src/addresses';
import { Market } from 'pendle-fork-sdk/src/Market';
import { Router } from 'pendle-fork-sdk/src/Router';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { listAddr, ZERO_ADDRESS } from 'src/constants';
import { tokenPendleInfo } from 'src/constants/mapTokenToIcon';
import { tokenList } from 'src/constants/tokenMap';
import useAccount from 'src/hooks/useAccount';
import { configEvmChain } from 'src/jotai/wallet/config';
import { getListMarketInfoChainId } from 'src/services/api/pendle';
import { getListMarketPriceInfoChainIdNow } from 'src/services/api/pendle/getPrice';
import { getTradingVolumeInfoChainId } from 'src/services/api/pendle/getTradingVolume';
import { BN } from 'src/utils';
import { formatBigNumber, mergeDataPendle, mergeDataPendlePortfolio } from 'src/utils/format';
import { Address } from 'viem';
import { useChainId, useClient } from 'wagmi';
import { getBalance } from 'wagmi/actions';
import { getFormatStatePortfolio } from './constant';
import { StatesObject, TMarketInfo, TPendleBalances, TPendleDetailState, TPendleState, TPendleStateData } from './type';
import { handleGetPricePendleInfo } from './utils';

export const PendleStateData = atom<TPendleStateData>({
  loading: false,
  priceLoading: false,
  error: null,
  router: null,
  balance: {},
  listPendle: [],
  listPendlePortfolio: [],
  listPendleBanner: [],
  DetailPendetail: null,
  tab: 'swap',
  tokenToggle: 'YT',
  SwapData: {},
  loadPrivew: false,
  tokenSelect: null,
  mint: 'mint',
  MintData: {},
  tabsRight: 'APY',
  timeChart: '1H',
  tabPool: 'add',
  addPoolData: {},
  removePoolData: {},
  userPositions: {},
  dataModalClaim: null,
  loadingModal: false,
  useUSD: false,
  showUnder: true,
} as TPendleStateData);

export const usePendleData = () => useAtomValue(PendleStateData);

export const usePendleFunction = () => {
  // state
  const setPendleStateData = useSetAtom(PendleStateData);
  const chainIdSelected = useChainId();
  const { address } = useAccount();
  const client = useClient();

  const clearAll = useCallback(() => {
    setPendleStateData(prev => {
      return {
        ...prev,
        // loading: false,
        error: null,
        router: null,
        balance: {},
        listPendle: [],
        listPendleBanner: [],
        tab: 'swap',
        tokenToggle: 'YT',
        SwapData: {},
        loadPrivew: false,
        tokenSelect: null,
        mint: 'mint',
        MintData: {},
        tabsRight: 'APY',
        timeChart: '1H',
        tabPool: 'add',
        addPoolData: {},
        showUnder: true,
        useUSD: false,
      };
    });
  }, []);

  async function handleGetPrice(combinedData: TPendleState[]) {
    const activePool = combinedData.filter(item => Number(item.daysLeft) > 0);
    const inactivePool = combinedData.filter(item => Number(item.daysLeft) < 0);

    //Prioritize fetch data pools that are still active
    //Is return combinedData with price info of active pool (inactive pool still blank rn)
    const activePoolPriceInfo: TPendleState[] = await handleGetPricePendleInfo(combinedData, activePool, chainIdSelected);

    //Set state for render UI active pool first
    setPendleStateData(prev => {
      return {
        ...prev,
        priceLoading: false,
        listPendle: activePoolPriceInfo,
      };
    });

    //Get data remain (inactive pool price info)
    const result = await handleGetPricePendleInfo(activePoolPriceInfo, inactivePool, chainIdSelected);
    setPendleStateData(prev => {
      return {
        ...prev,
        listPendle: result,
      };
    });
  }

  async function getMarketInfo(page?: string) {
    setPendleStateData(prev => {
      return {
        ...prev,
        loading: true,
        priceLoading: true,
        error: null,
      };
    });
    if (chainIdSelected) {
      const router = getAddr('ROUTER_ADDRESS', chainIdSelected);
      const market = new Market(listAddr[chainIdSelected].URL, chainIdSelected);
      const marketInfo = await market.getMarketInfo();

      // data list market
      const dataListMarket = Object.keys(marketInfo).map(key => ({
        ...marketInfo[key],
        marketAddress: key,
        tokens: [marketInfo[key].tokens[0], marketInfo[key].tokens[1]],
      })) as TPendleState[];

      const poolsBalance: TPendleBalances = dataListMarket
        .map(item => ({
          [item.marketAddress as string]: {
            syBalance: item.totalSy,
            ptBalance: item.totalPt,
            ytBalance: '0',
            lpBalance: item.totalLp,
          },
        }))
        .reduce((acc, item) => {
          const [key, value] = Object.entries(item)[0];
          acc[key] = value;
          return acc;
        }, {} as TPendleBalances);

      const positions = await market.getPosition(marketInfo as { [key: string]: TPendleState }, poolsBalance, ZERO_ADDRESS);

      let combinedData: TPendleState[] = dataListMarket.map(market => {
        const position = positions[market.marketAddress] || {
          ptPosition: '0',
          ytPosition: '0',
          lpPosition: '0',
        };

        return {
          ...market,
          ptPosition: position.ptPosition,
          ytPosition: position.ytPosition,
          lpPosition: position.lpPosition,
          ytBalance: position.ytPosition,
          price: null,
        };
      });

      // data banner
      const dataBanner = combinedData.sort((a, b) => {
        return parseFloat(b.ptFixedYield) - parseFloat(a.ptFixedYield);
      });

      //Handle when run in portfolio page
      if (page === 'portfolio') {
        const states = combinedData.reduce<StatesObject>((acc, item) => {
          acc[item.marketAddress] = { ...item };
          return acc;
        }, {});

        const balances = combinedData.reduce<{ [key: string]: UserInfo }>((acc, item) => {
          acc[item.marketAddress] = {
            syBalance: item?.syBalance || '',
            ptBalance: item?.ptBalance || '',
            ytBalance: item?.ytBalance || '',
            lpBalance: item?.lpBalance || '',
          };
          return acc;
        }, {});

        if (address) {
          const userBalance = await market.getUserBalance(address);
          //format states list market
          const formatState = getFormatStatePortfolio(states);
          const userPositions = await market.getPosition(formatState, userBalance, address);
          combinedData = mergeDataPendlePortfolio(combinedData, userPositions);
        } else {
          const positions = await market.getPosition(states, balances, ZERO_ADDRESS);
          combinedData = mergeDataPendle(combinedData, positions);
        }

        setPendleStateData(prev => {
          return {
            ...prev,
            loading: false,
            router: router,
            listPendlePortfolio: combinedData,
            listPendleBanner: dataBanner,
          };
        });

        return;
      }

      setPendleStateData(prev => {
        return {
          ...prev,
          loading: false,
          router: router,
          listPendle: combinedData,
          listPendleBanner: dataBanner,
        };
      });

      //Temporary handle api price and apy cuz it took a lot of time (but need to update later)
      await handleGetPrice(combinedData);
    } else {
      setPendleStateData(prev => {
        return {
          ...prev,
          loading: false,
          error: null,
        };
      });
    }
  }

  async function AddDetailPendle(detail: TPendleState) {
    setPendleStateData(prev => {
      return {
        ...prev,
        loading: true,
        error: null,
      };
    });
    const reponse = await getListMarketInfoChainId(chainIdSelected, detail.marketAddress);
    const reponseTradingVolume = await getTradingVolumeInfoChainId(chainIdSelected, detail.marketAddress);

    if (address) {
      const market = new Market(listAddr[chainIdSelected].URL, chainIdSelected);

      const balanceDetail = await market.getUserBalance(address);

      const positions = await market.getPosition(
        {
          [detail.marketAddress]: {
            ...detail,
          },
        } as { [key: string]: TPendleState },
        {
          [detail.marketAddress]: {
            ...balanceDetail[detail.marketAddress],
          },
        } as { [key: string]: UserInfo },
        address,
      );

      setPendleStateData(prev => {
        return {
          ...prev,
          loading: false,
          DetailPendetail: {
            ...detail,
            ...balanceDetail[detail.marketAddress],
            impliedAPY: reponse.impliedAPY,
            ptToAsset: reponse.ptToAsset,
            ytToAsset: reponse.ytToAsset,
            timestamp: reponse.timestamp,
            tradingVolume: reponseTradingVolume,
          },
          userPositions: {
            ...positions[detail.marketAddress],
          },
        };
      });
    } else {
      setPendleStateData(prev => {
        return {
          ...prev,
          loading: false,
          DetailPendetail: {
            ...detail,
            syBalance: '0',
            ptBalance: '0',
            ytBalance: '0',
            lpBalance: '0',
            impliedAPY: reponse.impliedAPY,
            ptToAsset: reponse.ptToAsset,
            ytToAsset: reponse.ytToAsset,
            timestamp: reponse.timestamp,
            tradingVolume: reponseTradingVolume,
          },
          userPositions: {},
        };
      });
    }
  }

  async function getNativeTokenBalance() {
    try {
      if (address) {
        const balanceNative = await getBalance(configEvmChain, { address: address });
        const nativeTokenSymbol = client.chain.nativeCurrency.symbol;
        // const nativeTokenSymbol = chainIdSelected == 97 ? client.chain.nativeCurrency.name : client.chain.nativeCurrency.symbol;

        setPendleStateData(prev => {
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

  // dùng để update hết
  async function UpdateAllKeyPendle(key: string, data: string | boolean) {
    setPendleStateData(prev => {
      return {
        ...prev,
        [key]: data,
      };
    });
  }

  async function ResetDetailPendle() {
    setPendleStateData(prev => {
      return {
        ...prev,
        SwapData: {},
        tokenSelect: null,
        addPoolData: {},
        removePoolData: {},
      };
    });
  }

  // market detail privew token, yt, pt, mint , redeem
  async function PreviewMarketDetailToken(
    state: TMarketInfo,
    input: string,
    check: string,
    marketAddr: string,
    token: Address,
    addPoolToken?: boolean,
    nameToken?: string,
  ) {
    setPendleStateData(prev => {
      return {
        ...prev,
        loadPrivew: true,
      };
    });

    const router = getAddr('ROUTER_ADDRESS', chainIdSelected);

    const routerClass = new Router(state, listAddr[chainIdSelected].URL, chainIdSelected);
    const market = new Market(listAddr[chainIdSelected].URL, chainIdSelected);
    const tokenDecimal = tokenList[chainIdSelected][nameToken || 'aArbUSDC']?.decimal || 6;

    if (check === 'previewSwapYtToToken') {
      try {
        const res = await routerClass.previewSwapYtToToken(marketAddr, router, token, '500', BN(input).multipliedBy('1e6').toFixed());
        const showRes = formatBigNumber(res.netTokenOut);

        const positions = await market.getPosition(
          {
            [marketAddr]: state,
          } as { [key: string]: TPendleState },
          {
            [marketAddr]: {
              syBalance: '0',
              ptBalance: '0',
              ytBalance: BN(input)
                .multipliedBy(BN(`1e${tokenPendleInfo[chainIdSelected]['YT']?.decimal || '1'}`))
                .toFixed(),
              lpBalance: '0',
            },
          } as { [key: string]: UserInfo },
          ZERO_ADDRESS,
        );

        const priceMint = await getListMarketPriceInfoChainIdNow(chainIdSelected, state.tokenMintSy);

        const YTprice = BN(positions[marketAddr].ytPosition)
          .dividedBy(BN(`1e${tokenPendleInfo[chainIdSelected]['YT']?.decimal || '1'}`))
          .multipliedBy(BN(priceMint))
          .toFixed(2);

        const priceToken = await getListMarketPriceInfoChainIdNow(chainIdSelected, tokenList[chainIdSelected][nameToken || ''].price as Address);

        setPendleStateData(prev => {
          return {
            ...prev,
            SwapData: {
              ...prev.SwapData,
              outTokenYT: showRes,
              outYTUSDT: YTprice,
              YTpriceToken: priceToken.toString(),
            },
            loadPrivew: false,
          };
        });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        toast.error(errorMessage, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log('previewSwapYtToToken', errorMessage);
        setPendleStateData(prev => {
          return {
            ...prev,
            SwapData: {
              ...prev.SwapData,
              outTokenYT: null,
            },
            loadPrivew: false,
          };
        });
      }
    } else if (check === 'previewSwapPtToToken') {
      try {
        const res = await routerClass.previewSwapPtToToken(marketAddr, router, token, '500', BN(input).multipliedBy('1e6').toFixed());
        const showRes = formatBigNumber(res.netTokenOut);

        const positions = await market.getPosition(
          {
            [marketAddr]: state,
          } as { [key: string]: TPendleState },
          {
            [marketAddr]: {
              syBalance: '0',
              ptBalance: BN(input)
                .multipliedBy(BN(`1e${tokenPendleInfo[chainIdSelected]['PT']?.decimal || '1'}`))
                .toFixed(),
              ytBalance: '0',
              lpBalance: '0',
            },
          } as { [key: string]: UserInfo },
          ZERO_ADDRESS,
        );

        const priceMint = await getListMarketPriceInfoChainIdNow(chainIdSelected, state.tokenMintSy);

        const PTprice = BN(positions[marketAddr].ptPosition)
          .dividedBy(BN(`1e${tokenPendleInfo[chainIdSelected]['PT']?.decimal || '1'}`))
          .multipliedBy(BN(priceMint))
          .toFixed(2);

        const priceToken = await getListMarketPriceInfoChainIdNow(chainIdSelected, tokenList[chainIdSelected][nameToken || ''].price as Address);

        setPendleStateData(prev => {
          return {
            ...prev,
            SwapData: {
              ...prev.SwapData,
              outTokenPT: showRes,
              outPTUSDT: PTprice,
              PTpriceToken: priceToken.toString(),
            },
            loadPrivew: false,
          };
        });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        console.log('previewSwapPtToToken', errorMessage);
        toast.error(errorMessage, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setPendleStateData(prev => {
          return {
            ...prev,
            SwapData: {
              ...prev.SwapData,
              outTokenPT: null,
            },
            loadPrivew: false,
          };
        });
      }
    } else if (check === 'previewSwapTokenToYt') {
      const guessMin = '0';
      const guessMax = BN('115792089237316195423570985008687907853269984665640564039457584007913129639935').toFixed(0);
      const guessOffchain = '0';
      const maxIteration = '256';
      const eps = '100000000000000';

      try {
        const res = await routerClass.previewSwapTokenToYt(marketAddr, router, token, '500', BN(input).multipliedBy(`1e${tokenDecimal}`).toFixed(), {
          guessMin,
          guessMax,
          guessOffchain,
          maxIteration,
          eps,
        });
        const showRes = formatBigNumber(res.netYtOut);

        const positions = await market.getPosition(
          {
            [marketAddr]: state,
          } as { [key: string]: TPendleState },
          {
            [marketAddr]: {
              syBalance: '0',
              ptBalance: '0',
              ytBalance: BN(res.netYtOut)
                .multipliedBy(BN(`1e${tokenPendleInfo[chainIdSelected]['YT']?.decimal || '1'}`))
                .toFixed(),
            },
          } as { [key: string]: UserInfo },
          ZERO_ADDRESS,
        );

        const priceMint = await getListMarketPriceInfoChainIdNow(chainIdSelected, state.tokenMintSy);

        const YTprice = BN(positions[marketAddr].ytPosition)
          .dividedBy(BN(`1e${tokenPendleInfo[chainIdSelected]['YT']?.decimal || '1'}`))
          .multipliedBy(BN(priceMint))
          .toFixed(2);

        const priceToken = await getListMarketPriceInfoChainIdNow(chainIdSelected, tokenList[chainIdSelected][nameToken || ''].price as Address);

        setPendleStateData(prev => {
          return {
            ...prev,
            MintData: {
              ...prev,
              MintPriceToken: priceToken.toString(),
            },
            SwapData: {
              ...prev.SwapData,
              outYTDes: showRes,
              outYTUSDT: YTprice,
              YTpriceToken: priceToken.toString(),
            },
            loadPrivew: false,
          };
        });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        console.log('previewSwapTokenToYt', errorMessage);
        toast.error(errorMessage, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setPendleStateData(prev => {
          return {
            ...prev,
            SwapData: {
              ...prev.SwapData,
              outYTDes: null,
            },
            loadPrivew: false,
          };
        });
      }
    } else if (check === 'previewSwapTokenToPt') {
      const guessMin = '0';
      const guessMax = '115792089237316195423570985008687907853269984665640564039457584007913129639935';
      const guessOffchain = '0';
      const maxIteration = '256';
      const eps = '100000000000000';

      try {
        const res = await routerClass.previewSwapTokenToPt(marketAddr, router, token, '500', BN(input).multipliedBy(`1e${tokenDecimal}`).toFixed(), {
          guessMin,
          guessMax,
          guessOffchain,
          maxIteration,
          eps,
        });

        const showRes = formatBigNumber(res.netPtOut);

        const positions = await market.getPosition(
          {
            [marketAddr]: state,
          } as { [key: string]: TPendleState },
          {
            [marketAddr]: {
              syBalance: '0',
              ptBalance: BN(res.netPtOut)
                .multipliedBy(BN(`1e${tokenPendleInfo[chainIdSelected]['PT']?.decimal || '1'}`))
                .toFixed(),
              ytBalance: '0',
              lpBalance: '0',
            },
          } as { [key: string]: UserInfo },
          ZERO_ADDRESS,
        );

        const priceMint = await getListMarketPriceInfoChainIdNow(chainIdSelected, state.tokenMintSy);

        const PTprice = BN(positions[marketAddr].ptPosition)
          .dividedBy(BN(`1e${tokenPendleInfo[chainIdSelected]['PT']?.decimal || '1'}`))
          .multipliedBy(BN(priceMint))
          .toFixed(2);

        const priceToken = await getListMarketPriceInfoChainIdNow(chainIdSelected, tokenList[chainIdSelected][nameToken || 'ETH'].price as Address);

        setPendleStateData(prev => {
          return {
            ...prev,
            SwapData: {
              ...prev.SwapData,
              outPTDes: showRes,
              outPTUSDT: PTprice,
              PTpriceToken: priceToken.toString(),
            },
            loadPrivew: false,
          };
        });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        console.log('previewSwapTokenToPt', errorMessage);
        toast.error(errorMessage, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setPendleStateData(prev => {
          return {
            ...prev,
            SwapData: {
              ...prev.SwapData,
              outPTDes: null,
            },
            loadPrivew: false,
          };
        });
      }
    } else if (check === 'previewMintPyFromToken') {
      try {
        const res = await routerClass.previewMintPyFromToken(token, '500', BN(input).multipliedBy('1e6').toFixed());
        const showRes = formatBigNumber(res);

        const positions = await market.getPosition(
          {
            [marketAddr]: state,
          } as { [key: string]: TPendleState },
          {
            [marketAddr]: {
              syBalance: '0',
              ptBalance: BN(res)
                .multipliedBy(BN(`1e${tokenPendleInfo[chainIdSelected]['PT']?.decimal || '1'}`))
                .toFixed(),
              ytBalance: BN(res)
                .multipliedBy(BN(`1e${tokenPendleInfo[chainIdSelected]['PT']?.decimal || '1'}`))
                .toFixed(),
              lpBalance: '0',
            },
          } as { [key: string]: UserInfo },
          ZERO_ADDRESS,
        );

        const priceMint = await getListMarketPriceInfoChainIdNow(chainIdSelected, state.tokenMintSy);

        const PTprice = BN(positions[marketAddr].ptPosition)
          .dividedBy(BN(`1e${tokenPendleInfo[chainIdSelected]['PT']?.decimal || '1'}`))
          .multipliedBy(BN(priceMint))
          .toFixed(2);

        const YTprice = BN(positions[marketAddr].ytPosition)
          .dividedBy(BN(`1e${tokenPendleInfo[chainIdSelected]['YT']?.decimal || '1'}`))
          .multipliedBy(BN(priceMint))
          .toFixed(2);

        const priceToken = await getListMarketPriceInfoChainIdNow(chainIdSelected, tokenList[chainIdSelected][nameToken || ''].price as Address);

        setPendleStateData(prev => {
          return {
            ...prev,
            MintData: {
              ...prev.SwapData,
              outPtMint: showRes,
              outYtMint: showRes,
              outMintPTUSDT: PTprice,
              outMintYTUSDT: YTprice,
              MintPriceToken: priceToken.toString(),
            },
            loadPrivew: false,
          };
        });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        console.log('previewMintPyFromToken', errorMessage);
        toast.error(errorMessage, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setPendleStateData(prev => {
          return {
            ...prev,
            MintData: {
              ...prev.SwapData,
              outPtMint: null,
              outYtMint: null,
            },
            loadPrivew: false,
          };
        });
      }
    } else if (check === 'previewRedeemPyToToken') {
      try {
        const res = await routerClass.previewRedeemPyToToken(token, '500', BN(input).multipliedBy('1e6').toFixed());

        const showRes = formatBigNumber(res);

        const positions = await market.getPosition(
          {
            [marketAddr]: state,
          } as { [key: string]: TPendleState },
          {
            [marketAddr]: {
              syBalance: '0',
              ptBalance: BN(input)
                .multipliedBy(BN(`1e${tokenPendleInfo[chainIdSelected]['PT']?.decimal || '1'}`))
                .toFixed(),
              ytBalance: BN(input)
                .multipliedBy(BN(`1e${tokenPendleInfo[chainIdSelected]['PT']?.decimal || '1'}`))
                .toFixed(),
              lpBalance: '0',
            },
          } as { [key: string]: UserInfo },
          ZERO_ADDRESS,
        );

        const priceMint = await getListMarketPriceInfoChainIdNow(chainIdSelected, state.tokenMintSy);

        const outRedeemPTUSDTPrice = BN(positions[marketAddr].ptPosition)
          .dividedBy(BN(`1e${tokenPendleInfo[chainIdSelected]['PT']?.decimal || '1'}`))
          .multipliedBy(BN(priceMint))
          .toFixed(2);

        const outRedeemYTUSDTPrice = BN(positions[marketAddr].ytPosition)
          .dividedBy(BN(`1e${tokenPendleInfo[chainIdSelected]['YT']?.decimal || '1'}`))
          .multipliedBy(BN(priceMint))
          .toFixed(2);

        const priceToken = await getListMarketPriceInfoChainIdNow(chainIdSelected, tokenList[chainIdSelected][nameToken || ''].price as Address);

        setPendleStateData(prev => {
          return {
            ...prev,
            MintData: {
              ...prev.SwapData,
              outTokenRedeem: showRes,
              outRedeemPTUSDT: outRedeemPTUSDTPrice,
              outRedeemYTUSDT: outRedeemYTUSDTPrice,
              RedeemToken: priceToken.toString(),
            },
            loadPrivew: false,
          };
        });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        console.log('previewRedeemPyToToken', errorMessage);
        toast.error(errorMessage, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setPendleStateData(prev => {
          return {
            ...prev,
            MintData: {
              ...prev.SwapData,
              outTokenRedeem: null,
            },
            loadPrivew: false,
          };
        });
      }
    } else if (check === 'previewAddLiquidityDualTokenPt') {
      try {
        if (addPoolToken) {
          const res = await routerClass.previewAddLiquidityDualTokenPt(token, '500', BN(input).multipliedBy('1e6').toFixed(), undefined);

          const lpToReserve = formatBigNumber(res.lpToReserve);
          const lpToAccount = formatBigNumber(res.lpToAccount);
          const ptUsed = formatBigNumber(res.ptUsed);

          const positions = await market.getPosition(
            {
              [marketAddr]: state,
            } as { [key: string]: TPendleState },
            {
              [marketAddr]: {
                syBalance: '0',
                ptBalance: BN(res.ptUsed)
                  .multipliedBy(BN(`1e${tokenPendleInfo[chainIdSelected]['PT']?.decimal || '1'}`))
                  .toFixed(),
                ytBalance: '0',
                lpBalance: BN(res.lpToAccount)
                  .multipliedBy(BN(`1e${tokenPendleInfo[chainIdSelected]['LP']?.decimal || '1'}`))
                  .toFixed(),
              },
            } as { [key: string]: UserInfo },
            ZERO_ADDRESS,
          );

          const priceMint = await getListMarketPriceInfoChainIdNow(chainIdSelected, state.tokenMintSy);

          const outRedeemPTUSDTPrice = BN(positions[marketAddr].ptPosition)
            .dividedBy(BN(`1e${tokenPendleInfo[chainIdSelected]['PT']?.decimal || '1'}`))
            .multipliedBy(BN(priceMint))
            .toFixed(2);

          const outRedeemLPUSDTPrice = BN(positions[marketAddr].lpPosition)
            .dividedBy(BN(`1e${tokenPendleInfo[chainIdSelected]['LP']?.decimal || '1'}`))
            .multipliedBy(BN(priceMint))
            .toFixed(2);

          const priceToken = await getListMarketPriceInfoChainIdNow(chainIdSelected, tokenList[chainIdSelected][nameToken || ''].price as Address);

          setPendleStateData(prev => {
            return {
              ...prev,
              addPoolData: {
                ...prev.addPoolData,
                lpToReserve: lpToReserve,
                lpToAccount: lpToAccount,
                tokenUsed: res?.tokenUsed,
                ptUsed: ptUsed,
                outPtUSDT: outRedeemPTUSDTPrice,
                outLpUSDT: outRedeemLPUSDTPrice,
              },
              MintData: {
                ...prev.SwapData,
                MintPriceToken: priceToken.toString(),
              },
              loadPrivew: false,
            };
          });
        } else {
          const res = await routerClass.previewAddLiquidityDualTokenPt(token, '500', undefined, BN(input).multipliedBy('1e6').toFixed());
          const lpToReserve = formatBigNumber(res.lpToReserve);
          const lpToAccount = formatBigNumber(res.lpToAccount);

          setPendleStateData(prev => {
            return {
              ...prev,
              addPoolData: {
                ...prev.addPoolData,
                lpToReserve: lpToReserve,
                lpToAccount: lpToAccount,
                tokenUsed: res?.tokenUsed,
              },
              loadPrivew: false,
            };
          });
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        console.log('previewAddLiquidityDualTokenPt', errorMessage);
        toast.error(errorMessage, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setPendleStateData(prev => {
          return {
            ...prev,
            addPoolData: {},
            loadPrivew: false,
          };
        });
      }
    } else if (check === 'previewRemoveLiquidityDualTokenPt') {
      try {
        const res = await routerClass.previewRemoveLiquidityDualTokenPt(token, '500', BN(input).multipliedBy('1e6').toFixed());
        const tokenToAccount = formatBigNumber(res.tokenToAccount);
        const ptToAccout = formatBigNumber(res.ptToAccout);

        const positions = await market.getPosition(
          {
            [marketAddr]: state,
          } as { [key: string]: TPendleState },
          {
            [marketAddr]: {
              syBalance: '0',
              ptBalance: BN(res.ptToAccout)
                .multipliedBy(BN(`1e${tokenPendleInfo[chainIdSelected]['PT']?.decimal || '1'}`))
                .toFixed(),
              ytBalance: '0',
              lpBalance: BN(input)
                .multipliedBy(BN(`1e${tokenPendleInfo[chainIdSelected]['LP']?.decimal || '1'}`))
                .toFixed(),
            },
          } as { [key: string]: UserInfo },
          ZERO_ADDRESS,
        );

        const priceMint = await getListMarketPriceInfoChainIdNow(chainIdSelected, state.tokenMintSy);

        const outRemoveLPUSDTPrice = BN(positions[marketAddr].lpPosition)
          .dividedBy(BN(`1e${tokenPendleInfo[chainIdSelected]['LP']?.decimal || '1'}`))
          .multipliedBy(BN(priceMint))
          .toFixed(2);

        const outRemovePTUSDTPrice = BN(positions[marketAddr].ptPosition)
          .dividedBy(BN(`1e${tokenPendleInfo[chainIdSelected]['LP']?.decimal || '1'}`))
          .multipliedBy(BN(priceMint))
          .toFixed(2);

        setPendleStateData(prev => {
          return {
            ...prev,
            removePoolData: {
              ...prev.addPoolData,
              tokenToAccount: tokenToAccount,
              ptToAccout: ptToAccout,
              outLPUSDT: outRemoveLPUSDTPrice,
              outPTUSDT: outRemovePTUSDTPrice,
            },
            loadPrivew: false,
          };
        });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        console.log('previewRemoveLiquidityDualTokenPt', errorMessage);
        toast.error(errorMessage, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setPendleStateData(prev => {
          return {
            ...prev,
            removePoolData: {},
            loadPrivew: false,
          };
        });
      }
    } else {
      setPendleStateData(prev => {
        return {
          ...prev,
          loadPrivew: false,
        };
      });
    }
  }

  async function getNativeTokenBalanceSelect(tokenSelect: Address) {
    try {
      if (address) {
        const balanceNativeSelect = await getBalance(configEvmChain, {
          address: address,
          token: tokenSelect,
        });

        setPendleStateData(prev => {
          return {
            ...prev,
            balance: {
              ...prev.balance,
              [tokenSelect]: BN(balanceNativeSelect.value).div(BN(10).pow(balanceNativeSelect.decimals)),
            },
          };
        });
      }
    } catch (e) {
      console.log('error', e);
    }
  }

  async function getUserBalanceMarket(marketAddress: Address) {
    if (address) {
      const market = new Market(listAddr[chainIdSelected].URL, chainIdSelected);

      const balanceDetail = await market.getUserBalance(address);

      setPendleStateData(prev => {
        return {
          ...prev,
          DetailPendetail: {
            ...prev.DetailPendetail,
            syBalance: balanceDetail[marketAddress].syBalance,
            ptBalance: balanceDetail[marketAddress].ptBalance,
            ytBalance: balanceDetail[marketAddress].ytBalance,
            lpBalance: balanceDetail[marketAddress].lpBalance,
          } as TPendleDetailState,
        };
      });
    }
  }

  async function addDataModalClaim(data: TPendleState) {
    setPendleStateData(prev => {
      return {
        ...prev,
        loadingModal: true,
      };
    });

    if (address) {
      // const yieldTokenClass = new YieldToken(listAddr[chainIdSelected].URL, chainIdSelected);
      // const res = await yieldTokenClass.getUserRewardAndInterest(address);
      setPendleStateData(prev => {
        return {
          ...prev,
          dataModalClaim: {
            ...data,
            // assetAmount: res[data.marketAddress]?.assetAmount && res[data.marketAddress]?.assetAmount === 'NaN' ? res[data.marketAddress]?.assetAmount : '0',
            // syAmount: res[data.marketAddress]?.syAmount && res[data.marketAddress]?.syAmount === 'NaN' ? res[data.marketAddress]?.syAmount : '0',
          },
          loadingModal: false,
        };
      });
    } else {
      setPendleStateData(prev => {
        return {
          ...prev,
          dataModalClaim: {
            ...data,
            assetAmount: '0',
            syAmount: '0',
          },
          loadingModal: false,
        };
      });
    }
  }

  return {
    clearAll,
    getMarketInfo,
    getNativeTokenBalance,
    AddDetailPendle,
    UpdateAllKeyPendle,
    ResetDetailPendle,
    PreviewMarketDetailToken,
    getNativeTokenBalanceSelect,
    getUserBalanceMarket,
    addDataModalClaim,
    nativeToken: client.chain.nativeCurrency.symbol,
  };
};
