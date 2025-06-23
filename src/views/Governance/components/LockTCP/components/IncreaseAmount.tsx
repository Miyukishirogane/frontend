import { Box, Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import InputCustom from 'src/components/InputCustom/InputCustom';
import TypographyByStatus from 'src/components/TypographyLoading/TypographyByStatus';
import useGetTokenBalance from 'src/hooks/Liquidlity/useGetTokenBalance';
import { BN } from 'src/utils';
import { compactNumber, formatDate } from 'src/utils/format';
import useFunctionVoting from '../hooks/useFunctionVoting';
import useGetUnlockTCV from '../hooks/useGetUnlockTCV';
import useGetVotingPower from '../hooks/useGetVotingPower';
import useGetLockEnd from '../hooks/useGetLockEnd';
import { governanceTokenInfo } from 'src/views/Governance/const';

export default function IncreaseAmount() {
  const [amount, setAmount] = useState<string>('');
  const { icon: Icon, address, decimal } = governanceTokenInfo['TCV'];
  const { data, status } = useGetTokenBalance({ addressToken: address, decimal: decimal });
  const { votingPower, status: votingPowerStatus } = useGetVotingPower();
  const { data: lockTCV, status: statusLockTCV } = useGetUnlockTCV();
  const { lockedEnd, status: statusLockedEnd } = useGetLockEnd();
  const { increaseAmount } = useFunctionVoting();

  const handleIncreaseAmount = async () => {
    await increaseAmount(amount);
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
          {formatDate(Date.now(), 'd/M/yyyy')} - {formatDate(Number(lockedEnd) * 1000, 'd/M/yyyy')}
        </TypographyByStatus>
      </Box>

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

      <Button variant="gradient" fullWidth onClick={handleIncreaseAmount}>
        Increase Lock
      </Button>
    </>
  );
}
