import { Box } from '@mui/material';
import { imagePath } from 'src/constants/imagePath';
import ActiveAnnouncement from './ActiveAnnouncement';
import { useMarketState } from 'src/jotai/pendle/Market/market';
import InactiveAnnouncement from './InactiveAnnouncement';

export default function Announcement() {
  const { filter: showActivePendle } = useMarketState();

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundImage: `url(${imagePath.BG1})`,
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: { xs: 'cover', lg: 'contain' },
        borderRadius: { xs: '10px', lg: '' },
        maxWidth: '100%',
        mt: { md: 5, xs: 3 },
      }}
    >
      {showActivePendle === 'active' ? <ActiveAnnouncement /> : <InactiveAnnouncement />}

      <Box sx={{ width: { xs: '60%', sm: '30%', lg: '50%' } }}>
        <img
          src={imagePath.MARKETBANNER}
          style={{
            width: '90%',
          }}
        />
      </Box>
    </Box>
  );
}
