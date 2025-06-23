import { Box, Typography } from '@mui/material';
import { IconArrowRight } from 'src/assets/icon';
import { imagePath } from 'src/constants/imagePath';
import Star1Blink from 'src/views/Liquidity/Announcement/Star/Star1Blink';
import StarBlink from 'src/views/Liquidity/Announcement/Star/StarBlink';

const Announcement = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundImage: { xs: `url(${imagePath.convertTCPMobileBg})`, md: `url(${imagePath.convertTCPBg})` },
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        maxWidth: '100%',
        borderRadius: '22px',
        mt: { md: 6, xs: 3 },
        flexDirection: { xs: 'column', sm: 'row' },
        '@media screen and (max-width: 576px)': {
          height: '100%',
          pt: '17px',
          pb: '10px',
          backgroundPosition: '',
          display: 'block',
          backgroundSize: 'cover',
          borderRadius: '6px',
        },
      }}
    >
      <Box sx={{ width: { xs: 'fit-content', md: '100%' }, display: 'flex', flexDirection: 'column', m: { xs: 'auto', md: '0px' }, ml: { md: 6 } }}>
        <Typography variant="h1" color="#ffffff" sx={{ fontSize: '48px', fontWeight: '600' }}>
          Convert TCP
        </Typography>
        {/* <Box sx={{ display: 'flex', alignItems: 'center', mt: { md: 3, xs: 1 } }} style={{ cursor: 'pointer' }}>
          <a href={''} style={{ color: 'unset', textDecoration: 'none' }}>
            <Typography variant="h5" color="#39BAFD" sx={{ '&:hover': { textDecoration: 'underline' }, fontSize: { xs: '14px', xsm: '16px' } }}>
              Learn more
            </Typography>
          </a>
          <IconArrowRight
            sx={{
              ml: 1,
              fontSize: { xs: '24px', xsm: '24px' },
              color: '#39BAFD',
            }}
          />
        </Box> */}
        <Typography variant="h5" color="#ffffff" sx={{ fontSize: '48px', fontWeight: '400', mt: 1 }}>
          Coming soon
        </Typography>
      </Box>
      <Box
        sx={{
          width: { xs: '100%', sm: '60%', md: '70%' },
          mr: { lg: '6%', xs: '0' },
          minHeight: '330px',
          display: 'flex',
          p: 3,
          gap: 8,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <img
            src={imagePath.convertTcpHand1}
            style={{
              width: '100%',
            }}
          />
        </Box>

        <Box sx={{ flex: 1, alignItems: 'flex-end', display: 'flex' }}>
          <img
            src={imagePath.convertTcpHand2}
            style={{
              width: '100%',
            }}
          />
        </Box>
      </Box>
      <StarBlink sx={{ right: { xs: '65%', md: '45%' }, top: '70%', width: '60px' }} />
      <StarBlink sx={{ right: { xs: '75%', md: '55%' }, top: '30%', width: '35px', rotate: '35deg', animationDelay: '1000ms' }} />
      <StarBlink sx={{ right: '40%', top: '20%', width: '42px', rotate: '25deg', animationDelay: '500ms' }} />
      <Star1Blink sx={{ right: { xs: '10%', md: '3%' }, top: '30%', width: '42px', rotate: '10deg', animationDelay: '2000ms' }} />
      <Star1Blink sx={{ right: { xs: '20%', md: '6%' }, top: '60%', width: '40px', rotate: '5deg', animationDelay: '300ms' }} />
    </Box>
  );
};

export default Announcement;
