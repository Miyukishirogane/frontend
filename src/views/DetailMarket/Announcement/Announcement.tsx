import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { imagePath } from 'src/constants/imagePath';
import { usePendleData, usePendleFunction } from 'src/jotai/pendle/pendle';
import Star1Blink from 'src/views/Liquidity/Announcement/Star/Star1Blink';
import StarBlink from 'src/views/Liquidity/Announcement/Star/StarBlink';
import AnnouncementActivePool from './AnnouncementActivePool';
import AnnouncementInactivePool from './AnnouncementInactivePool';

export default function Announcement() {
  const navigate = useNavigate();
  const { clearAll } = usePendleFunction();
  const { DetailPendetail } = usePendleData();

  const isPoolActive = Number(DetailPendetail?.daysLeft) > 0;

  // hanlde back
  const handleBack = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    clearAll();
    navigate('/market');
  };

  return (
    <Box
      sx={{
        position: 'relative',
        display: {
          xs: 'block',
          xsm: 'flex',
          sm: 'flex',
          lg: 'flex',
        },
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundImage: `url(${imagePath.BG1})`,
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: { xs: 'cover', xsm: 'cover', sm: 'contain', lg: 'contain' },
        borderRadius: {
          xs: '15px',
          xsm: '15px',
          sm: 'inherit',
          lg: 'inherit',
        },
        paddingY: { md: '50px', xs: '20px' },
        maxWidth: '100%',
        mt: { md: 5, xs: 3 },
        textAlign: 'center',
      }}
    >
      {DetailPendetail ? (
        isPoolActive ? (
          <AnnouncementActivePool handleBack={handleBack} />
        ) : (
          <AnnouncementInactivePool handleBack={handleBack} />
        )
      ) : (
        <Box
          sx={{
            display: 'flex',
            minHeight: '350px',
            width: { xs: 'cover', xsm: '100%', sm: '100%', lg: '100%' },
          }}
        >
        </Box>
      )}

      <StarBlink sx={{ right: '45%', top: '70%', width: '23px' }} />
      <StarBlink sx={{ right: '55%', top: '50%', width: '20px', rotate: '35deg', animationDelay: '1000ms' }} />
      <StarBlink sx={{ right: '43%', top: '20%', width: '22px', rotate: '20deg', animationDelay: '500ms' }} />
      <Star1Blink sx={{ right: '3%', top: '30%', width: '22px', rotate: '10deg', animationDelay: '2000ms' }} />
      <Star1Blink sx={{ right: '6%', top: '60%', width: '20px', rotate: '5deg', animationDelay: '300ms' }} />
    </Box>
  );
}
