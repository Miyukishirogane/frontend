import { Address } from 'viem';

export type TTokenInVaultLending = 'USDC' | 'USDT';

export type TAccordionVaultLendingState = {
  tokenInfo: {
    address: Address;
    decimal: number;
    symbol: string;
  };
  apy: number;
  apr: string;
  avgApr: number | null;
  tcvApr: number | null;
  tvlPool: string;
  addressVault: Address;
  isFetchingPoolData: boolean;
};
