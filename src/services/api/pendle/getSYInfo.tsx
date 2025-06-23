import axios from 'axios';
import { TAppChainId } from 'src/jotai/wallet/type';
import { apiUrl } from 'src/services/apiUrl';
import { Address } from 'viem';

export type SYInfo = {
  timestamp: number;
  syIndex: number;
  rewardIndex: number[];
};

export async function getSYInfoList(chainId: TAppChainId, syAddress: Address): Promise<SYInfo[] | []> {
  try {
    const response = await axios.get(apiUrl.getSYInfo(chainId, syAddress));
    const data = response && response.data ? (response.data.data as SYInfo[]) : [];
    return data;
  } catch (err) {
    return [];
  }
}
