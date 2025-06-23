import { Box, Button, Grid, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IconSpinLoading } from 'src/assets/icon';
import ToggleButtonGroupCustom, { IToggleButton } from 'src/components/ToggleButtonGroupCustom/ToggleButtonGroupCustom';
import { usePendleData, usePendleFunction } from 'src/jotai/pendle/pendle';
import { useChainId } from 'wagmi';
import Announcement from './Announcement/Announcement';
import ContentLeft from './ContentLeft';
import ContentRight from './ContentRight';
import useAccount from 'src/hooks/useAccount';

const btnGroupData: IToggleButton[] = [
  {
    value: 'YT',
    label: 'YT',
  },
  {
    value: 'PT',
    label: 'PT',
  },
];

export default function DetailMarket() {
  // router
  const navigate = useNavigate();
  const location = useLocation();

  // state
  const chainIdSelected = useChainId();
  const { address } = useAccount();
  const { loading, error, DetailPendetail, tokenToggle } = usePendleData();
  const { AddDetailPendle, UpdateAllKeyPendle, ResetDetailPendle, clearAll } = usePendleFunction();

  useEffect(() => {
    if (location.state?.item?.marketAddress) {
      AddDetailPendle(location.state?.item);
    } else {
      navigate('/market');
    }
  }, []);

  // call token
  useEffect(() => {
    (async () => {
      if (address && location.state?.chainId !== chainIdSelected) {
        navigate('/market');
      }
    })();
  }, [address, chainIdSelected]);

  // handle toogle
  const handleToggleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    ResetDetailPendle();
    if (newAlignment !== tokenToggle && newAlignment) {
      UpdateAllKeyPendle('tokenToggle', newAlignment);
    }
  };
  return (
    <>
      <div style={{ paddingBottom: '100px' }}>
        <Announcement />
        <br />
        {error ? (
          <Box>
            <Typography>{error.message || 'Error!!'}</Typography>
          </Box>
        ) : (
          <>
            {loading ? (
              <Box>
                <IconSpinLoading sx={{ fontSize: '100px' }} />
              </Box>
            ) : (
              <>
                <Grid container spacing={{ md: 7, sm: 3, xs: 2 }}>
                  <Grid item xs={12} sm={5}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        height: 'auto',
                        position: 'relative',
                        mb: '24px',
                      }}
                    >
                      <ToggleButtonGroupCustom value={tokenToggle} handleToggleChange={handleToggleChange} data={btnGroupData} />
                      <Button
                        variant="outlined"
                        sx={{
                          padding: '9px 25px',
                          height: 'auto',
                          '&:MuiTouchRipple-root': {
                            display: 'none',
                          },
                        }}
                        onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                          e.preventDefault();
                          clearAll();
                          navigate(`/pool/${DetailPendetail?.marketAddress}`, {
                            state: {
                              chainId: chainIdSelected,
                              item: DetailPendetail,
                            },
                          });
                        }}
                      >
                        Go to LP
                      </Button>
                    </Box>
                    <Box
                      sx={{
                        boxShadow: '0px 3px 8px 0px rgba(0, 0, 0, 0.12)',
                        borderRadius: '20px',
                      }}
                    >
                      <ContentLeft />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={7}>
                    <Box
                      sx={{
                        boxShadow: '0px 3px 8px 0px rgba(0, 0, 0, 0.12)',
                        borderRadius: '20px',
                      }}
                    >
                      <ContentRight />
                    </Box>
                  </Grid>
                </Grid>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
