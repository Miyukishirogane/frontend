import { Skeleton } from '@mui/material';
import React from 'react';

const DailyLoginItemLoading = () => {
  return (
    <Skeleton
      sx={{
        py: 2,
        px: 4,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        height: 'auto',
        borderRadius: '10px',
        minWidth: '120px',
        minHeight: '160px',
      }}
      variant="rounded"
    />
  );
};

export default DailyLoginItemLoading;
