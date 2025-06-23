import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import useFunctionVoting from '../hooks/useFunctionVoting';
import useGetUnlockTCV from '../hooks/useGetUnlockTCV';
import { mapTokenToIcon } from 'src/constants/mapTokenToIcon';
import TypographyByStatus from 'src/components/TypographyLoading/TypographyByStatus';

export default function VotingPowerWithdraw() {
  const { withdraw } = useFunctionVoting();
  const { data, status } = useGetUnlockTCV();

  const Icon = mapTokenToIcon['TCV'];

  const handleWithdraw = async () => {
    await withdraw();
  };

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography fontSize={'16px'}>Unlock TCV</Typography>
        <Box display="flex" alignItems="center" gap="8px">
          <TypographyByStatus status={status} fontSize={'24px'} fontWeight={700} sx={{ color: '#34A3F5' }}>
            {data}
          </TypographyByStatus>
          <Icon sx={{ fontSize: '50px' }} />
        </Box>
      </Box>
      <Button variant="gradient" fullWidth onClick={handleWithdraw}>
        Withdraw
      </Button>
    </>
  );
}
