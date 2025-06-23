import axios from 'axios';
import { configEvmChain } from 'src/jotai/wallet/config';
import { apiUrl } from 'src/services/apiUrl';
import { getChainId } from 'wagmi/actions';

// export type TDcaHistoryDetail = {
//   timeBuy: number;
//   tokenOutAmount: number;
//   tokenOutInUsd: number;
//   tokenInAmount: number;
// };

export type TDcaHistoryDetail = {
  _id: string;
  dcaId: number;
  roundIndex: number;
  tokenInAmount: number;
  tokenOutAmount: number;
  tokenOutInUsd: number;
  time: number;
};

export const getDcaHistoryDetail = async (id: string): Promise<TDcaHistoryDetail[]> => {
  const chainId = getChainId(configEvmChain);
  const resp = await axios.get(apiUrl.getDcaHistoryDetail(id, chainId));

  if (resp?.data) {
    return resp.data as TDcaHistoryDetail[];
  }

  return [];
};
