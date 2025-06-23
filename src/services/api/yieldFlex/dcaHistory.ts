import axios from 'axios';
import { configEvmChain } from 'src/jotai/wallet/config';
import { apiUrl } from 'src/services/apiUrl';
import { Address } from 'viem';
import { getChainId } from 'wagmi/actions';

export type TDcaHistory = {
  id: number;
  userAddress: string;
  totalRound: number;
  currentRound: number;
  tokenInAddress: string;
  tokenInAmountInit: number;
  tokenInAmount: number;
  roundAmount: string;
  tokenOutAddress: string;
  tokenOutAmount: number;
  recurringCycle: number;
  nextRoundAt: number;
  createdAt: number;
  status: number;
  averagePrice: number;
  pnl: number;
  pnlPercent: number;
  currentPrice: number;
  costSpent: number;
  tokenOutValue: number;
  pair: string;
};

export const getDcaHistory = async (
  userAddress: Address,
  status: string,
  page: number,
  itemPerPage: number,
): Promise<{ data: TDcaHistory[]; totalPage: number }> => {
  const chainId = getChainId(configEvmChain);
  const resp = await axios.get(apiUrl.getDcaHistory(userAddress, status, page, itemPerPage, chainId));

  if (resp?.data) {
    return { data: resp.data.data, totalPage: resp.data.totalPage };
  }

  return { data: [], totalPage: 0 };
};
