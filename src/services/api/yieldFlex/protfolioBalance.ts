import axios from 'axios';
import { TAppDenom } from 'src/constants/mapTokenToIcon';
import { configEvmChain } from 'src/jotai/wallet/config';
import { apiUrl } from 'src/services/apiUrl';
import { Address } from 'viem';
import { getChainId } from 'wagmi/actions';

export type TUserProjeetBalance = {
  token: TAppDenom;
  balance: number;
  balanceFree: number;
  aprFarming: number;
};

export const getProjeetUserBalance = async (address: Address): Promise<TUserProjeetBalance[]> => {
  const chainId = getChainId(configEvmChain);
  const resp = await axios.get(apiUrl.getProjeetPortfolioBalance(address, chainId));

  if (resp?.data) {
    return resp.data as TUserProjeetBalance[];
  }

  return [];
};
