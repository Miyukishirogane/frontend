import { Box, Skeleton, Typography } from '@mui/material';
import React from 'react';

const MissionLoading = () => {
  return (
    <Box
      sx={{
        p: 2,
        display: 'flex',
        gap: 4,
        justifyContent: 'space-between',
        flexDirection: { xs: 'column', md: 'row' },
      }}
    >
      <Skeleton variant="circular" width={80} height={80} />

      <Box flex={1}>
        <Typography variant="h5" mb={1}>
          <Skeleton variant="text" />
        </Typography>

        <Typography variant="body2" mb={1}>
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="text" width="80%" />
        </Typography>
      </Box>

      <Box display="flex" flexDirection="column">
        <Typography variant="body1" mb={2}>
          <Skeleton variant="text" />
        </Typography>

        <Skeleton variant="rounded" width={100} height={45} />
      </Box>
    </Box>
  );
};

export default MissionLoading;
