import { Box, Typography } from '@mui/material';
import { TAccordionVaultState } from 'src/views/Liquidity/jotai/type';
import { formatNumber } from 'src/utils/format';
import { useLiquidityData } from 'src/views/Liquidity/jotai/state';
import { BN } from 'src/utils';
import { useBaseTokenData } from 'src/jotai/baseTokenInfo/baseTokenInfo';

function calculateAveragePerSecond(...values: string[]) {

    const numbers = values.map(value => Number(value));

    if (numbers.some(isNaN)) {
        return 0;
    }

    const total = numbers.reduce((sum, value) => sum + value, 0);

    const dailyAverage = total / 365;


    const averagePerSecond = dailyAverage / 86400;

    return averagePerSecond;
}

const Fee = ({ vault }: { vault: TAccordionVaultState }) => {
    const { token1Info, token2Info, addLiquidity } = vault;
    const { priceTokens } = useLiquidityData();
    const baseToken = useBaseTokenData();

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
            <Box display={'flex'} sx={{ placeItems: 'center' }}>
                <Typography
                    variant="body2"
                    sx={{ marginRight: '5px', color: '#828282' }}
                >
                    Fee
                </Typography>
            </Box>
            <Box display={'flex'}>
                <Typography variant="h6" sx={{ marginRight: '5px' }}>
                    ${formatNumber(calculateAveragePerSecond(
                        BN(addLiquidity.amount2Input).times(priceTokens[token2Info.symbol]).times(baseToken.price).toString(),
                        BN(addLiquidity.amount1Input).times(priceTokens[token1Info.symbol]).times(baseToken.price).toString(),
                    ),
                        { fractionDigits: 6 })}
                </Typography>
            </Box>
            {/* <Typography variant="body2">{formatNumber(addLiquidity.slippage.times(100), { fractionDigits: 2 })}%</Typography> */}
        </Box>
    );
}

export default Fee;