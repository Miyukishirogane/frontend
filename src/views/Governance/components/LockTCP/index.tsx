import { Grid } from '@mui/material';
import LockTCPInfo from './components/LockTCPInfo';
import VotingPower from './components/VotingPower';

export default function LockTCPGovernance() {
  return (
    <Grid container spacing={2} sx={{ padding: '20px' }}>
      <Grid item xs={12} sm={4} md={6}>
        <LockTCPInfo />
      </Grid>
      <Grid item xs={12} sm={8} md={6} sx={{ minHeight: '450px' }}>
        <VotingPower />
      </Grid>
    </Grid>
  );
}
