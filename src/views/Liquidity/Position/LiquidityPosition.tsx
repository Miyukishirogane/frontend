import { Box } from '@mui/material';
import { Paper } from '@mui/material';
import { Grid } from '@mui/material';
import React from 'react';
import PositionChart from './PositionChart';
import ActionBox from './ActionBox';
import PositionTable from './PositionTable';

const LiquidityPosition = () => {
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
