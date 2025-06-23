import axios from 'axios';
import { configEvmChain } from 'src/jotai/wallet/config';
import { apiUrl } from 'src/services/apiUrl';
import { getChainId } from 'wagmi/actions';

export const getFarmingPrice = async (pair: string): Promise<number> => {
  try {
    const chainId = getChainId(configEvmChain);
    const resp = await axios.get(apiUrl.getFarmingPrice(pair, chainId));

    if (resp?.data) {
      return resp.data.price;
    }
    return 0;
  } catch (error) {
    console.log('handleLogin error', error);
    return 0;
  }
};
