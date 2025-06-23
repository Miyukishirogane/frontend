import { Box, Paper, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { handleGetDashboardPnl } from 'src/services/api/dashboard';
import { Address } from 'viem';
import { useChainId } from 'wagmi';
import PNLChart from '../DashboardChart/PNLChart';
import { TypeDashboardData } from '../type';
import { IconSpinLoading } from 'src/assets/icon';

interface IProps {
  selectedVaultAddress: string | Address;
}

const PNLSection = (props: IProps) => {
  const { selectedVaultAddress } = props;
  const chainIdSelected = useChainId();

  const { data: pnlData, isLoading } = useQuery<TypeDashboardData>({
    queryKey: ['PNLSection', selectedVaultAddress, chainIdSelected],
    queryFn: async () => {
      const vaultAddress = selectedVaultAddress !== 'all' ? (selectedVaultAddress as Address) : undefined;
      const resp = await handleGetDashboardPnl(chainIdSelected, vaultAddress);

      return resp;
    },
  });

  return (
    <Paper sx={{ p: 4, flex: 1, maxWidth: { xs: 'unset', md: '50%' } }} elevation={1}>
      <Box display="flex" width="100%" justifyContent="space-between" mb={4}>
        <Typography variant="h5" fontWeight="700">
          Profit and Loss
        </Typography>
      </Box>

      {isLoading ? (
        <Box sx={{ p: '50px', textAlign: 'center' }}>
          <IconSpinLoading sx={{ fontSize: '100px' }} />
        </Box>
      ) : (
        <PNLChart data={pnlData} />
      )}
    </Paper>
  );
};

export default PNLSection;
