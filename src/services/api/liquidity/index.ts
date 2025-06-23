import axios from 'axios';
import { ZERO_ADDRESS } from 'src/constants';
import { TAppChainId } from 'src/jotai/wallet/type';
import { apiUrl } from 'src/services/apiUrl';
import { Address } from 'viem';

export type TTokenInfo = { address: Address; decimal: number; symbol: string; amount: string };
export type TVaultRawData = {
  chainId: string;
  addressVault: Address;
  vaultStaking: Address;
  token1: TTokenInfo;
  token2: TTokenInfo;
  tokenReward: TTokenInfo;
  tvl: string;
  tvlPool: string;
  apr: string;
};

export async function getListVaultByChainId(chainId: TAppChainId): Promise<TVaultRawData[]> {
  const response = await axios.get(apiUrl.getListVaultByChainId(chainId));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = response.data as any[];

  return data.map(vault => {
    return {
      addressVault: vault.addressVault,
      vaultStaking: vault.vaultStaking || ZERO_ADDRESS,
      apr: vault.apr,
      tvl: vault.tvl,
      tvlPool: vault.tvlPool,
      chainId: vault.chainId,
      token1: {
        address: vault.token0?.address || ZERO_ADDRESS,
        decimal: vault.token0?.decimals || 18,
        symbol: vault.token0?.symbol || 'Unknow',
      },
      token2: {
        address: vault.token1?.address || ZERO_ADDRESS,
        decimal: vault.token1?.decimals || 18,
        symbol: vault.token1?.symbol || 'Unknow',
      },
      tokenReward: {
        address: vault.rewardToken?.address || ZERO_ADDRESS,
        decimal: vault.rewardToken?.decimals || 18,
        symbol: vault.rewardToken?.symbol || 'Unknow',
      },
    };
  }) as TVaultRawData[];
}

export type TLendingApyInfo = {
  poolAddress: string;
  supplyAPY: number;
};

export const getLendingPoolApy = async (
  chainId: TAppChainId,
  poolAddress: Address,
  tokenAddress: Address,
): Promise<TLendingApyInfo> => {
  const resp = await axios.get(
    apiUrl.getLendingPoolApy(chainId, poolAddress.toLowerCase(), tokenAddress.toLowerCase()),
  );
  return resp.data as TLendingApyInfo;
};

// * ####################################################################################################################
