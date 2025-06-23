import ArrowBack from '@mui/icons-material/ArrowBack';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { imagePath } from 'src/constants/imagePath';
import { usePendleData } from 'src/jotai/pendle/pendle';

interface IProps {
  handleBack: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const AnnouncementInactivePool = (props: IProps) => {
  const { handleBack } = props;

  const { tokenToggle } = usePendleData();

  return (
    <>
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
            onClick={handleBack}
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
              {tokenToggle === 'YT' ? 'Burn YT' : 'Redeem PT'}
            </Typography>

            {tokenToggle === 'YT' ? (
              <>
                <Typography
                  variant="caption2"
                  sx={{ color: '#A0C6FF', fontSize: { xs: '16px', xsm: '14px', sm: '16px', lg: '20px' } }}
                >
                  YT now worth <strong>0</strong>
                </Typography>
                <Typography
                  variant="caption2"
                  sx={{ color: '#A0C6FF', fontSize: { xs: '16px', xsm: '14px', sm: '16px', lg: '20px' } }}
                >
                  Burn your YT to keep your wallet clean
                </Typography>
              </>
            ) : (
              <>
                <Typography
                  variant="caption2"
                  sx={{ color: '#A0C6FF', fontSize: { xs: '16px', xsm: '14px', sm: '16px', lg: '20px' } }}
                >
                  Redeem your PT
                </Typography>
                <Typography
                  variant="caption2"
                  sx={{ color: '#A0C6FF', fontSize: { xs: '16px', xsm: '14px', sm: '16px', lg: '20px' } }}
                >
                  <strong>1 PT - wstETH</strong> is equal to <strong>1 wstETH</strong> in Aave
                </Typography>
              </>
            )}
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
    </>
  );
};

export default AnnouncementInactivePool;
