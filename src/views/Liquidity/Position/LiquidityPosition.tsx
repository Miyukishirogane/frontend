import { Box, Button, Grid, Paper } from '@mui/material';
import ActionBox from './ActionBox';
import PositionChart from './PositionChart';
import PositionTable from './PositionTable';
import { useChartOption } from './state/positionChart';

const LiquidityPosition = () => {
  const [chartOption, setChartOption] = useChartOption();

  return (
    <>
      <Paper elevation={1} sx={{ mb: 2 }}>
        <Grid
          container
          sx={{
            borderRadius: '20px',
            backgroundColor: '#fff',
            p: '28px',
          }}
        >
          <Grid
            item
            xs={12}
            xl={8}
            sx={{ border: '1px solid #DADBDD', borderRadius: '20px', p: '28px', overflow: 'auto' }}
          >
            <Box sx={{ minWidth: '500px' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Button
                    variant={chartOption === '5m' ? 'contained' : 'outlined'}
                    color="primary"
                    size="small"
                    onClick={() => setChartOption('5m')}
                  >
                    5m
                  </Button>
                  <Button
                    variant={chartOption === '15m' ? 'contained' : 'outlined'}
                    color="primary"
                    size="small"
                    onClick={() => setChartOption('15m')}
                  >
                    15m
                  </Button>
                </Box>
              </Box>
              <PositionChart />
            </Box>
          </Grid>

          <Grid item xs={12} xl={4} sx={{ mt: { xs: '28px', xl: '0px' } }}>
            <Box
              sx={{
                ml: { xl: '28px' },
                border: '1px solid #DADBDD',
                borderRadius: '20px',
                height: '100%',
              }}
            >
              <ActionBox />
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <PositionTable />
    </>
  );
};

export default LiquidityPosition;
