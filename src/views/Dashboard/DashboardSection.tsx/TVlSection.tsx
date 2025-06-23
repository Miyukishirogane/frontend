import { Box, Paper, Typography } from '@mui/material';
import { handleGetDashboardTvl } from 'src/services/api/dashboard';
import { Address } from 'viem';
import { useChainId } from 'wagmi';
import TVLChart from '../DashboardChart/TVLChart';
import { useQuery } from '@tanstack/react-query';
import { TypeDashboardData } from '../type';
import { IconSpinLoading } from 'src/assets/icon';

interface IProps {
  selectedVaultAddress: string | Address;
}

const TVlSection = (props: IProps) => {
  const { selectedVaultAddress } = props;
  const chainIdSelected = useChainId();

  const { data: tvlData, isLoading } = useQuery<TypeDashboardData>({
    queryKey: ['TVlSection', selectedVaultAddress, chainIdSelected],
    queryFn: async () => {
      const vaultAddress = selectedVaultAddress !== 'all' ? (selectedVaultAddress as Address) : undefined;
      const resp = await handleGetDashboardTvl(chainIdSelected, vaultAddress);

      return resp;
    },
  });

  return (
    <Paper sx={{ p: 4 }} elevation={1}>
      <Box display="flex" width="100%" justifyContent="space-between" mb={4}>
        <Typography variant="h5" fontWeight="700">
          Total value locked
        </Typography>
      </Box>

      {isLoading ? (
        <Box sx={{ p: '50px', textAlign: 'center' }}>
          <IconSpinLoading sx={{ fontSize: '100px' }} />
        </Box>
      ) : (
        <TVLChart data={tvlData} />
      )}
    </Paper>
  );
};

export default TVlSection;
