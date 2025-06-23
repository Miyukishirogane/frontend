import { Box, Typography } from '@mui/material';
import SwitchBtn from 'src/views/Liquidity/common/SwitchBtn';
import { TAccordionVaultState } from '../jotai/type';
import { useLiquidityFunction } from '../jotai/state';

type Props = {
    // goBack: () => void;
    index: number;
    vault: TAccordionVaultState;
};
export default function BookMark({ index, vault }: Props) {
    const { addLiquidity, isCanUseETH } = vault;
    const { changeAddLpStateByIndex, nativeToken } = useLiquidityFunction();
    return (
        <Box mb={2}>
            {/* <Box sx={{ display: 'flex', placeItems: 'center' }}> */}
            {/* <Box>
                    <Box onClick={goBack} sx={{ display: 'flex', alignItems: 'center' }} style={{ cursor: 'pointer' }}>
                        <IconArrowLeft sx={{ mr: 1 }} />
                        <Typography variant="h6" color={'text.primary'}>
                            View Liquidity
                        </Typography>
                    </Box>
                </Box> */}
            <Box ml={'auto'} sx={{ display: 'flex', gap: 2 }}>
                {/* <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { lg: 'flex-end', xs: 'flex-start' } }}>
                        <SwitchBtn checked={addLiquidity.isZapIn} onChange={(e) => changeAddLpStateByIndex(index, { isZapIn: e.target.checked })} sx={{ mr: 1.5 }} />
                        <Typography variant="body1" color={'text.primary'}>
                            Zap In
                        </Typography>
                    </Box> */}

                {isCanUseETH ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { lg: 'flex-end', xs: 'flex-start' } }}>
                        <SwitchBtn checked={addLiquidity.isUseETH} onChange={(e) => changeAddLpStateByIndex(index, { isUseETH: e.target.checked })} sx={{ mr: 1.5 }} />
                        <Typography variant="body1" color={'text.primary'}>
                            Use {nativeToken}
                        </Typography>
                    </Box>
                ) : null}
            </Box>
            {/* </Box> */}
        </Box>
    );
}
