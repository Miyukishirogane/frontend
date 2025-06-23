import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BlurBox from 'src/views/Liquidity/Announcement/Icons/BlurBox';
import Coin1 from 'src/views/Liquidity/Announcement/Icons/Coin1';
import Coin2 from 'src/views/Liquidity/Announcement/Icons/Coin2';
import GoldPaper from 'src/views/Liquidity/Announcement/Icons/GoldPaper';
import GoldPaper2 from 'src/views/Liquidity/Announcement/Icons/GoldPaper2';
import BG1 from '/img/Bg1.png';
import ANNOUNCEMENT from '/img/announcement.png';

export default function AnnouncementLending() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate(`/liquidity?tab=lending`);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        backgroundImage: `url(${BG1})`,
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        borderRadius: '20px',
        minHeight: '352px',
        mt: { md: 5, xs: 3 },
        flexDirection: { xs: 'column', sm: 'row' },
        pr: { md: 8, xs: 4 },
      }}
    >
      <Box sx={{ width: '100%', ml: { md: 6, xs: 2 }, zIndex: 2, position: 'relative', m: 'auto' }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '30px', md: '40px', lg: '50px' },
            fontWeight: 1000,
            color: '#fff',
          }}
        >
          Lending Liquidity
        </Typography>
        <Typography
          variant="h4"
          sx={{
            background: 'linear-gradient(90deg, #a1beed 0%, #39BAFD 100%)',
            '-webkit-background-clip': 'text',
            '-webkit-text-fill-color': 'transparent',
            fontWeight: 1000,
          }}
        >
          Supply Liquidity, Earn More Revenue
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
            variant="contained"
            sx={{
              backgroundColor: '#C9EDFF',
              mt: { md: 3, xs: 1 },
              color: 'text.primary',
              '&: hover': { backgroundColor: '#39BAFD' },
              height: { xs: '30px', xsm: '44px' },
              fontSize: { xs: '14px', xsm: '16px' },
              width: 'fit-content',
            }}
            onClick={handleRedirect}
          >
            Join Now{' '}
            <ArrowDownwardIcon
              sx={{
                ml: 1,
                fontSize: { xs: '24px', xsm: '24px' },
                color: '#39BAFD',
              }}
            />
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          width: '50%',
          mr: { lg: '6%', xs: '3%' },
          m: 'auto',
          '@media screen and (max-width: 576px)': {
            ml: { xs: '42%' },
            zIndex: 2,
            position: 'relative',
          },
        }}
      >
        <img
          src={ANNOUNCEMENT}
          style={{
            width: '100%',
          }}
          alt="liquidity_announcement"
          fetchPriority="high"
        />
      </Box>
      <GoldPaper sx={{ right: '45%', top: '70%' }} imgProps={{ width: 23, height: 23 }} />
      <GoldPaper2 sx={{ right: '50%', top: '0%' }} imgProps={{ width: 40, height: 40 }} />

      <Coin1
        sx={{ right: { xs: '60%', md: '45%' }, top: '15%', rotate: '35deg', animationDelay: '1000ms' }}
        imgProps={{ width: 80, height: 80 }}
      />
      <Coin2
        sx={{ right: { xs: '60%', md: '35%' }, top: '50%', rotate: '25deg', animationDelay: '500ms' }}
        imgProps={{ width: 80, height: 80 }}
      />
      <Coin2
        sx={{ right: '0%', top: '0%', rotate: '270deg', animationDelay: '2000ms', opacity: 0.9 }}
        imgProps={{ width: 100, height: 100 }}
      />

      <BlurBox
        sx={{ right: '0%', top: '60%', rotate: '60deg', animationDelay: '300ms' }}
        imgProps={{ width: 70, height: 70 }}
      />
      <BlurBox
        sx={{ right: { xs: '80%', md: '40%' }, top: '70%', rotate: '5deg', animationDelay: '300ms' }}
        imgProps={{ width: 40, height: 40 }}
      />
    </Box>
  );
}
