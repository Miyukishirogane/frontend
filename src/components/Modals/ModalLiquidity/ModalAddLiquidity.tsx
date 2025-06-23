import { Box, Grid } from '@mui/material';
import AddLiquidity from 'src/views/Liquidity/Accordion/DetailLiquidity/LeftContent/AddLiquidity/AddLiquidity';
import RightContent from 'src/views/Liquidity/Accordion/DetailLiquidity/RightContent/RightContent';
import { TAccordionVaultState } from 'src/views/Liquidity/jotai/type';
import { useLiquidityData } from 'src/views/Liquidity/jotai/state';

export default function ModalAddLiquidity({ index }: { index: number }) {

    const vault = useLiquidityData().listVault[index] as TAccordionVaultState;

    return (
        <Box sx={{ mb: 2 }}>
            <Grid container spacing={{ md: 7, sm: 3, xs: 2 }}>
                <Grid item xs={12} sm={6}>
                    <AddLiquidity index={index} vault={vault} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RightContent index={index} vault={vault} />
                </Grid>
            </Grid>
        </Box>
    );
}
