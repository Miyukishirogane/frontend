import { TPendleState } from 'src/jotai/pendle/type';
import { BN } from 'src/utils';

export const handleCalcPoolAPY = (poolDetail: TPendleState) => {
  const { totalPt, totalSy, underlyingApy, ptFixedYield } = poolDetail;

  if(!underlyingApy) return BN(0);

  const rate = Number(totalPt) / (Number(totalPt) + Number(totalSy))
  const fixedYield = BN(ptFixedYield).dividedBy(1e16).toNumber()
  
  const apy = underlyingApy + (fixedYield * rate)

  return BN(apy)
};
