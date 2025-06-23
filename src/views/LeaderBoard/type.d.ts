import { Address } from 'viem';

export type LeaderboardTableType = {
  id: string;
  _id: number;
  chainId: string;
  wallet: Address;

  rankLiquidityPosition: number | null;
  rankReputationTrava: number | null;
  rankDEXTokenHolding: number | null;

  //trava props
  scoreReputationTrava: number | null;
  scoreLiquidityPosition: number | null;
  scoreDEXTokenHolding: number | null;

  //liquidity props
  liquidityVolumeCamelot: number | null;
  liquidityVolumePancakeSwap: number | null;
  liquidityVolumeUniswap: number | null;
  scoreLiquidityCamelot: number | null;
  scoreLiquidityPancakeSwap: number | null;
  scoreLiquidityUniSwap: number | null;
  totalLiquidityVolume: number | null;

  //dex props
  scoreCakeTokenHolding: number | null;
  scoreDEXTokenHolding: number | null;
  scoreGrailTokenHolding: number | null;
  scoreUniTokenHolding: number | null;
};

export type TableHeaderItem = {
  id: number;
  title: string;
  width?: string;
  align?: string;
  label?: string;
  displayOptional?: boolean;
};

export interface ReturnTypeDataTable {
  data: LeaderboardTableType[];
  totalDocs: number;
}

interface ReturnTypeUserDataTable {
  [key: Address]: LeaderboardTableType;
}
