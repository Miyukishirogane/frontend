import { Skeleton, Stack } from '@mui/material';
import React from 'react';

const LoadingStrategyItem = () => {
  return (
    <Stack
      sx={{ flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'flex-start', md: 'center' } }}
      gap={1}
      mr="36px"
    >
      <Skeleton variant="rounded" sx={{ flex: 1, borderRadius: '16px' }} height={52} />
      <Skeleton variant="rounded" sx={{ borderRadius: '16px' }} width={150} height={52} />
    </Stack>
  );
};

export default LoadingStrategyItem;
