import IconAndName from 'src/components/IconAndName/IconAndName';
import InputCustom from 'src/components/InputCustom/InputCustom';
import SwitchTokenZapin from './SwitchTokenZapin/SwitchTokenZapin';
import { BN } from 'src/utils';
import { TAccordionVaultState } from 'src/views/Liquidity/jotai/type';
import { useLiquidityData, useLiquidityFunction } from 'src/views/Liquidity/jotai/state';
import { formatNumber } from 'src/utils/format';
import BoxLoading from 'src/components/BoxLoading/BoxLoading';
import { useBaseTokenData } from 'src/jotai/baseTokenInfo/baseTokenInfo';
import { useMemo } from 'react';
import { FormHelperText } from '@mui/material';

export default function InputTokens({ index, vault }: { index: number; vault: TAccordionVaultState }) {
  const { addLiquidity, token1Info, token2Info, isCanUseETH } = vault;
  const { priceTokens, isFetchingRate, balance } = useLiquidityData();
  const { changeAddLpStateByIndex, nativeToken } = useLiquidityFunction();
  const baseToken = useBaseTokenData();

  const isZapIn = addLiquidity.isZapIn;
  const isUseETH = addLiquidity.isUseETH;

  const isInvalidMaxValue = useMemo(() => {
    if (addLiquidity.amount1Input === '0' && addLiquidity.amount2Input === '0') {
      return false;
    }

    const amountMaxToken1 = isCanUseETH == 'token1' && isUseETH ? balance[nativeToken] || BN(0) : balance[token1Info.symbol] || BN(0);
    const amountMaxToken2 = isCanUseETH == 'token2' && isUseETH ? balance[nativeToken] || BN(0) : balance[token2Info.symbol] || BN(0);

    return BN(addLiquidity.amount1Input).isGreaterThan(amountMaxToken1) || BN(addLiquidity.amount2Input).isGreaterThan(amountMaxToken2);
  }, [addLiquidity.amount1Input, addLiquidity.amount2Input, balance, isCanUseETH, isUseETH, nativeToken, token1Info.symbol, token2Info.symbol]);

  function onClickMax(token: 'token1' | 'token2') {
    if (token == 'token1') {
      const amountMax = isCanUseETH == 'token1' && isUseETH ? balance[nativeToken] || BN(0) : balance[token1Info.symbol] || BN(0);
      changeAddLpStateByIndex(index, { amount1Input: amountMax.toFixed(6, 1), amount2Input: BN(amountMax).times(token1Info.rate).toFixed(6, 1) });
    }
    if (token == 'token2') {
      const amountMax = isCanUseETH == 'token2' && isUseETH ? balance[nativeToken] || BN(0) : balance[token2Info.symbol] || BN(0);
      changeAddLpStateByIndex(index, { amount2Input: amountMax.toFixed(6, 1), amount1Input: BN(amountMax).times(token2Info.rate).toFixed(6, 1) });
    }
  }

  if (isZapIn) {
    if (addLiquidity.tokenSelectedZapInOn == 'token1') {
      return (
        <BoxLoading loading={isFetchingRate}>
          <InputCustom
            value={addLiquidity.amount1Input}
            onChange={(val) => {
              changeAddLpStateByIndex(index, { amount1Input: val, amount2Input: BN(val).times(token1Info.rate).toFixed(6) });
            }}
            endElement={<SwitchTokenZapin index={index} vault={vault} />}
            subValue={`$ ${formatNumber(BN(addLiquidity.amount1Input).times(priceTokens[token1Info.symbol]).times(baseToken.price), { fractionDigits: 2 })}`}
            onClickMax={() => onClickMax('token1')}
          />
        </BoxLoading>
      );
    }
    return (
      <BoxLoading loading={isFetchingRate}>
        <InputCustom
          value={addLiquidity.amount2Input}
          onChange={(val) => {
            changeAddLpStateByIndex(index, { amount2Input: val, amount1Input: BN(val).times(token2Info.rate).toFixed(6) });
          }}
          endElement={<SwitchTokenZapin index={index} vault={vault} />}
          subValue={`$ ${formatNumber(BN(addLiquidity.amount2Input).times(priceTokens[token2Info.symbol]).times(baseToken.price), { fractionDigits: 2 })}`}
          onClickMax={() => onClickMax('token2')}
        />
      </BoxLoading>
    );
  }

  return (
    <BoxLoading loading={isFetchingRate}>
      <InputCustom
        value={addLiquidity.amount1Input}
        onChange={(val) => {
          changeAddLpStateByIndex(index, { amount1Input: val, amount2Input: BN(val).times(token1Info.rate).toFixed(6) });
        }}
        endElement={<IconAndName nameToken={isCanUseETH == 'token1' && isUseETH ? nativeToken : token1Info.symbol} sxIcon={{ fontSize: '20px' }} />}
        subValue={`$ ${formatNumber(BN(addLiquidity.amount1Input).times(priceTokens[token1Info.symbol]).times(baseToken.price), { fractionDigits: 2 })}`}
        onClickMax={() => onClickMax('token1')}
      />
      <InputCustom
        value={addLiquidity.amount2Input.toString()}
        onChange={(val) => {
          changeAddLpStateByIndex(index, { amount2Input: val, amount1Input: BN(val).times(token2Info.rate).toFixed(6) });
        }}
        endElement={<IconAndName nameToken={isCanUseETH == 'token2' && isUseETH ? nativeToken : token2Info.symbol} sxIcon={{ fontSize: '20px' }} />}
        subValue={`$ ${formatNumber(BN(addLiquidity.amount2Input).times(priceTokens[token2Info.symbol]).times(baseToken.price), { fractionDigits: 2 })}`}
        onClickMax={() => onClickMax('token2')}
      />

      {isInvalidMaxValue ? (
        <FormHelperText error sx={{ mb: '16px' }}>
          You don't have enough money
        </FormHelperText>
      ) : null}
    </BoxLoading>
  );
}
