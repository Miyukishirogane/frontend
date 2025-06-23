import { Box, Grid } from '@mui/material';
import { IconSpinLoading } from 'src/assets/icon';
import useLendingVaults from '../hooks/useLendingVaults';
import { TAccordionVaultLendingState } from '../jotai/type';
import AccordionLiquidityLending from './AccordionLiquidityLending';

export default function LiquidityAllAssets() {
  const { lendingVaults, isLoading } = useLendingVaults();

  return (
    <Box sx={{ pb: 10 }}>
      {isLoading ? (
        <IconSpinLoading sx={{ fontSize: '100px' }} />
      ) : (
        <Grid container spacing={{ md: 2.5, xs: 4 }}>
          {lendingVaults?.map((vault, index) => {
            if (vault) {
              return (
                <Grid item xs={12} sm={6} md={4} key={vault?.addressVault + index}>
                  <AccordionLiquidityLending
                    index={index}
                    vaultData={vault as TAccordionVaultLendingState}
                    isLoading={isLoading}
                  />
                </Grid>
              );
            }
          })}
        </Grid>
      )}
    </Box>
  );
}
