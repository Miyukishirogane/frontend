import { Box, Typography } from '@mui/material';
import { formatNumber } from 'src/utils/format';
import { useLiquidityData, useLiquidityFunction } from 'src/views/Liquidity/jotai/state';
import { TAccordionVaultState } from 'src/views/Liquidity/jotai/type';

export default function YourBalance({ vault }: { vault: TAccordionVaultState }) {
    const { balance } = useLiquidityData();
    const { nativeToken } = useLiquidityFunction();
    const { token1Info, token2Info, addLiquidity, isCanUseETH } = vault;

    return (
        <Box sx={{ marginBottom: '12px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                    <Typography variant="body2" sx={{ color: '#828282' }}>
                        Your Balance
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', rowGap: 1.5, flexDirection: 'column' }}>
                    {addLiquidity.isUseETH && isCanUseETH == 'token1' ? (
                        <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'flex-end' }}>
                            <Typography sx={{ marginRight: '5px' }} variant="h5">
                                {formatNumber(balance[nativeToken], { fractionDigits: 6 })}
                            </Typography>
                            <Typography sx={{ color: '#5F5F5F' }}>{nativeToken}</Typography>
                        </Box>
                    ) : (
                        <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'end' }}>
                            <Typography sx={{ marginRight: '5px' }} variant="h5">
                                {formatNumber(balance[token1Info.symbol], { fractionDigits: 6 })}
                            </Typography>
                            <Typography sx={{ color: '#5F5F5F' }}>{token1Info.symbol}</Typography>
                        </Box>
                    )}

                    {addLiquidity.isUseETH && isCanUseETH == 'token2' ? (
                        <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'flex-end' }}>
                            <Typography sx={{ marginRight: '5px' }} variant="h5">
                                {formatNumber(balance[nativeToken], { fractionDigits: 6 })}
                            </Typography>
                            <Typography sx={{ color: '#5F5F5F' }}>{nativeToken}</Typography>
                        </Box>
                    ) : (
                        <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'flex-end' }}>
                            <Typography sx={{ marginRight: '5px' }} variant="h5">
                                {formatNumber(balance[token2Info.symbol], { fractionDigits: 6 })}
                            </Typography>
                            <Typography sx={{ color: '#5F5F5F' }}>{token2Info.symbol}</Typography>
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
}
