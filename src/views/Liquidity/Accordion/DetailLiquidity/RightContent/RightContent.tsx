import { Box } from '@mui/material';
import { TAccordionVaultState } from 'src/views/Liquidity/jotai/type';
import ClaimableReward from 'src/components/ClaimableReward/ClaimableReward';
import AreaChartLiquidityDistribution from './AreaChartLiquidityDistribution/AreaChartLiquidityDistribution';

export default function RightContent({ index, vault }: { index: number; vault: TAccordionVaultState }) {
  return (
    <Box mt={2}>
      <Box mb={{ xs: 3, sm: 8 }}>
        <ClaimableReward vault={vault} />
      </Box>
      <AreaChartLiquidityDistribution index={index} />
    </Box>
  );
}
