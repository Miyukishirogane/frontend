import BigNumber from 'bignumber.js';
import { tokenList } from 'src/constants/tokenMap';
import { TPendleState } from 'src/jotai/pendle/type';
import { abiSy } from 'src/jotai/wallet/abi/Sy';
import { configEvmChain } from 'src/jotai/wallet/config';
import { TAppChainId } from 'src/jotai/wallet/type';
import { getListMarketInfoChainId, TMarketRawData } from 'src/services/api/pendle';
import { getListMarketPriceInfoChainIdNow } from 'src/services/api/pendle/getPrice';
import { getSYInfoList, SYInfo } from 'src/services/api/pendle/getSYInfo';
import { BN } from 'src/utils';
import { readContracts } from 'wagmi/actions';
import { Data, GetRangeFunction, ChartItem, TypeAPYInfo, TypeAPYPrice } from './type';
import { queryClient } from 'src/jotai/AppProvider';
import { formatDate, TDateFormat } from 'src/utils/format';

// convert timestamp to date at 7 AM
const getStartOfDay = (timestamp: number) => {
  const date = new Date(timestamp);
  const startOfDay = new Date(date.setHours(7, 0, 0, 0));
  return startOfDay.getTime();
};

// convert timestamp to date at 7 AM on Monday
const getStartOfWeek = (timestamp: number) => {
  const date = new Date(timestamp);
  const day = date.getDay();
  const diff = day === 0 ? 6 : day - 1; // Monday start
  date.setDate(date.getDate() - diff);
  date.setHours(7, 0, 0, 0);
  return date.getTime();
};

// Define the groupData
const groupDataChart = (data: Data, getRange: GetRangeFunction): Record<string | number, ChartItem[]> => {
  return data.reduce<Record<string | number, ChartItem[]>>((acc, item) => {
    const timestamp = item[0];
    const range = getRange(timestamp);

    if (!acc[range]) {
      acc[range] = [];
    }
    acc[range].push(item);

    return acc;
  }, {});
};

const calcUnderlyingInterestApy = (syInfo: SYInfo[], syIndex?: number) => {
  const index = syIndex !== undefined ? syIndex : syInfo.length - 1;
  const selectSyItem = syInfo[index];
  const selectSyItemIndex = selectSyItem?.syIndex || 0;
  // const prevRewardIndex = BN(syInfo.slice(-8, -1).reduce((total, item) => (item?.syIndex ? (total += item.syIndex) : total), 0)).dividedBy(7);
  //prevRewardIndex = 7 days before the selectSyItem timestamp or else get first item
  const prevRewardIndex = syInfo[index - 168]?.syIndex || syInfo[0].syIndex;

  const interestMultiple = selectSyItemIndex / prevRewardIndex;

  const underlyingInterestApy = Math.pow(interestMultiple, 365 / 7) - 1;

  return BN(underlyingInterestApy);
};

const getPriceAndExchangeRate = async (chainId: TAppChainId, marketInfo: TPendleState, priceMintToken?: number) => {
  try {
    const { tokenMintSy, SY } = marketInfo;

    // const rewardPrice = await getListMarketPriceInfoChainIdNow(chainId, tokenList[chainId][tokenName || ''].price as Address);
    //Hard code arb address for now (arb address: 0x912CE59144191C1204E64559FE8253a0e49E6548)
    const rewardPrice = await queryClient.ensureQueryData({
      queryKey: ['ListMarketPriceInfoChainIdNow', '0x912CE59144191C1204E64559FE8253a0e49E6548'],
      queryFn: async () => await getListMarketPriceInfoChainIdNow(chainId, '0x912CE59144191C1204E64559FE8253a0e49E6548'),
    });
    const tokenPrice = priceMintToken ? priceMintToken : await getListMarketPriceInfoChainIdNow(chainId, tokenMintSy);
    const exchangeRateResp = await readContracts(configEvmChain, {
      contracts: [
        {
          abi: abiSy,
          address: SY,
          functionName: 'exchangeRate',
          args: [],
        },
      ],
    });

    const syPrice = exchangeRateResp[0].status === 'success' ? BN(exchangeRateResp[0].result).multipliedBy(tokenPrice).toNumber() : 1;

    return { rewardPrice, syPrice };
  } catch (error) {
    console.log('🚀 ~ getPriceAndExchangeRate ~ error:', error);
    return { rewardPrice: 0, syPrice: 1 };
  }
};

const calcUnderlyingRewardApr = (syInfo: SYInfo[], rewardPrice: number, syPrice: number, syIndex?: number) => {
  const index = syIndex !== undefined ? syIndex : syInfo.length - 1;
  const selectSyItem = syInfo[index];
  const selectSyItemReward = selectSyItem.rewardIndex[0];
  //prevRewardIndex = 7 days before the selectSyItem timestamp or else get get first item
  const prevRewardIndex = syInfo[index - 168]?.rewardIndex[0] || syInfo[0].rewardIndex[0];

  const dailyRewardPerSy = (selectSyItemReward - prevRewardIndex) / 7;
  const price = rewardPrice / syPrice;
  const dailyRewardYield = price * dailyRewardPerSy;

  //calcUnderlyingRewardApr = sum dailyRewardYield each token of market but is only have 1 for now
  return dailyRewardYield ? BN(dailyRewardYield) : BN(0);
};

const calcLongYieldApy = (
  marketInfo: TPendleState,
  underlyingInterestApy: BigNumber,
  underlyingRewardApr: BigNumber,
  marketInfoChainId: TMarketRawData,
) => {
  const yearToExpiry = Number(marketInfo.daysLeft) / 365;

  const interestReturns = BN(Math.pow(Number(underlyingInterestApy.plus(1).toFixed(6)), yearToExpiry)).minus(1);
  const rewardReturns = underlyingRewardApr.multipliedBy(yearToExpiry);

  const ytReturns = interestReturns.plus(rewardReturns);
  const ytReturnsAfterFee = ytReturns.multipliedBy(0.97);
  //newest yt price
  const ytPriceInAsset = BN(marketInfoChainId.ytToAsset[marketInfoChainId.ytToAsset.length - 1]).dividedBy(1e18);

  const powOfReturnsAfterFee = 365 / Number(marketInfo.daysLeft);

  const longYieldApy = BN(Math.pow(Number(ytReturnsAfterFee.dividedBy(ytPriceInAsset)), powOfReturnsAfterFee));

  return longYieldApy.minus(1);
};

const handleRespSyInfo = async (chainId: TAppChainId, marketInfo: TPendleState) => {
  // const syInfoResp = await getSYInfoList(chainId, marketInfo.SY);
  try {
    const syInfoResp = await queryClient.ensureQueryData({
      queryKey: ['SYInfoList', marketInfo.SY],
      queryFn: async () => await getSYInfoList(chainId, marketInfo.SY),
    });

    const syInfo = syInfoResp.map(item => ({
      timestamp: item.timestamp,
      syIndex: BN(item.syIndex).dividedBy(1e18).toNumber(),
      rewardIndex: item.rewardIndex?.length ? item.rewardIndex.map(reward => BN(reward).dividedBy(1e18).toNumber()) : [],
    })) as SYInfo[];

    return syInfo;
  } catch (error) {
    console.log('🚀 ~ handleRespSyInfo ~ error:', error);
    return [];
  }
};

const handleCalcAPYInfo = async (chainId: TAppChainId, marketInfo: TPendleState, priceMintToken?: number): Promise<TypeAPYInfo> => {
  try {
    // const marketInfoChainId = await getListMarketInfoChainId(chainId, marketInfo.marketAddress);
    const syInfo = await handleRespSyInfo(chainId, marketInfo);
    const marketInfoChainId = await queryClient.ensureQueryData({
      queryKey: ['ListMarketInfoChainId', marketInfo.marketAddress],
      queryFn: async () => await getListMarketInfoChainId(chainId, marketInfo.marketAddress),
    });

    const { rewardPrice, syPrice } = await getPriceAndExchangeRate(chainId, marketInfo, priceMintToken);

    const underlyingInterestApy = calcUnderlyingInterestApy(syInfo);
    const underlyingRewardApr = calcUnderlyingRewardApr(syInfo, rewardPrice, syPrice);

    const longYield = calcLongYieldApy(marketInfo, underlyingInterestApy, underlyingRewardApr, marketInfoChainId);
    const underlyingApy = underlyingInterestApy.plus(underlyingRewardApr);

    return { longYield, underlyingApy };
  } catch (error) {
    console.log('Error handleCalcAPYInfo', error);
    return { longYield: BN(0), underlyingApy: BN(0) };
  }
};

const findKeyByAddress = (address: string, chainIdSelected: TAppChainId) => {
  for (const key in tokenList[chainIdSelected]) {
    if (tokenList[chainIdSelected][key]?.address === address) {
      return key;
    }
  }
  return Object.keys(tokenList[chainIdSelected])[0];
};

const handleGetApyPrice = async (marketInfo: TPendleState, chainIdSelected: TAppChainId, latestPrice: number): Promise<TypeAPYPrice> => {
  // const marketInfoChainId = await getListMarketInfoChainId(chainIdSelected, marketInfo.marketAddress);
  const marketInfoChainId = await queryClient.ensureQueryData({
    queryKey: ['ListMarketInfoChainId', marketInfo.marketAddress],
    queryFn: async () => await getListMarketInfoChainId(chainIdSelected, marketInfo.marketAddress),
  });

  const ytPrice = BN(marketInfoChainId.ytToAsset[marketInfoChainId.ytToAsset.length - 1])
    .dividedBy(1e18)
    .multipliedBy(latestPrice);
  const ptPrice = BN(marketInfoChainId.ptToAsset[marketInfoChainId.ptToAsset.length - 1])
    .dividedBy(1e18)
    .multipliedBy(latestPrice);

  return { ytPrice, ptPrice };
};

//round time by hour for compare with DetailPendetail.timestamp
const handleConvertDataByDate = <T = string>(data: Record<string, T> | undefined, format: TDateFormat = 'MMM dd, h:mm a') => {
  return Object.keys(data || {}).reduce(
    (obj, key) => ({ ...obj, [formatDate(Number(key) * 1000, format)]: data ? data[key] : ({} as T) }),
    {} as { [key: string]: T },
  );
};

export {
  calcUnderlyingInterestApy,
  calcUnderlyingRewardApr,
  findKeyByAddress,
  getPriceAndExchangeRate,
  getStartOfDay,
  getStartOfWeek,
  groupDataChart,
  handleCalcAPYInfo,
  handleGetApyPrice,
  handleRespSyInfo,
  handleConvertDataByDate,
};
