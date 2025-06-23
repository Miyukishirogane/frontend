import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLiquidityData, useLiquidityFunction } from '../../jotai/state';
import { TAccordionVaultState } from '../../jotai/type';
import { BN, isNumeric } from 'src/utils';
import { useBaseTokenData } from 'src/jotai/baseTokenInfo/baseTokenInfo';
import { handleCalcIncentiveApr } from '../../utils/utils';
import BigNumber from 'bignumber.js';
import { useChainId } from 'wagmi';
import AccordionLiquid from '../../Accordion/AccordionLiquid';
import DenomIconLiquid from '../../common/DenomIconLiquid';

export default function AccordionLiquidityDex({
  index,
  vaultData,
  isLoading,
}: {
  index: number;
  vaultData: TAccordionVaultState;
  isLoading: boolean;
}) {
  const chainId = useChainId();
  const { token1Info, token2Info, tvl, addressVault, ranges, vaultStaking } = vaultData;
  const { isFetchingUserVaultData, priceTokens } = useLiquidityData();
  const { getVaultChartAndApr } = useLiquidityFunction();
  const { price, loading: loadingGetPrice } = useBaseTokenData();

  const [incentiveApr, setIncentiveApr] = useState<BigNumber | null>(null);

  const earnings = useMemo(() => {
    const symbol1 = token1Info?.symbol;
    const symbol2 = token2Info?.symbol;
    const amount1After = BN(token1Info?.amount).div(BN(10).pow(token1Info?.decimal)).multipliedBy(priceTokens[symbol1]);
    const amount2After = BN(token2Info?.amount).div(BN(10).pow(token2Info?.decimal)).multipliedBy(priceTokens[symbol2]);
    const FeePrice =
      isNumeric(amount1After) && isNumeric(amount2After)
        ? BN(amount1After).plus(BN(amount2After)).multipliedBy(price)
        : 0;

    return FeePrice;
  }, [
    price,
    priceTokens,
    token1Info?.amount,
    token1Info?.decimal,
    token1Info?.symbol,
    token2Info?.amount,
    token2Info?.decimal,
    token2Info?.symbol,
  ]);

  const loading = isFetchingUserVaultData || isLoading;

  const getIncentiveApr = useCallback(async () => {
    if (!loadingGetPrice) {
      const result = await handleCalcIncentiveApr(vaultStaking, price.times(tvl).toNumber());
      setIncentiveApr(result);
    }
  }, [loadingGetPrice, price, tvl, vaultStaking]);

  const iconHeader = (
    <DenomIconLiquid
      ranges={ranges ?? 0}
      token1={token1Info?.symbol ?? ''}
      token2={token2Info?.symbol ?? ''}
    ></DenomIconLiquid>
  );

  useEffect(() => {
    getVaultChartAndApr(index, addressVault);
    const interval = setInterval(() => {
      getVaultChartAndApr(index, addressVault);
    }, 60000);
    return () => clearInterval(interval);
  }, [chainId, addressVault]);

  useEffect(() => {
    getIncentiveApr();
  }, [getIncentiveApr]);

  return (
    <AccordionLiquid
      index={index}
      loading={loading}
      iconHeader={iconHeader}
      vaultData={vaultData}
      incentiveApr={incentiveApr}
      earnings={earnings}
      price={price}
      loadingGetPrice={loadingGetPrice}
    />
  );
}
