import { Paper } from '@mui/material';
import TablePortfolio from 'src/components/Table/Liquidity/TablePortfolio';
import useLendingVaults from '../hooks/useLendingVaults';

export default function LiquidityLendingPortfolio() {
  const { lendingVaults, isLoading } = useLendingVaults();

  return (
    <Paper sx={{ pt: 2 }} elevation={1}>
      <TablePortfolio isLoading={isLoading} listVault={lendingVaults || []} />
    </Paper>
  );
}
