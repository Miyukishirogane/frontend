import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { Box, Stack, Typography } from '@mui/material';
import TypographyByStatus from 'src/components/TypographyLoading/TypographyByStatus';
import { formatNumber } from 'src/utils/format';
import useGetDelegated from 'src/views/Governance/components/Delegation/hooks/useGetDelegated';
import useGetBalanceOfVotingPower from 'src/views/Governance/components/LockTCP/hooks/useGetBalanceOfVotingPower';

import { zeroAddress } from 'viem';

export default function CardVotingPower() {
  const { balanceOfVotingPower, status: statusBalance } = useGetBalanceOfVotingPower();
  const { delegated, status: statusDelegated } = useGetDelegated();

  return (
    <Box
      sx={{
        borderRadius: '16px',
        padding: '16px',
        backgroundImage: 'linear-gradient(to bottom, #FFFFFF, #EDF6FF)',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
      }}
    >
      <Typography fontSize={14} fontWeight={600} mb={2}>
        Wallet Voting Power
      </Typography>

      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
        <Typography fontSize={13} color="#8C8C8C">
          Balance
        </Typography>
        <TypographyByStatus status={statusBalance} fontSize={14} fontWeight={500}>
          {formatNumber(balanceOfVotingPower, { fractionDigits: 6 })} veTCV
        </TypographyByStatus>
      </Stack>

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography fontSize={13} color="#8C8C8C">
          Delegate to
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          <AccountBalanceWalletIcon fontSize="small" sx={{ color: '#444' }} />
          <TypographyByStatus status={statusDelegated} fontSize={14} fontWeight={500}>
            {delegated && delegated !== zeroAddress ? delegated : 'N/A'}{' '}
          </TypographyByStatus>
        </Stack>
      </Stack>
    </Box>
  );
}
