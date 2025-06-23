import { Box, CircularProgress, Paper, Typography } from '@mui/material';
import TableBalance from 'src/components/Table/YieldFlex/TableBalance/TableBalance';
import TableTCVPosition from 'src/components/Table/YieldFlex/TableTCVPosition/TableTCVPosition';
import useGetPortfolioPosition from 'src/hooks/Projeet/useGetPortfolioPosition';

const YieldFlexPortfolio = () => {
  const { positions, isLoading } = useGetPortfolioPosition();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <TableBalance />
      <Paper
        elevation={1}
        sx={{
          borderRadius: '20px',
          my: '20px',
          p: '28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
          backgroundColor: '#fff',
        }}
      >
        <Typography variant="caption2" fontSize={'20px'} fontWeight={600}>
          YieldFlex Position
        </Typography>
        {isLoading ? (
          <Box sx={{ p: '28px 28px 16px 28px', width: '100%', display: 'flex', justifyContent: 'center', my: 20 }}>
            <CircularProgress />
          </Box>
        ) : null}
        {positions?.map(data => (
          <TableTCVPosition isLoading={isLoading} key={data.token} data={data} />
        ))}
      </Paper>
    </Box>
  );
};

export default YieldFlexPortfolio;
