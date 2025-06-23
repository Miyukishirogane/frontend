import { Box, Divider, Skeleton, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { imagePath } from 'src/constants/imagePath';
import { handleGetDashboardOverview } from 'src/services/api/dashboard';
import { useChainId } from 'wagmi';
import { TypeDashboardOverView } from '../type';
import { formatMinusNumber, toFixedLargeNumbers } from 'src/utils/format';

const DashboardAnnouncement = () => {
  const chainIdSelected = useChainId();

  const { data: overviewData, isLoading } = useQuery<TypeDashboardOverView>({
    queryKey: ['DashboardAnnouncement', chainIdSelected],
    queryFn: async () => {
      const resp = await handleGetDashboardOverview(chainIdSelected);

      return resp;
    },
  });

  const handleDisplayEaring = () => {
    if (!overviewData?.earningFee) return 0;
    const earningFee = Number(toFixedLargeNumbers(overviewData?.earningFee, 2));

    if (earningFee >= 0) return `+$${earningFee}`;
    return formatMinusNumber(toFixedLargeNumbers(overviewData?.earningFee, 2) || 0, '$');
  };

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        backgroundImage: `url(${imagePath.BG1})`,
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        borderRadius: '20px',
        mt: { md: 5, xs: 3 },
        minHeight: { xs: 'unset', md: '352px' },
        px: 3,
        py: { xs: 2, md: 0 },
        flexDirection: { xs: 'column', md: 'row' },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          minWidth: '280px',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          display: 'flex',
          maxWidth: '200px',
          mx: { xs: 'auto', md: 'unset' },
          p: 2,
        }}
      >
        <Box
          component="img"
          src={imagePath.DashboardAnnouncementIcon}
          alt="air_drop_box"
          sx={{ objectFit: 'contain', my: 'auto' }}
        />
      </Box>

      <Box
        display="flex"
        color="white"
        flex={1}
        m="auto"
        flexDirection={{ xs: 'column', md: 'row' }}
        textAlign={{ xs: 'center', md: 'unset' }}
      >
        <Box sx={{ p: { xs: '4px 8px', md: '8px 24px' }, flex: 1 }}>
          <Typography variant="body1" flexWrap="nowrap" color="rgba(160, 198, 255, 1)">
            TVL
          </Typography>

          <Typography variant="h1">
            {isLoading ? (
              <Skeleton width={200} />
            ) : (
              `${formatMinusNumber(toFixedLargeNumbers(overviewData?.tvl || 0, 2), '$')}`
            )}
          </Typography>
        </Box>
        <Divider variant="middle" sx={{ borderColor: 'white', borderWidth: '1px', my: 2 }} />

        <Box sx={{ p: { xs: '4px 8px', md: '8px 24px' }, flex: 1 }}>
          <Typography variant="body1" flexWrap="nowrap" color="rgba(160, 198, 255, 1)">
            Today PNL
          </Typography>
          <Typography variant="h1">
            {isLoading ? (
              <Skeleton width={200} />
            ) : (
              `${formatMinusNumber(toFixedLargeNumbers(overviewData?.pnl || 0, 2), '$')}`
            )}
          </Typography>
        </Box>
        <Divider variant="middle" sx={{ borderColor: 'white', borderWidth: '1px', my: 2 }} />

        <Box sx={{ p: { xs: '4px 8px', md: '8px 24px' }, flex: 1 }}>
          <Typography variant="body1" flexWrap="nowrap" color="rgba(160, 198, 255, 1)">
            Today Earning
          </Typography>
          <Typography variant="h1">{isLoading ? <Skeleton width={200} /> : handleDisplayEaring()}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardAnnouncement;
