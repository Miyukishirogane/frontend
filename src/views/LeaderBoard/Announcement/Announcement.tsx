import { Box, Typography } from '@mui/material';
import { imagePath } from 'src/constants/imagePath';
import AnnouncementIconBox from './AnnouncementIconBox';

export default function Announcement() {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        backgroundImage: `url(${imagePath.LeaderBoardBanner})`,
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        borderRadius: '20px',
        mt: { md: 5, xs: 3 },
        minHeight: '352px',
        textAlign: 'start',
        p: { xs: '20px', md: '0px' },
        px: { md: 8, xs: 1 },
        border: '2px solid #2465de',
        flexDirection: { xs: 'column', md: 'row' },
      }}
    >
      <Box
        sx={{
          width: '100%',
          margin: 'auto',
          textAlign: { xs: 'center', md: 'start' },
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '20px', xsm: '22px', md: '40px', lg: '50px' },
            background: 'linear-gradient(90deg, #276FE2 0%, #39BAFD 100%)',
            '-webkit-background-clip': 'text',
            '-webkit-text-fill-color': 'transparent',
            fontWeight: 1000,
          }}
        >
          Loyalty Leaderboard <br /> within Trava Ecosystem
        </Typography>
        <Typography variant="h4" sx={{ fontSize: { xs: '20px', xsm: '22px', md: '32px' }, fontWeight: 500 }}>
          $TCP Airdrop for Trava Loyalists
        </Typography>
      </Box>
      <AnnouncementIconBox />
    </Box>
  );
}
