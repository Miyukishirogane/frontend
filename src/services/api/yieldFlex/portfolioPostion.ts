import axios from 'axios';
import { TAppDenom } from 'src/constants/mapTokenToIcon';
import { configEvmChain } from 'src/jotai/wallet/config';
import { apiUrl } from 'src/services/apiUrl';
import { getChainId } from 'wagmi/actions';

export type TUserProjeetPositionDetail = {
  pool: string;
  balance: string;
  projectId: string;
  aprFarming: number;
};

export type TUserProjeetPositionItem = {
  token: TAppDenom;
  detail: TUserProjeetPositionDetail[];
};

export const getProjeetPosition = async (): Promise<TUserProjeetPositionItem[]> => {
  const chainId = getChainId(configEvmChain);
  const resp = await axios.get(apiUrl.getProjeetPosition(chainId));

  if (resp?.data) {
    return resp.data as TUserProjeetPositionItem[];
  }

  return [];
};
