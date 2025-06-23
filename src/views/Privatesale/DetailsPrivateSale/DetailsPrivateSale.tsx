import { Box, Typography, Grid } from '@mui/material';
import BoxWithdraw from 'src/components/BoxWithdraw';
import BoxBuy from 'src/components/BoxBuy';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useUserPrivateSaleDetailFunction } from 'src/jotai/userSale/detailPrivateSale';

export default function DetailsPrivateSale() {

  // jotai data
  const { setState } = useUserPrivateSaleDetailFunction()
  return (
    <>
      <Grid item xs={12} sm={12} md={12}>
        <Box
          onClick={() => {
            setState({
              check: false
            })
          }}
          sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', cursor: 'pointer' }}
        >
          <ArrowBackIcon sx={{ background: '#2465DE', marginRight: '8px', color: '#fff', fontSize: '24px', borderRadius: '8px' }} />
          <Typography sx={{ fontSize: '16px', fontWeight: '600' }}>
            Pools
          </Typography>
        </Box>
      </Grid >
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
  )
}
