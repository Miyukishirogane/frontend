import { TTokenInfo } from 'src/services/api/liquidity';

type TokenState = {
    // price: BigNumber;
    rate: BigNumber;
    // userBalance: BigNumber;
    amount: string;
};

export type TAddLiquidState = {
    isZapIn: boolean;
    isUseETH: boolean;
    tokenSelectedZapInOn: 'token1' | 'token2';
    amount1Input: string;
    amount2Input: string;
    slippage: string;
};

export type TRemoveLiquidState = {
    isUseETH: boolean;
    amount1Input: string;
    amount2Input: string;
};

export type TAccordionVaultState = {
    token1Info: TTokenInfo & TokenState;
    token2Info: TTokenInfo & TokenState;
    isCanUseETH: 'token1' | 'token2' | null;
    addLiquidity: TAddLiquidState;
    removeLiquidity: TRemoveLiquidState;
    tvl: string;
    apr: string;
    tvlPool: string;
    deposited: string;
    rewards: string;
    tokenRewardInfo: TTokenInfo;
    addressVault: Address;
    vaultStaking: Address;
    avgApr: number | null;
    tcvApr: number | null;
    dataChart: TFetchDataChart | null;
    isFetchingPoolData: boolean;
    ranges: number | null;
};
