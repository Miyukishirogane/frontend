import { Box, Button, Typography, Skeleton } from '@mui/material';
import { imagePath } from 'src/constants/imagePath';
import StarBlink from 'src/views/Liquidity/Announcement/Star/StarBlink';
import Star1Blink from 'src/views/Liquidity/Announcement/Star/Star1Blink';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { usePendleData, usePendleFunction } from 'src/jotai/pendle/pendle';
import { formatDate } from 'src/utils/format';
import { compactNumber } from 'src/utils/format';
import { BN } from 'src/utils';
import { marketTokensPendle } from 'src/constants/mapTokenToIcon';
import { useChainId } from 'wagmi';
import TextSmallNumber from 'src/components/TextSmallNumber/TextSmallNumber';
import { handleCalcPoolAPY } from 'src/views/Pool/utils/utils';

export default function Announcement() {
  // state
  const chainIdSelected = useChainId();

  // navigation
  const navigate = useNavigate();

  // state jotai
  const { DetailPendetail, loading } = usePendleData();
  const { clearAll } = usePendleFunction();

  // hanlde back
  const hanldeBack = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    clearAll();
    navigate('/pool');
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          textAlign: 'center',
          alignItems: 'start',
          width: { xs: 'cover', xsm: '100%', sm: '100%', lg: '100%' },
          ml: { md: 6, xs: 2 },
          pb: { md: 3, xs: 1 },
          mr: { md: 0, xs: 2 },
        }}
      >
        <Box sx={{ textAlign: 'start' }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              cursor: 'pointer',
              marginBottom: {
                xs: '20px',
                xsm: '20px',
                sm: '60px',
                lg: '60px',
              },
            }}
            onClick={e => hanldeBack(e)}
          >
            <ArrowBack
              style={{
                background: '#fff',
                width: '24px',
                height: '24px',
                alignItems: 'center',
                borderRadius: '5px',
                color: '#609df9',
              }}
            />
            <Typography
              variant="caption2"
              sx={{
                color: '#FFF',
                marginLeft: '8px',
                fontWeight: '500',
                fontSize: { xs: '10px', xsm: '12px', sm: '14px', lg: '16px' },
              }}
            >
              Back
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="h3"
              color={'#ffffff'}
              sx={{ fontSize: { xs: '20px', xsm: '20px', sm: '36px', lg: '48px' } }}
            >
              {loading ? <Skeleton variant="rounded" width={'100%'} /> : <> {DetailPendetail?.name} Pool</>}
            </Typography>
            <Typography variant="h4" sx={{ display: 'flex', alignItems: 'end', mb: '5px' }}>
              {loading ? (
                <Skeleton variant="rounded" width={'100%'} />
              ) : (
                <>
                  <Typography
                    variant="caption2"
                    color={'#ffffff'}
                    sx={{ fontSize: { xs: '16px', xsm: '16px', sm: '20px', lg: '20px' } }}
                  >
                    {DetailPendetail?.expiry ? formatDate(DetailPendetail?.expiry, 'dd MMM yyyy') : ''}
                  </Typography>
                  <Typography
                    sx={{
                      marginLeft: '2px',
                      color: '#A0C6FF',
                      fontSize: { xs: '12px', xsm: '12px', sm: '14px', lg: '14px' },
                    }}
                  >
                    ({DetailPendetail?.daysLeft} day)
                  </Typography>
                </>
              )}
            </Typography>
            <Typography variant="h4" sx={{ display: 'flex', alignItems: 'end' }}>
              <Typography
                variant="caption2"
                sx={{ color: '#A0C6FF', fontSize: { xs: '16px', xsm: '14px', sm: '16px', lg: '20px' } }}
              >
                {DetailPendetail?.protocol}
              </Typography>
              <Button
                sx={{
                  background: 'rgba(57, 186, 253, 1)',
                  fontSize: { xs: '12px', xsm: '12px', sm: '14px', lg: '14px' },
                  padding: '4px 12px',
                  lineHeight: '120%',
                  fontWeight: 'normal',
                  marginLeft: '16px',
                  height: 'auto',
                  color: '#013F60',
                }}
              >
                Infor
              </Button>
            </Typography>
          </Box>
        </Box>
        <Box sx={{ mt: { md: 3, xs: 0 } }}>
          <Box
            color={'#fff'}
            sx={{
              width: '100%',
              marginBottom: { xs: '8px', xsm: '10px', sm: '20px', lg: '32px' },
              padding: { xs: '5px 10px', xsm: '10px 20px' },
              background: 'rgba(255, 255, 255, 0.20)',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.20)',
            }}
          >
            <Typography
              variant="h4"
              sx={{ color: '#fff', fontSize: { xs: '16px', xsm: '16px', sm: '24px', lg: '32px' } }}
            >
              {loading ? (
                <Skeleton variant="rounded" width={'100%'} />
              ) : (
                <>
                  $
                  {compactNumber(
                    BN(DetailPendetail?.price || 0)
                      .multipliedBy(BN(DetailPendetail?.lpPosition || '0'))
                      .dividedBy(
                        `1e${marketTokensPendle[chainIdSelected][DetailPendetail?.name || '']?.decimal || '0'}`,
                      )
                      .toFixed(),
                  )}
                </>
              )}
            </Typography>
            <Typography
              variant="h4"
              sx={{ color: '#A0C6FF', fontSize: { xs: '12px', xsm: '12px', sm: '12px', lg: '14px' } }}
            >
              Total Value Locked
            </Typography>
          </Box>
          <Box
            color={'#fff'}
            sx={{
              width: '100%',
              padding: { xs: '5px 10px', xsm: '10px 20px' },
              background: 'rgba(255, 255, 255, 0.20)',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.20)',
            }}
          >
            <Typography
              variant="h4"
              sx={{ color: '#fff', fontSize: { xs: '16px', xsm: '16px', sm: '24px', lg: '32px' } }}
            >
              {loading || !DetailPendetail ? (
                <Skeleton variant="rounded" width={'100%'} />
              ) : (
                <>
                  <TextSmallNumber value={handleCalcPoolAPY(DetailPendetail)} /> %
                </>
              )}
            </Typography>
            <Typography
              variant="h4"
              sx={{ color: '#A0C6FF', fontSize: { xs: '12px', xsm: '12px', sm: '12px', lg: '14px' } }}
            >
              APY
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: {
            xs: '100%',
            xsm: '35%',
            sm: '35%',
            lg: '35%',
          },
          marginLeft: {
            xs: '0px',
            xsm: '35px',
            sm: '35px',
            lg: '35px',
          },
          display: {
            xs: 'flex',
            xsm: 'block',
            sm: 'block',
            lg: 'block',
          },
          placeContent: {
            xs: 'center',
            xsm: 'center',
            sm: 'center',
            lg: 'center',
          },
          marginTop: {
            xs: '20px',
            xsm: '0px',
            sm: '0px',
            lg: '0px',
          },
        }}
      >
        <Box
          sx={{
            width: {
              xs: '45%',
              xsm: '100%',
              sm: '100%',
              lg: '100%',
            },
            marginLeft: {
              xs: '15%',
              xsm: '0%',
              sm: '0%',
              lg: '0%',
            },
          }}
        >
          <img
            src={imagePath.DetailMarket}
            style={{
              width: '70%',
            }}
          />
        </Box>
      </Box>
      <StarBlink sx={{ right: '45%', top: '70%', width: '23px' }} />
      <StarBlink sx={{ right: '55%', top: '50%', width: '20px', rotate: '35deg', animationDelay: '1000ms' }} />
      <StarBlink sx={{ right: '43%', top: '20%', width: '22px', rotate: '20deg', animationDelay: '500ms' }} />
      <Star1Blink sx={{ right: '3%', top: '30%', width: '22px', rotate: '10deg', animationDelay: '2000ms' }} />
      <Star1Blink sx={{ right: '6%', top: '60%', width: '20px', rotate: '5deg', animationDelay: '300ms' }} />
    </Box>
  );
}
