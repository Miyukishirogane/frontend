import { Box, Typography } from '@mui/material';
import { IconSpinLoading } from 'src/assets/icon';
import { useLiquidityData } from 'src/views/Liquidity/jotai/state';
import AreaChartData from './AreaChartData/AreaChartData';

export default function AreaChartLiquidityDistribution({ index }: { index: number }) {
  const { listVault } = useLiquidityData();
  const { dataChart, isFetchingPoolData } = listVault[index];

  if (isFetchingPoolData)
    return (
      <Box>
        <IconSpinLoading sx={{ fontSize: '100px' }} />
      </Box>
    );

  return (
    <Box>
      <Typography color="#696969" marginBottom={1} variant="body1" fontWeight={600}>
        Liquidity Distribution
      </Typography>
      {dataChart ? <AreaChartData data={dataChart} /> : 'No data found'}
      {/* {dataChart ? <DistributionChart data={dataChart} /> : 'No data found'} */}
    </Box>
  );
}
