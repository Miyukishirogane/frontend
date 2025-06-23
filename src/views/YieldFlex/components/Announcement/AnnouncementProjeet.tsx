import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ProjeetBannerBg from '/img/Projeet/ProjeetBannerBg.png';
import ProjeetBanner from '/img/Projeet/ProjeetBanner.png';

export default function AnnouncementProjeet() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate(`/dashboard?tab=yieldFlex `);
  };

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
        px: { md: 4, xs: 4 },
        py: { xs: 4 },
      }}
    >
      <Box sx={{ width: '100%', zIndex: 2, position: 'relative', m: 'auto' }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '30px', md: '40px', lg: '50px' },
            fontWeight: 1000,
            color: '#fff',
          }}
        >
          YieldFlex
        </Typography>
        <Typography
          variant="h5"
          sx={{
            background: 'linear-gradient(90deg, #a1beed 0%, #39BAFD 100%)',
            '-webkit-background-clip': 'text',
            '-webkit-text-fill-color': 'transparent',
            fontWeight: 1000,
          }}
        >
          The perfect blend of Trading and Yield Farming. YieldFlex helps you maximize your profits to the fullest.
        </Typography>

        <Box
          sx={{
            maxWidth: {
              xsm: '150px',
            },
            width: '100%',
          }}
        >
          <Button
            variant="outlined"
            sx={{
              mt: { md: 3, xs: 1 },
              color: '#39BAFD',
              height: { xs: '30px', xsm: '44px' },
              fontSize: { xs: '12px', xsm: '14px' },
              width: 'fit-content',
            }}
            onClick={handleRedirect}
          >
            Go to Portfolio
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          width: { lg: '50%', xs: '100%' },
          mr: { lg: '6%', xs: '0%' },
          ml: { lg: 4 },
          img: {
            width: '100%',
            scale: { lg: '1.5', xs: '1' },
          },
        }}
      >
        <img src={ProjeetBanner} alt="liquidity_announcement" fetchPriority="high" />
      </Box>
    </Box>
  );
}
