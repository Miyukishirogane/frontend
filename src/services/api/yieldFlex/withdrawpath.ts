import axios from 'axios';
import { configEvmChain } from 'src/jotai/wallet/config';
import { apiUrl } from 'src/services/apiUrl';
import { Address } from 'viem';
import { getChainId } from 'wagmi/actions';

export type TWithdrawPath = {
  withdrawAmount: string;
  pool: Address[];
  amount: string[];
};

export const getWithdrawPath = async (tokenAddress: Address, amount: string): Promise<TWithdrawPath | undefined> => {
  const chainId = getChainId(configEvmChain);
  const resp = await axios.get(apiUrl.getWithdrawPath(tokenAddress, amount, chainId));

  if (resp?.data) {
    return resp.data as TWithdrawPath;
  }

  return undefined;
};
