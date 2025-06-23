import axios from 'axios';
import { apiUrl } from 'src/services/apiUrl';
import { Address } from 'viem';
import { TAppChainId } from 'src/jotai/wallet/type';

export type TFetchDataChart = {
  ticks: string[];
  liquiditys: number[];
  prices: string[];
  currentTick: number;
  currentPrice: number;
  currentIndex: number;
  newMin: number;
  newMax: number;
};

export async function fetchDataChart(vaultAddress: Address, chainId: TAppChainId): Promise<{ dataChart: TFetchDataChart; avgApr: number; tcvApr: number }> {
  const response = await axios.get(apiUrl.getPoolInfoByVaultAddress(vaultAddress, chainId));
  const data = response?.data;
  const avgApr = data?.avgApr.averageAPR * 100 < 0 ? 0 : data?.avgApr.averageAPR * 100;
  const tcvApr = data?.tcvApr * 100 < 0 ? 0 : data?.tcvApr * 100;
  const tickArray = [];
  const liquidityArray: number[] = [];
  const priceArray = [];
  const currentTick: number = data?.liquidity.currentTick;
  const currentPrice: number = data?.liquidity.currentPrice;
  const liquidityFirstTick = data?.liquidity.liquidity?.[0].tick;
  const liquidityLastTick = data?.liquidity.liquidity?.[data?.liquidity.tickNumber - 1].tick;

  const newMin = ((data?.fee.lowerTick - liquidityFirstTick) * (data?.liquidity.tickNumber - 1)) / (liquidityLastTick - liquidityFirstTick);
  const newMax = ((data?.fee.upperTick - liquidityFirstTick) * (data?.liquidity.tickNumber - 1)) / (liquidityLastTick - liquidityFirstTick);
  const currentIndex = ((data?.liquidity.currentTick - liquidityFirstTick) * (data?.liquidity.tickNumber - 1)) / (liquidityLastTick - liquidityFirstTick);

  for (let i = 0; i < data?.liquidity.tickNumber; i++) {
    const tick = data?.liquidity.liquidity[i].tick + '';
    tickArray.push(tick);
    const liquidity = data?.liquidity.liquidity[i].liquidity;
    liquidityArray.push(liquidity);
    const price = data?.liquidity.liquidity[i].price + '';
    priceArray.push(price);
  }
  return {
    avgApr,
    tcvApr,
    dataChart: {
      ticks: tickArray,
      liquiditys: liquidityArray,
      prices: priceArray,
      currentTick,
      currentPrice,
      currentIndex,
      newMin,
      newMax,
    },
  };
}
export type TFetchDataChartReturn = Awaited<ReturnType<typeof fetchDataChart>>;
