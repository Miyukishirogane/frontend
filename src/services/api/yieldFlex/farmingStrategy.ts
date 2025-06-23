import axios from 'axios';
import { configEvmChain } from 'src/jotai/wallet/config';
import { apiUrl } from 'src/services/apiUrl';
import { getChainId } from 'wagmi/actions';

export type TFarmingStrategy = {
  from: number;
  to: number;
  ratio: number;
  minPrice: number;
  maxPrice: number;
};

export const getFarmingStrategy = async (
  minPrice: number,
  maxPrice: number,
  pair: string,
  timeInterval: string,
  isBuy: boolean,
): Promise<TFarmingStrategy[]> => {
  const chainId = getChainId(configEvmChain);

  const resp = await axios.get(apiUrl.getFarmingStrategy(minPrice, maxPrice, pair, timeInterval, chainId, isBuy));

  if (resp?.data) {
    return resp.data as TFarmingStrategy[];
  }

  return [];
};
