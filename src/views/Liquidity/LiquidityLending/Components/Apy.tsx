import InfoOutlined from '@mui/icons-material/InfoOutlined';
import { Box, createTheme, Grid, Skeleton, ThemeProvider, Tooltip, Typography } from '@mui/material';
import { formatNumber } from 'src/utils/format';
import useGetVaultInfo from '../hooks/useGetVaultInfo';
import { Address } from 'viem';
import { BN } from 'src/utils';

type TProps = {
  vaultAddress: Address;
};
export default function Apr({ vaultAddress }: TProps) {
  const { data, isLoading } = useGetVaultInfo({ vaultAddress: vaultAddress });

  // theme Tooltip
  const themeTooltip = createTheme({
    components: {
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            fontSize: '0.875rem',
            color: 'black',
            backgroundColor: 'white',
            border: '1px solid white',
            boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
            padding: '5px 15px',
            borderRadius: '5px',
            margin: '0',
          },
        },
      },
    },
  });

  return (
    <Box sx={{ minHeight: '94px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={5.99}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ThemeProvider theme={themeTooltip}>
              <Tooltip title="Rebalancing each 8 hours to optimize liquidity users" placement="top">
                <Typography
                  style={{
                    display: 'flex',
                    textAlign: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    color: '#8C8C8C',
                  }}
                  variant="body2"
                  sx={{ fontWeight: 600 }}
                >
                  Optimized APY
                  <InfoOutlined style={{ marginLeft: '1px', fontSize: '20px', color: '#8C8C8C' }} />
                </Typography>
              </Tooltip>
            </ThemeProvider>
            <Typography color="primary" variant="h2" component={'span'} fontWeight={700}>
              {isLoading ? (
                <Skeleton variant="text" width={100} height={40} />
              ) : (
                <>
                  {formatNumber(BN(data?.apy).times(100), { fractionDigits: 2, fallback: '----' })}
                  <Typography variant="h6" component={'span'} color="primary" sx={{ fontSize: '24px' }}>
                    %
                  </Typography>
                </>
              )}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
