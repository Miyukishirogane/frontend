export type ChartItem = [number, ...number[]];
export type Data = ChartItem[];
export type GetRangeFunction = (timestamp: number) => string | number;
export type SYInfo = {
  timestamp: number;
  syIndex: number;
  rewardIndex: number[];
};

export type TypeAPYInfo = {
  underlyingApy: BigNumber;
  longYield: BigNumber;
};

export type TypeAPYPrice = {
  ytPrice: BigNumber;
  ptPrice: BigNumber;
};
