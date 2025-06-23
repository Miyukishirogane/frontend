import BigNumber from 'bignumber.js';
import IconAndName from 'src/components/IconAndName/IconAndName';
import InputCustom from 'src/components/InputCustom/InputCustom';
import { useBaseTokenData } from 'src/jotai/baseTokenInfo/baseTokenInfo';
import { formatNumber } from 'src/utils/format';
import { useLiquidityData, useLiquidityFunction } from 'src/views/Liquidity/jotai/state';
import { TAccordionVaultState } from 'src/views/Liquidity/jotai/type';

type Props = {
    index: number;
    vault: TAccordionVaultState;
    value1: BigNumber;
    value2: BigNumber;
};
export default function InputTokens({ vault, value1, value2 }: Props) {
    const { removeLiquidity, token1Info, token2Info, isCanUseETH } = vault;
    const { price } = useBaseTokenData();
    const { priceTokens } = useLiquidityData();
    const { nativeToken } = useLiquidityFunction();
    const isUseETH = removeLiquidity.isUseETH;

    return (
        <>
            <InputCustom
                value={value1.toFixed(6).toString()}
                onChange={() => { }}
                readonly={true}
                endElement={<IconAndName nameToken={isCanUseETH == 'token1' && isUseETH ? nativeToken : token1Info.symbol} sxIcon={{ fontSize: '20px' }} />}
                subValue={`$ ${formatNumber(value1.times(price).times(priceTokens[token1Info.symbol]), { fractionDigits: 2 })}`}
            />
            <InputCustom
                value={value2.toFixed(6)}
                onChange={() => { }}
                readonly={true}
                endElement={<IconAndName nameToken={isCanUseETH == 'token2' && isUseETH ? nativeToken : token2Info.symbol} sxIcon={{ fontSize: '20px' }} />}
                subValue={`$ ${formatNumber(value2.times(price).times(priceTokens[token2Info.symbol]), { fractionDigits: 2 })}`}
            />
        </>
    );
}
