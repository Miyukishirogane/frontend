import { Box, Typography } from '@mui/material';
import AutoRaidBanner from '/img/AutoRaid/AutoRaidBanner.png';
import ProjeetBannerBg from '/img/Projeet/ProjeetBannerBg.png';

export default function AnnouncementAutoRaid() {
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
        minHeight: '352px',
        mt: { md: 5, xs: 3 },
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'center',
        justifyContent: 'center',
        p: 4,
      }}
    >
      <Box sx={{ width: '100%', zIndex: 2, position: 'relative', m: 'auto' }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '60px', md: '60px', lg: '70px' },
            fontWeight: 1000,
            color: '#fff',
          }}
        >
          AutoRaid
        </Typography>
        <Typography
          variant="h4"
          sx={{
            background: 'linear-gradient(90deg, #a1beed 0%, #39BAFD 100%)',
            '-webkit-background-clip': 'text',
            '-webkit-text-fill-color': 'transparent',
            fontWeight: 1000,
            width: { xs: 'unset', md: '70%' },
          }}
        >
          Experience the power of automation on TCV and unlock token whitelist.
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: { xs: 'center', md: 'right' },
          width: { lg: '40%', xs: '100%' },
          img: {
            height: '300px',
            width: '300px',
          },
        }}
      >
        <img src={AutoRaidBanner} alt="liquidity_announcement" fetchPriority="high" />
      </Box>
    </Box>
  );
}
