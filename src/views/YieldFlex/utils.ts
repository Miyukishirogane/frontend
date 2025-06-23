import { BN } from 'src/utils';
import { TStrategyItem, TTokenProjeetInfo } from './type';
import { defaultValueStrategy } from './constants';
import { Address } from 'viem';
import { TAppChainId } from 'src/jotai/wallet/type';
import { projeetTradeTokens } from './mapNameToken';

export function priceToTick(price: number, tokenADecimal: number, tokenBDecimal: number) {
  const tickBase = 1.0001;
  const tick = Math.log(price / 10 ** (tokenADecimal - tokenBDecimal)) / Math.log(tickBase);

  return Number(tick.toFixed(0));
}

export function tickToPrice(tick: number, tokenADecimal: number, tokenBDecimal: number) {
  const tickBase = 1.0001;
  const price = BN(tickBase ** tick).multipliedBy(BN(10).pow(tokenADecimal - tokenBDecimal));

  return Number(price.toString());
}

export const getStrategyItem = (strategyItems: TStrategyItem[]): TStrategyItem[] => {
  if (strategyItems.length === 1) {
    const isDefaultStrategyItem = strategyItems.every(item => {
      return (
        item.amount === defaultValueStrategy.amount &&
        item.maxPrice === defaultValueStrategy.maxPrice &&
        item.minPrice === defaultValueStrategy.minPrice
      );
    });

    return isDefaultStrategyItem ? [] : strategyItems;
  }

  return strategyItems;
};

export function fixTickRange(min: number, max: number) {
  if (min % 10 != 0) {
    min = min - (min % 10) + 10;
  }

  if (max % 10 != 0) {
    max = max - (max % 10);
  }

  return {
    min: min,
    max: max,
  };
}

export const findProjeetTokenByAddress = (address: Address, chainId: TAppChainId): TTokenProjeetInfo => {
  const listTokenByChain = projeetTradeTokens[chainId];
  const result = Object.values(listTokenByChain || {}).find(value => {
    return value.address === address;
  });

  return result;
};
