import { Box, Typography } from '@mui/material';
import GovernanceBanner from '/img/Governance/GovernanceBanner.png';
import ProjeetBannerBg from '/img/Projeet/ProjeetBannerBg.png';
import { useMemo } from 'react';
import useGetProposals from '../Proposal/hooks/useGetProposals';
import TypographyByStatus from 'src/components/TypographyLoading/TypographyByStatus';

type TDataGovernance = {
  title: string;
  value: React.ReactNode;
  text: string;
};

export default function AnnouncementGovernance() {
  const { listProposals, status } = useGetProposals();

  const listDataGovernance: TDataGovernance[] = useMemo(() => {
    return [
      {
        title: 'Delegates',
        value: '$11.96K',
        text: '218.6K token holders',
      },
      {
        title: 'Proposals',
        value: listProposals?.length || 0,
        text: 'There are active proposals',
      },
      {
        title: 'Treasury',
        value: '$8.43M',
        text: '1 treasury source',
      },
    ];
  }, [listProposals]);

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        backgroundImage: `url(${ProjeetBannerBg})`,
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        borderRadius: '20px',
        height: { xs: 'auto', md: '300px' },
        mt: { md: 5, xs: 3 },
        py: { xs: 2, md: 0 },
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ width: '100%', zIndex: 2, position: 'relative', m: 'auto', px: { xl: 4, xs: 2 } }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '30px', md: '40px', lg: '50px' },
            fontWeight: 1000,
            color: '#fff',
            mb: { xs: 0, sm: 4 },
          }}
        >
          TCV Governance
        </Typography>
        <Box sx={{ display: 'flex', gap: { xl: '16px', xs: '8px' }, flexDirection: { xs: 'column', sm: 'row' } }}>
          {listDataGovernance.map(data => (
            <Box
              sx={{
                backgroundColor: '#FFFFFF33',
                borderRadius: '20px',
                p: '16px',
                color: '#FFFFFF',
                minWidth: '200px',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: { xs: 'center', md: 'left' },
                alignItems: { xs: 'center', md: 'flex-start' },
                gap: '4px',
              }}
              key={data.title}
            >
              <Typography fontWeight={400} fontSize={'14px'} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                {data.title}
              </Typography>
              <TypographyByStatus
                status={status}
                fontWeight={700}
                fontSize={'36px'}
                skeletonProps={{
                  height: '50px',
                  width: '50%',
                }}
              >
                {data.value}
              </TypographyByStatus>
              <Typography
                fontWeight={400}
                fontSize={'12px'}
                sx={{ color: '#A0C6FF', textAlign: { xs: 'center', md: 'left' } }}
              >
                {data.text}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
      <Box
        sx={{
          height: '100%',
          img: {
            height: '100%',
          },
          display: {
            md: 'block',
            xs: 'none',
          },
        }}
      >
        <img src={GovernanceBanner} alt="liquidity_announcement" fetchPriority="high" />
      </Box>
    </Box>
  );
}
