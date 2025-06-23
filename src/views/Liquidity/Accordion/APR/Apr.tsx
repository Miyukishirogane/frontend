import InfoOutlined from '@mui/icons-material/InfoOutlined';
import { Box, createTheme, Divider, Grid, Skeleton, ThemeProvider, Tooltip, Typography } from '@mui/material';
import { BN } from 'src/utils';
import { formatNumber } from 'src/utils/format';
import { useLiquidityData } from '../../jotai/state';

export default function Apr({ index }: { index: number }) {
  const { listVault: liquidityVaults } = useLiquidityData();

  const listVault = liquidityVaults;
  const { isFetchingPoolData } = listVault ? listVault[index] : { isFetchingPoolData: false };
  const aprAvg = BN(listVault?.[index].avgApr);
  const aprTcv = BN(listVault?.[index].tcvApr);

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
              <Tooltip title="Average 1 day APR of Uniswap v3 pool" placement="top">
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
                  Average APR
                  <InfoOutlined style={{ marginLeft: '1px', fontSize: '20px', color: '#8C8C8C' }} />
                </Typography>
              </Tooltip>
            </ThemeProvider>
            <Typography color="primary" variant="h2" component={'span'} fontWeight={700}>
              {isFetchingPoolData ? (
                <Skeleton variant="text" width={100} height={40} />
              ) : (
                <>
                  {formatNumber(aprAvg, { fractionDigits: 2, fallback: '----' })}
                  <Typography variant="h6" component={'span'} color="primary" sx={{ fontSize: '24px' }}>
                    %
                  </Typography>
                </>
              )}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={0.02} textAlign="center">
          <Divider orientation="vertical" sx={{ height: '60px', backgroundColor: '#76A3F8', width: '0.8px' }} />
        </Grid>
        <Grid item xs={5.99}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ThemeProvider theme={themeTooltip}>
              <Tooltip title="Optimized APR by TCV Platform" placement="top">
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
                  Optimized APR
                  <InfoOutlined style={{ marginLeft: '1px', fontSize: '20px', color: '#8C8C8C' }} />
                </Typography>
              </Tooltip>
            </ThemeProvider>
            <Typography color="primary" variant="h2" component={'span'} fontWeight={700}>
              {isFetchingPoolData ? (
                <Skeleton variant="text" width={100} height={40} />
              ) : (
                <>
                  {formatNumber(aprTcv, { fractionDigits: 2, fallback: '----' })}
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
