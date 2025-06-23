import { Box, Typography } from '@mui/material';
import React from 'react';

const InactiveAnnouncement = () => {
  return (
    <Box sx={{ width: '100%', ml: { md: 5, xs: 2 }, pb: { md: 5, xs: 3 }, pt: { xs: 3 } }}>
      <Typography variant="h3" color={'#ffffff'} sx={{ fontSize: { xs: '18px', sm: '24px', lg: '32px' } }}>
        Markets
      </Typography>
      <Typography variant="h6" color={'rgba(160, 198, 255, 1)'} sx={{ fontSize: { xs: '12px', sm: '20px', lg: '24px' }, fontWeight: 400  }}>
        The following markets are inactive,
      </Typography>
      <Typography variant="h6" color={'rgba(160, 198, 255, 1)'} sx={{ fontSize: { xs: '12px', sm: '20px', lg: '24px' }, fontWeight: 400 }}>
        users are advised to exit their positions
      </Typography>
    </Box>
  );
};

export default InactiveAnnouncement;
