import { Box, Typography, Skeleton } from '@mui/material';
import { imagePath } from 'src/constants/imagePath';
import MoneyAnimation from 'src/components/MoneyAnimation';
import ArrowUpAnimation from 'src/components/ArrowUp';
import BoxPoolAnimation from 'src/components/BoxPool';
import { formatNumber } from 'src/utils/format';
import Slider from 'react-slick';
import HelpOutlineRounded from '@mui/icons-material/HelpOutlineRounded';
import { usePendleData } from 'src/jotai/pendle/pendle';
import { mapTokenToIcon, TAppDenom } from 'src/constants/mapTokenToIcon';
import { BN } from 'src/utils';
import { compareAsc } from 'date-fns';

export default function Announcement() {
  // setting slider mobile
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

  // state
  const { listPendleBanner, loading } = usePendleData();

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
      <Box sx={{ width: '100%', ml: { md: 5, xs: 1 }, pb: { md: 5, xs: 1 } }}>
        <Typography
          variant="h3"
          color={'#ffffff'}
          sx={{ fontSize: { xs: '20px', xsm: '22px', sm: '28px', lg: '32px' } }}
        >
          Liberating APY
        </Typography>
        <Box
          sx={{ display: { xs: 'block', sm: 'none' }, maxWidth: '200px', alignItems: 'center', mt: { md: 3, xs: 1 } }}
        >
          {loading ? (
            <>
              <Skeleton variant="rounded" width={'80%'} height={'55px'} />
            </>
          ) : (
            <>
              <Slider {...settings}>
                {listPendleBanner
                  .filter(item => {
                    return compareAsc(item.expiry, Date.now()) > 0;
                  })
                  .map(item => {
                    const Icon = mapTokenToIcon[item?.name as TAppDenom] ?? HelpOutlineRounded;
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
                          <Typography
                            variant="caption2"
                            sx={{ color: '#A0C6FF', fontSize: { sm: '12px', lg: '14px' } }}
                          >
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
                            {formatNumber(BN(item?.ptFixedYield).dividedBy(BN('1e18')).multipliedBy(100).toFixed(), {
                              fractionDigits: 2,
                              fallback: '----',
                            })}
                            %
                            <Typography
                              variant="caption2"
                              sx={{ color: '#A0C6FF', fontSize: '12px', marginLeft: '4px' }}
                            >
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
          {loading ? (
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
                  const Icon2 = mapTokenToIcon[item?.name as TAppDenom] ?? HelpOutlineRounded;
                  return (
                    <Box
                      color={'#fff'}
                      sx={{
                        display: 'flex',
                        width: '100%',
                        padding: { xs: '4px 5px', xsm: '10px 16px' },
                        background: 'rgba(255, 255, 255, 0.20)',
                        borderRadius: '8px',
                        alignItems: 'center',
                        border: '1px solid rgba(255, 255, 255, 0.20)',
                        marginX: index === 1 ? { xs: '8px', lg: '16px' } : '',
                        maxWidth: '250px',
                      }}
                      key={index}
                    >
                      <Icon2
                        sx={{
                          fontSize: '36px',
                          marginRight: '5px',
                          objectFit: 'contain',
                          // width: '10%'
                        }}
                      />
                      <Box sx={{ width: '100%' }}>
                        <Typography
                          variant="caption2"
                          sx={{ color: '#A0C6FF', fontSize: { xs: '6px', xsm: '6px', sm: '10px', lg: '14px' } }}
                        >
                          {item.name}
                        </Typography>
                        <Typography
                          variant="h4"
                          color={'#ffffff'}
                          sx={{
                            fontSize: { xs: '10px', xsm: '22px', sm: '28px', lg: '32px' },
                            display: 'flex',
                            textAlign: 'center',
                            alignItems: 'baseline',
                          }}
                        >
                          {formatNumber(BN(item?.ptFixedYield).dividedBy(BN('1e18')).multipliedBy(100).toFixed(), {
                            fractionDigits: 2,
                            fallback: '----',
                          })}
                          %
                          <Typography
                            variant="caption2"
                            sx={{
                              color: '#A0C6FF',
                              fontSize: { xs: '4px', xsm: '6px', sm: '8px', lg: '10px' },
                              marginLeft: '4px',
                            }}
                          >
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
      <Box sx={{ width: { xs: '60%', sm: '30%', lg: '50%' } }}>
        <img
          src={imagePath.PoolBanner}
          style={{
            width: '100%',
            padding: '15px',
            position: 'relative',
            zIndex: '2',
          }}
        />
      </Box>
      <ArrowUpAnimation
        sx={{
          right: {
            xs: '27%',
            sm: '16%',
            lg: '25%',
          },
          width: {
            xs: '14px',
            sm: '24px',
            lg: '34px',
          },
          top: '33%',
          height: '44px',
          zIndex: '3',
        }}
        img={imagePath.PoolUp1}
      />
      <ArrowUpAnimation
        sx={{
          right: {
            xs: '7%',
            sm: '4%',
            lg: '6%',
          },
          width: {
            xs: '23px',
            sm: '24px',
            lg: '54px',
          },
          top: '22%',
          height: '71px',
          zIndex: '3',
          // '-webkit-animation-delay': '3s',
          WebkitAnimationDelay: '3s',
          // 'animation-delay': '3s',
          animationDelay: '3s',
        }}
        img={imagePath.PoolUp2}
      />

      <MoneyAnimation
        sx={{
          right: {
            xs: '22%',
            sm: '14%',
            lg: '20%',
          },
          width: {
            xs: '19px',
            sm: '29px',
            lg: '44px',
          },
          top: '56%',
          zIndex: '3',
        }}
        img={imagePath.PoolMoney1}
      />
      <MoneyAnimation
        sx={{
          right: {
            xs: '22%',
            sm: '14%',
            lg: '20%',
          },
          width: {
            xs: '19px',
            sm: '29px',
            lg: '44px',
          },
          top: '7%',
          zIndex: '3',
        }}
        img={imagePath.PoolMoney2}
      />
      <MoneyAnimation
        sx={{
          right: {
            xs: '11%',
            sm: '6%',
            lg: '9%',
          },
          top: '30%',
          width: {
            xs: '19px',
            sm: '29px',
            lg: '44px',
          },
          zIndex: '1',
        }}
        img={imagePath.PoolMoney3}
      />
      <BoxPoolAnimation
        sx={{
          right: {
            xs: '16%',
            sm: '11%',
            lg: '16%',
          },
          top: '8%',
          width: {
            xs: '5px',
            sm: '8px',
            lg: '13px',
          },
          zIndex: '3',
        }}
        img={imagePath.PoolBox1}
      />
      <BoxPoolAnimation
        sx={{
          right: {
            xs: '6%',
            sm: '3%',
            lg: '6%',
          },
          top: '50%',
          width: {
            xs: '5px',
            sm: '8px',
            lg: '13px',
          },
          zIndex: '3',
        }}
        img={imagePath.PoolBox2}
      />
    </Box>
  );
}
