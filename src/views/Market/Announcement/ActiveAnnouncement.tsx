import HelpOutlineRounded from '@mui/icons-material/HelpOutlineRounded';
import { Box, Typography, Skeleton } from '@mui/material';
import React from 'react';
import Slider from 'react-slick';
import { mapTokenToIcon, TAppDenom } from 'src/constants/mapTokenToIcon';
import { usePendleData } from 'src/jotai/pendle/pendle';
import { BN } from 'src/utils';
import { formatNumber } from 'src/utils/format';
import { compareAsc } from 'date-fns';

const ActiveAnnouncement = () => {
  const { listPendleBanner } = usePendleData();

  const settings = {
    loop: true,
    arrows: false,
    dots: false,
    autoplayTimeout: 4,
    smartSpeed: 8,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 2000,
    autoplaySpeed: 5000,
    cssEase: 'linear',
  };

  return (
    <Box sx={{ width: '100%', ml: { md: 5, xs: 2 }, pb: { md: 5, xs: 3 }, pt: { xs: 3 } }}>
      <Typography variant="h3" color={'#ffffff'} sx={{ fontSize: { xs: '18px', sm: '24px', lg: '32px' } }}>
        Liberating Yield
      </Typography>
      <Box sx={{ display: { xs: 'block', sm: 'none' }, maxWidth: '200px', alignItems: 'center', mt: { md: 3, xs: 1 } }}>
        {!listPendleBanner.length ? (
          <>
            <Skeleton variant="rounded" width={'80%'} height={'55px'} />
          </>
        ) : (
          <>
            <Slider {...settings}>
              {listPendleBanner.map(item => {
                const Icon = mapTokenToIcon[item.name as TAppDenom] ?? HelpOutlineRounded;
                return (
                  <Box
                    color={'#fff'}
                    sx={{
                      display: 'flex !important',
                      width: '100%',
                      padding: { xs: '12px 8px', sm: '12px 8px', xsm: '10px 16px' },
                      background: 'rgba(255, 255, 255, 0.20)',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.20)',
                      maxWidth: 'fit-content',
                    }}
                    key={item?.marketAddress}
                  >
                    <Box
                      sx={{
                        height: { lg: '52px', xs: '40px' },
                        width: { lg: '52px', xs: '40px' },
                        marginRight: '5px',
                        display: 'flex',
                        alignSelf: 'center',
                      }}
                    >
                      <Icon
                        sx={{
                          fontSize: '36px',
                          objectFit: 'cover',
                          width: '100%',
                        }}
                      />
                    </Box>
                    <Box sx={{ width: '100%' }}>
                      <Typography variant="caption2" sx={{ color: '#A0C6FF', fontSize: { sm: '12px', lg: '14px' } }}>
                        {item.name}
                      </Typography>
                      <Typography
                        variant="h4"
                        color={'#ffffff'}
                        sx={{
                          fontSize: { sm: '20px', lg: '32px' },
                          display: 'flex',
                          textAlign: 'center',
                          alignItems: 'baseline',
                        }}
                      >
                        {formatNumber(BN(item?.ptFixedYield).dividedBy(BN('1e16')).toFixed(), {
                          fractionDigits: 2,
                          fallback: '----',
                        })}
                        %
                        <Typography variant="caption2" sx={{ color: '#A0C6FF', fontSize: '12px', marginLeft: '4px' }}>
                          fixed yield
                        </Typography>
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Slider>
          </>
        )}
      </Box>
      <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', mt: { md: 3, xs: 1 } }}>
        {!listPendleBanner.length ? (
          <>
            <Skeleton variant="rounded" width={'80%'} height={'100px'} />
          </>
        ) : (
          <>
            {listPendleBanner
              .filter(item => {
                return compareAsc(item.expiry, Date.now()) > 0;
              })
              .map((item, index) => {
                const Icon2 = mapTokenToIcon[item.name as TAppDenom] ?? HelpOutlineRounded;
                return (
                  <Box
                    color={'#fff'}
                    sx={{
                      display: 'flex',
                      width: '100%',
                      padding: { xs: '12px 8px', sm: '12px 8px', xsm: '10px 16px' },
                      background: 'rgba(255, 255, 255, 0.20)',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.20)',
                      maxWidth: 'fit-content',
                      marginX: index === 1 ? { xs: '8px', lg: '16px' } : '',
                    }}
                    key={item?.marketAddress}
                  >
                    <Box
                      sx={{
                        height: { lg: '52px', xs: '40px' },
                        width: { lg: '52px', xs: '40px' },
                        marginRight: '5px',
                        display: 'flex',
                        alignSelf: 'center',
                      }}
                    >
                      <Icon2
                        sx={{
                          fontSize: '36px',
                          objectFit: 'cover',
                          width: '100%',
                        }}
                      />
                    </Box>
                    <Box sx={{ width: '100%' }}>
                      <Typography variant="caption2" sx={{ color: '#A0C6FF', fontSize: { sm: '12px', lg: '14px' } }}>
                        {item?.name}
                      </Typography>
                      <Typography
                        variant="h4"
                        color={'#ffffff'}
                        sx={{
                          fontSize: { sm: '20px', lg: '32px' },
                          display: 'flex',
                          textAlign: 'center',
                          alignItems: 'baseline',
                        }}
                      >
                        {formatNumber(BN(item?.ptFixedYield).dividedBy(BN('1e16')).toFixed(), {
                          fractionDigits: 2,
                          fallback: '----',
                        })}
                        %
                        <Typography variant="caption2" sx={{ color: '#A0C6FF', fontSize: '12px', marginLeft: '4px' }}>
                          fixed yield
                        </Typography>
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
          </>
        )}
      </Box>
    </Box>
  );
};

export default ActiveAnnouncement;
