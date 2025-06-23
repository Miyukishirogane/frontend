import axios from 'axios';
import { apiUrl } from 'src/services/apiUrl';

export type TPairInfo = {
  pair: string;
  poolAddress: string;
  token0: {
    symbol: string;
    address: string;
    decimal: number;
  };
  token1: {
    symbol: string;
    address: string;
    decimal: number;
  };
};

export const getPairsList = async (chainId: number): Promise<TPairInfo[]> => {
  try {
    const resp = await axios.get(apiUrl.getPairsByChainId(chainId));

    if (resp?.data) {
      return resp.data;
    }

    return [];
  } catch (error) {
    console.log('getPairsList error', error);
    return [];
  }
};
