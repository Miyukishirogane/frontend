import { Box, Grid } from '@mui/material';
import RemoveLiquidity from 'src/views/Liquidity/Accordion/DetailLiquidity/LeftContent/RemoveLiquid/RemoveLiquidity';
import RightContent from 'src/views/Liquidity/Accordion/DetailLiquidity/RightContent/RightContent';
import { TAccordionVaultState } from 'src/views/Liquidity/jotai/type';
import { useLiquidityData } from 'src/views/Liquidity/jotai/state';

export default function ModalRemoveLiquidity({ index }: { index: number }) {
  const vault = useLiquidityData().listVault[index] as TAccordionVaultState;

  return (
    <Box sx={{ mb: 2 }}>
      <Grid container spacing={7}>
        <Grid item xs={12} sm={6}>
          <RemoveLiquidity index={index} vault={vault} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <RightContent index={index} vault={vault} />
        </Grid>
      </Grid>
    </Box>
  );
}
