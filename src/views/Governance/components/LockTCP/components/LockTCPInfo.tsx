import { Box, Grid, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { compactNumber, formatDate } from 'src/utils/format';
import useGetLockEnd from '../hooks/useGetLockEnd';
import useGetUnlockTCV from '../hooks/useGetUnlockTCV';
import useGetVotingPower from '../hooks/useGetVotingPower';
import useGetNumDelegator from '../hooks/useGetNumDelegator';

type TCardInfo = {
  title: string;
  value: React.ReactNode | undefined;
};
export default function LockTCPInfo() {
  const { votingPower } = useGetVotingPower();
  const { unlockTCV } = useGetUnlockTCV();
  const { lockedEnd } = useGetLockEnd();
  const { numDelegator } = useGetNumDelegator();

  const isLocked = unlockTCV && Number(unlockTCV) > 0;

  const tcpInfo: TCardInfo[] = useMemo(() => {
    return [
      {
        title: 'Status',
        value: isLocked ? 'Locked' : 'Not Lock',
      },
      {
        title: 'Voting Power',
        value: compactNumber(votingPower || '', 2),
      },
      {
        title: 'Locked Balance',
        value: unlockTCV || 0,
      },
      {
        title: 'Unlock Date',
        value: Number(lockedEnd) !== 0 ? formatDate(Number(lockedEnd) * 1000, 'd/M/yyyy') : '_ _',
      },
      {
        title: 'Num Delegator',
        value: numDelegator || 0,
      },
    ];
  }, [votingPower, unlockTCV, lockedEnd, isLocked, numDelegator]);
  return (
    <Grid container spacing={2}>
      {tcpInfo.map(item => {
        return (
          <Grid key={item.title} item xs={12} md={6}>
            <Box
              sx={{
                padding: '12px 16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                borderRadius: '20px',
                background: 'linear-gradient(180deg, #FFFFFF 0%, #EDF6FF 100%)',
              }}
            >
              <Typography fontSize={'14px'} sx={{ color: '#8C8C8C' }}>
                {item.title}
              </Typography>
              <Typography fontSize={'20px'} fontWeight={600}>
                {item.value}
              </Typography>
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
}
