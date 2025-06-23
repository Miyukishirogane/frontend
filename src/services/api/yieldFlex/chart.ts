import axios from 'axios';
import { configEvmChain } from 'src/jotai/wallet/config';
import { apiUrl } from 'src/services/apiUrl';
import { getChainId } from 'wagmi/actions';

export type TProjeetChartData = {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

export const getProjeetChartData = async (type: string, pair: string): Promise<TProjeetChartData[]> => {
  try {
    const chainId = getChainId(configEvmChain);
    const resp = await axios.get(apiUrl.getProjeetChartData(type, pair, chainId));

    if (resp?.data) {
      return resp.data as TProjeetChartData[];
    }
    return [];
  } catch (error) {
    console.log('handleLogin error', error);
    return [];
  }
};
