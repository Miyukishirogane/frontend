import { Box, Typography, Grid } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BoxWithdraw from './BoxWithdraw';
import BoxBuy from './BoxBuy/BoxBuy';
import { useEarlySeedFunction } from 'src/jotai/earlySeed';
import { configUser } from 'src/constants/configEarlySeed';
import useAccount from 'src/hooks/useAccount';

export default function DetailsEarlySeed() {
  // jotai data
  const { updateData, ClearAll, getDataList } = useEarlySeedFunction();
  const {address} = useAccount();

  // handle
  return (
    <>
      <Grid item xs={12} sm={12} md={12}>
        <Box
          onClick={() => {
            const checkAdd = configUser.filter((item) => item === address);

            ClearAll();
            updateData('check', false);
            getDataList(checkAdd.length ? 'special' : 'trava');
          }}
          sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', cursor: 'pointer' }}
        >
          <ArrowBackIcon sx={{ background: '#2465DE', marginRight: '8px', color: '#fff', fontSize: '24px', borderRadius: '8px' }} />
          <Typography sx={{ fontSize: '16px', fontWeight: '600' }}>Pools</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <Grid container spacing={{ md: 2.5, xs: 4 }} sx={{ display: 'flex', alignItems: 'stretch' }}>
          <Grid item xs={12} sm={7} md={7}>
            <BoxBuy />
          </Grid>
          <Grid item xs={12} sm={5} md={5}>
            <BoxWithdraw />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
