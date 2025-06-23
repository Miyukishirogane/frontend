import ClearRounded from '@mui/icons-material/ClearRounded';
import { Box, Container, keyframes, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { addHours, compareAsc } from 'date-fns';

const scrollLeft = keyframes`
    0% {
        transform: translate(0, 0);
    }
    100% {
        transform: translate(-50%, 0);
    }
`;

const Advertisement = () => {
  const [showAdvertisement, setShowAdvertisement] = useState(false);
  const [isOverflown, setIsOverflown] = useState(false);
  const advertisementRef = useRef<HTMLElement>(null);

  const handleClose = () => {
    localStorage.setItem('advertisement_hide_time', addHours(Date.now(), 1).toString());
    setShowAdvertisement(false);
  };

  const isShowAdvertisement = () => {
    const hideTimeEnd = localStorage.getItem('advertisement_hide_time');
    if (hideTimeEnd) {
      const result = compareAsc(new Date(hideTimeEnd), Date.now());
      if (result > 0) {
        setShowAdvertisement(false);
        return;
      }
    }

    setShowAdvertisement(true);
  };

  useEffect(() => {
    isShowAdvertisement();
  }, []);

  useEffect(() => {
    if (!advertisementRef.current) return;
    if (advertisementRef.current.scrollWidth > advertisementRef.current.clientWidth) {
      setIsOverflown(true);
    }
  }, [advertisementRef?.current]);

  return (
    <Container
      sx={{
        zIndex: 2,
        position: 'sticky',
        width: '100%',
        top: { xs: '12%', md: '14%' },
        padding: '0px !important',
        maxWidth: {
          xs: 'calc(100% - 32px)',
          sm: 'calc(100% - 50px)',
          lg: '1230px',
        },
        display: showAdvertisement ? 'block' : 'none',
      }}
    >
      <Box
        ref={advertisementRef}
        sx={{
          width: '97%',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            overflow: 'visible',
            width: 'max-content',
            maxHeight: '24px',
            animation: isOverflown ? `${scrollLeft} 30s infinite linear` : 'unset',
            animationDelay: '2s',
            display: 'flex',
          }}
        >
          <Typography variant="body1" flexWrap="nowrap" sx={{ mr: 1 }}>
            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical
            Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a
          </Typography>

          <Typography variant="body1" flexWrap="nowrap" sx={{ mr: 1 }}>
            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical
            Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a
          </Typography>
        </Box>
      </Box>
      <ClearRounded
        sx={{
          ml: 'auto',
          cursor: 'pointer',
          fontSize: '20px',
          color: '#2465DE',
          position: 'absolute',
          top: 0,
          right: 0,
        }}
        onClick={handleClose}
      />
    </Container>
  );
};

export default Advertisement;
