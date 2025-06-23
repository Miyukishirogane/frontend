import { Box, Button, Divider, FormControl, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import CustomTextField from 'src/components/CustomForm/CustomTextField';
import TypographyByStatus from 'src/components/TypographyLoading/TypographyByStatus';
import { BN } from 'src/utils';
import { compactNumber, formatDate } from 'src/utils/format';
import useFunctionVoting from '../hooks/useFunctionVoting';
import useGetUnlockTCV from '../hooks/useGetUnlockTCV';
import useGetVotingPower from '../hooks/useGetVotingPower';
import SelectRangeTime from './SelectRangeTime';
import useGetLockEnd from '../hooks/useGetLockEnd';

export default function ChangeUnlockTime() {
  const [unlockTime, setUnlockTime] = useState<number>(7 * 24 * 3600);
  const { votingPower, status: votingPowerStatus } = useGetVotingPower();
  const { data: lockTCV, status: statusLockTCV } = useGetUnlockTCV();
  const { lockedEnd, status: statusLockedEnd, refetch: refetchLockEnd } = useGetLockEnd();
  const currentDate = new Date();
  const unlockDate = new Date(Date.now() + unlockTime * 1000);

  const { increaseUnlockTime } = useFunctionVoting();

  const handleChangeUnlockTime = async () => {
    await increaseUnlockTime(unlockTime * 1000);
    await refetchLockEnd();
  };

  return (
    <>
      <Stack gap="8px" sx={{ mb: 2 }}>
        <Typography fontSize={'12px'} fontWeight={400} color="#8C8C8C">
          Unlock date
        </Typography>
        <CustomTextField
          value={formatDate(unlockDate, 'd/M/yyyy, hh:mm a')}
          sx={{ flex: 1, width: '100%' }}
          name="Unlock date"
          InputProps={{
            endAdornment: (
              <FormControl sx={{ width: '180px' }}>
                <Stack direction={'row'}>
                  <Divider orientation="vertical" variant="middle" flexItem sx={{ borderColor: '#ABCDED' }} />
                  <SelectRangeTime
                    value={unlockTime}
                    onChange={e => {
                      setUnlockTime(e.target.value as number);
                    }}
                  />
                </Stack>
              </FormControl>
            ),
          }}
        />

        <Typography fontSize={'12px'} fontWeight={400} color="#8C8C8C">
          {formatDate(currentDate, 'd/M/yyyy')} - {formatDate(unlockDate, 'd/M/yyyy')}
        </Typography>
      </Stack>

      <Box display="flex" justifyContent="space-between" alignItems="center" gap="8px" sx={{ mb: 2 }}>
        <Typography fontSize={'12px'} fontWeight={400} color="#8C8C8C">
          Lock Balance
        </Typography>
        <TypographyByStatus status={statusLockTCV} fontSize={'12px'} fontWeight={400} color="#8C8C8C">
          {lockTCV}
        </TypographyByStatus>
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="center" gap="8px" sx={{ mb: 2 }}>
        <Typography fontSize={'12px'} fontWeight={400} color="#8C8C8C">
          Unlock date
        </Typography>
        <TypographyByStatus status={statusLockedEnd} fontSize={'12px'} fontWeight={400} color="#8C8C8C">
          {formatDate(Number(lockedEnd) * 1000, 'd/M/yyyy')}
        </TypographyByStatus>
      </Box>

      <Box display="flex" alignItems={'center'} gap="4px">
        <Typography fontSize={'14px'} fontWeight={500} sx={{ mb: 2 }}>
          Your voting power will be:
        </Typography>
        <TypographyByStatus status={votingPowerStatus} fontSize={'14px'} fontWeight={500} sx={{ mb: 2 }}>
          {compactNumber(BN(votingPower).toString(), 2)} veTCV
        </TypographyByStatus>
      </Box>

      <Button variant="gradient" fullWidth onClick={handleChangeUnlockTime}>
        Change Lock Time
      </Button>
    </>
  );
}
