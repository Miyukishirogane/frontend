import { Box, Button, Divider, FormControl, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import CustomTextField from 'src/components/CustomForm/CustomTextField';
import InputCustom from 'src/components/InputCustom/InputCustom';
import TypographyByStatus from 'src/components/TypographyLoading/TypographyByStatus';
import useGetTokenBalance from 'src/hooks/Liquidlity/useGetTokenBalance';
import { BN } from 'src/utils';
import { compactNumber, formatDate } from 'src/utils/format';

import useFunctionVoting from '../hooks/useFunctionVoting';
import useGetVotingPower from '../hooks/useGetVotingPower';
import SelectRangeTime from './SelectRangeTime';
import { governanceTokenInfo } from 'src/views/Governance/const';

export default function LockTCP() {
  const [amount, setAmount] = useState<string>('');
  const [unlockTime, setUnlockTime] = useState<number>(7 * 24 * 3600);
  const { icon: Icon, address, decimal } = governanceTokenInfo['TCV'];
  const { data, status } = useGetTokenBalance({ addressToken: address, decimal: decimal });
  const { votingPower, status: votingPowerStatus } = useGetVotingPower();

  const currentDate = new Date();
  const unlockDate = new Date(Date.now() + unlockTime * 1000);

  const { createLock } = useFunctionVoting();

  const handleCreateLock = async () => {
    await createLock(amount, unlockTime * 1000);
    setAmount('');
  };

  return (
    <>
      <Stack gap="8px">
        <Box display="flex" justifyContent="space-between">
          <Typography fontSize={'12px'} fontWeight={400}>
            Amount
          </Typography>
          <Box display="flex" alignItems={'center'} gap="4px">
            <Typography fontSize={'12px'} fontWeight={400}>
              Your Balance:
            </Typography>
            <TypographyByStatus fontSize={'12px'} fontWeight={600} status={status}>
              {data}
            </TypographyByStatus>
          </Box>
        </Box>
        <InputCustom
          value={amount}
          onChange={val => setAmount(val)}
          endElement={
            <Box display="flex" gap={1}>
              <Icon fontSize="large" />
              <Typography fontWeight={500}>TCV</Typography>
            </Box>
          }
          onClickMax={() => setAmount(prev => (data ? data : prev))}
          // subValue={'~$3,607.81'}
        />
      </Stack>

      <Stack gap="8px" sx={{ mb: 2 }}>
        <Typography fontSize={'12px'} fontWeight={400} color="#8C8C8C">
          Unlock date
        </Typography>
        <CustomTextField
          value={formatDate(unlockDate, 'd/M/yyyy, hh:mm a')}
          sx={{ flex: 1, width: '100%' }}
          name="Unlock Date"
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

      <Box display="flex" alignItems={'center'} gap="4px">
        <Typography fontSize={'14px'} fontWeight={500} sx={{ mb: 2 }}>
          Your voting power will be:
        </Typography>
        <TypographyByStatus status={votingPowerStatus} fontSize={'14px'} fontWeight={500} sx={{ mb: 2 }}>
          {compactNumber(
            BN(votingPower)
              .plus(
                BN(amount === '' ? '0' : amount)
                  .times(`1e${decimal}`)
                  .div(4 * 365 * 24 * 60 * 60),
              )
              .toString(),
            2,
          )}{' '}
          veTCV
        </TypographyByStatus>
      </Box>

      <Button variant="gradient" fullWidth onClick={handleCreateLock}>
        Create lock
      </Button>
    </>
  );
}
