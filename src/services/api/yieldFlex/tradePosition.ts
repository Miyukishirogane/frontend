import axios from 'axios';
import { configEvmChain } from 'src/jotai/wallet/config';
import { apiUrl } from 'src/services/apiUrl';
import { Address } from 'viem';
import { getChainId } from 'wagmi/actions';

export type TTradingPosition = {
  priceRange: {
    minPrice: number;
    maxPrice: number;
  };
  //liquidity
  position: {
    amount0: number;
    amount1: number;
  };
  reward: {
    amount0: number;
    amount1: number;
  };
  pool: {
    token0: string;
    token1: string;
    fee: number;
  };
  stopLoss: number;
  endtime: number;
  tokenId: number;
  status: 'PENDING' | 'CLAIM';
};

export const getTradePosition = async (addressUser: Address, pair: string): Promise<TTradingPosition[]> => {
  try {
    const chainId = getChainId(configEvmChain);
    const resp = await axios.get(apiUrl.getTradePosition(addressUser, pair, chainId));

    if (resp?.data) {
      return resp.data as TTradingPosition[];
    }

    return [] as TTradingPosition[];
  } catch (error) {
    console.log('handleLogin error', error);
    return [] as TTradingPosition[];
  }
};
