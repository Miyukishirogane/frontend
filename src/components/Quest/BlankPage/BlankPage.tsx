import { Paper, Typography } from '@mui/material';
import React from 'react';

const BlankPage = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        display: 'flex',
        m: 'auto',
        width: '100%',
        minHeight: '300px',
        mt: 4,
        p: 2,
        textAlign: 'center',
      }}
    >
      <Typography variant="h3" color="rgba(140, 140, 140, 1)" m="auto">
        Please connect your wallet to login
      </Typography>
    </Paper>
  );
};

export default BlankPage;
