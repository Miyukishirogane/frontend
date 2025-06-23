import { Box, Skeleton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import BannerImage from 'src/components/BannerImage';
import { configUser } from 'src/constants/configEarlySeed';
import { imagePath } from 'src/constants/imagePath';
import useGetUserRank from 'src/hooks/useGetUserRank';
import { useEarlySeed } from 'src/jotai/earlySeed';
import Star1Blink from 'src/views/Liquidity/Announcement/Star/Star1Blink';
import StarBlink from 'src/views/Liquidity/Announcement/Star/StarBlink';
import useAccount from 'src/hooks/useAccount';

export default function Announcement() {
  // jotai data
  const { dataList, loading, checkTrava } = useEarlySeed();
  const { address } = useAccount();

  const { displayUserRank } = useGetUserRank();

  const checkAdd = configUser.filter((item) => item === address);

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
        backgroundSize: 'cover',
        maxWidth: '100%',
        mt: { md: 7, xs: 4 },
        zIndex: '10',
        overflow: 'hidden',
        borderRadius: { lg: '22px', xsm: '18px', sm: '18px', xs: '6px' },
      }}
    >
      <Box sx={{ width: '100%', ml: { md: 10, xs: 4 }, pb: { md: 7, xs: 4 } }}>
        <Box
          sx={{
            maxWidth: {
              xs: '90px',
              xsm: '150px',
            },
            width: '100%',
          }}
        ></Box>
        <Typography variant="h3" color={'#ffffff'} sx={{ fontSize: { xs: '18px', xsm: '22px', sm: '32px', lg: '48px' }, mt: { xs: '50px', xsm: '55px', sm: '60px', lg: '65px' } }}>
          {!loading ? (
            <>
              {(checkAdd.length > 0 || checkTrava) && address ? (
                <>Early Seed USDT</>
              ) : (
                <>{(!(checkAdd.length > 0) || !checkTrava) && address ? <>Coming Soon!</> : <Skeleton variant="rounded" width={'50%'} height={'55px'} />}</>
              )}
            </>
          ) : (
            <Skeleton variant="rounded" width={'50%'} height={'55px'} />
          )}
        </Typography>
        {displayUserRank()}
        <Box sx={{ display: 'flex', alignItems: 'center', mt: { md: 1, xs: 1 } }} style={{ cursor: 'pointer' }}>
          {loading ? (
            <>
              <Skeleton variant="rounded" width={'50%'} height={'55px'} />
            </>
          ) : (
            <>
              {address ? (
                <>
                  {parseInt(dataList[0]?.terms?.buyingTimeStart || '0') - Math.floor(Date.now() / 1000) >= 0 ? (
                    <Countdown targetTimestamp={Math.floor(Date.now() / 1000)} />
                  ) : (
                    <>
                      <Countdown targetTimestamp={parseInt(dataList[0]?.terms?.buyingTimeStart || '0') + parseInt(dataList[0]?.terms?.buyingTime || '0')} />
                    </>
                  )}
                </>
              ) : (
                <></>
              )}
            </>
          )}
        </Box>
      </Box>
      <BannerImage sx={{ right: '17%', top: '10%', width: '6%', zIndex: '100' }} image={imagePath.EARTH} />
      <BannerImage sx={{ right: '24%', top: { lg: '20%', xsm: '20%', sm: '30%', xs: '30%' }, width: '10%', zIndex: '100' }} image={imagePath.COIN} check={false} />
      <BannerImage sx={{ right: '30%', top: '60%', width: '8%', zIndex: '100' }} image={imagePath.PERCENT} />
      <BannerImage sx={{ right: '7%', top: { lg: '28%', xsm: '28%', sm: '35%', xs: '46ki%' }, width: '15%', zIndex: '100' }} image={imagePath.COINBIG} check={true} />

      <Box
        sx={{
          backgroundImage: `url(${imagePath.BGSaleRight})`,
          height: '100%',
          position: 'absolute',
          right: '0px',
          backgroundSize: 'cover',
          width: '30%',
          zIndex: '0',
          borderRadius: { lg: '22px', xsm: '18px', sm: '18px', xs: '6px' },
        }}
      ></Box>
      <StarBlink sx={{ right: '45%', top: '70%', width: '23px' }} />
      <StarBlink sx={{ right: '55%', top: '30%', width: '15px', rotate: '35deg', animationDelay: '1000ms' }} />
      <StarBlink sx={{ right: '40%', top: '20%', width: '22px', rotate: '25deg', animationDelay: '500ms' }} />
      <Star1Blink sx={{ right: '3%', top: '30%', width: '22px', rotate: '10deg', animationDelay: '2000ms' }} />
      <Star1Blink sx={{ right: '6%', top: '60%', width: '20px', rotate: '5deg', animationDelay: '300ms' }} />
    </Box>
  );
}

// Định nghĩa kiểu cho props
interface CountdownProps {
  targetTimestamp: number;
}

// Định nghĩa kiểu cho thời gian còn lại
interface TimeRemaining {
  hours: number;
  minutes: number;
  seconds: number;
}

const padWithZero = (number: number): string => {
  return number < 10 ? `0${number}` : `${number}`;
};

const Countdown: React.FC<CountdownProps> = ({ targetTimestamp }) => {
  const calculateTimeRemaining = (targetTimestamp: number): TimeRemaining => {
    const currentTime = Math.floor(Date.now() / 1000); // Thời gian hiện tại tính bằng giây từ epoch

    const timeDiff = targetTimestamp - currentTime;

    if (timeDiff <= 0) return { hours: 0, minutes: 0, seconds: 0 };

    const hours = Math.floor(timeDiff / 3600);
    const minutes = Math.floor((timeDiff % 3600) / 60);
    const seconds = timeDiff % 60;

    return { hours, minutes, seconds };
  };

  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(calculateTimeRemaining(targetTimestamp));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(targetTimestamp));
    }, 1000);

    // Cleanup interval on component unmountx
    return () => clearInterval(intervalId);
  }, [targetTimestamp]);

  return (
    <>
      {timeRemaining.hours > 0 || timeRemaining.minutes > 0 || timeRemaining.seconds > 0 ? (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: { md: 1, xs: 1 } }} style={{ cursor: 'pointer' }}>
            <Box
              color={'#fff'}
              sx={{ fontSize: { xs: '14px', xsm: '20px', sm: '24px', lg: '40px' }, padding: '10px', fontWeight: '600', background: 'rgba(255, 255, 255, 0.20)', borderRadius: '10px' }}
            >
              {padWithZero(timeRemaining.hours)}
            </Box>
            <Box color={'#fff'} sx={{ fontSize: { xs: '14px', xsm: '20px', sm: '24px', lg: '40px' }, paddingRight: '6px', fontWeight: '600', paddingLeft: '6px', borderRadius: '10px' }}>
              :
            </Box>
            <Box
              color={'#fff'}
              sx={{ fontSize: { xs: '14px', xsm: '20px', sm: '24px', lg: '40px' }, padding: '10px', fontWeight: '600', background: 'rgba(255, 255, 255, 0.20)', borderRadius: '10px' }}
            >
              {padWithZero(timeRemaining.minutes)}
            </Box>
            <Box color={'#fff'} sx={{ fontSize: { xs: '14px', xsm: '20px', sm: '24px', lg: '40px' }, fontWeight: '600', paddingRight: '6px', paddingLeft: '6px', borderRadius: '10px' }}>
              :
            </Box>
            <Box
              color={'#fff'}
              sx={{ fontSize: { xs: '14px', xsm: '20px', sm: '24px', lg: '40px' }, padding: '10px', fontWeight: '600', background: 'rgba(255, 255, 255, 0.20)', borderRadius: '10px' }}
            >
              {padWithZero(timeRemaining.seconds)}
            </Box>
          </Box>
        </>
      ) : (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: { md: 1, xs: 1 } }} style={{ cursor: 'pointer' }}>
            <Box
              color={'#fff'}
              sx={{ fontSize: { xs: '14px', xsm: '20px', sm: '24px', lg: '40px' }, padding: '10px', fontWeight: '600', background: 'rgba(255, 255, 255, 0.20)', borderRadius: '10px' }}
            >
              00
            </Box>
            <Box color={'#fff'} sx={{ fontSize: { xs: '14px', xsm: '20px', sm: '24px', lg: '40px' }, paddingRight: '6px', fontWeight: '600', paddingLeft: '6px', borderRadius: '10px' }}>
              :
            </Box>
            <Box
              color={'#fff'}
              sx={{ fontSize: { xs: '14px', xsm: '20px', sm: '24px', lg: '40px' }, padding: '10px', fontWeight: '600', background: 'rgba(255, 255, 255, 0.20)', borderRadius: '10px' }}
            >
              00
            </Box>
            <Box color={'#fff'} sx={{ fontSize: { xs: '14px', xsm: '20px', sm: '24px', lg: '40px' }, fontWeight: '600', paddingRight: '6px', paddingLeft: '6px', borderRadius: '10px' }}>
              :
            </Box>
            <Box
              color={'#fff'}
              sx={{ fontSize: { xs: '14px', xsm: '20px', sm: '24px', lg: '40px' }, padding: '10px', fontWeight: '600', background: 'rgba(255, 255, 255, 0.20)', borderRadius: '10px' }}
            >
              00
            </Box>
          </Box>
        </>
      )}
    </>
  );
};
