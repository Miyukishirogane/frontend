import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Stack, Typography } from '@mui/material';
import TableVotingHistory from 'src/components/Table/Governance/VotingHistory/TableVotingHistory';
import { delegationDefault } from '../const';
import { useDelegateSelect } from '../state/hook';
import { compactNumber, formatAddress } from 'src/utils/format';
import useGetVotingHistory from 'src/components/Table/Governance/VotingHistory/hooks/useGetVotingHistoryData';
import { useMemo } from 'react';
import { BN } from 'src/utils';
import { governanceTokenInfo } from 'src/views/Governance/const';

type TStat = {
  title: string;
  value: string | React.ReactNode;
};

export default function DelegationDetail() {
  const [delegateSelect, setDelegateSelect] = useDelegateSelect();
  const { votingHistory, isLoading } = useGetVotingHistory();
  const { decimal } = governanceTokenInfo['TCV'];

  const listStats: TStat[] = useMemo(() => {
    return [
      {
        title: 'Voting Power',
        value: compactNumber(BN(delegateSelect.voting_power).div(`1e${decimal}`).toString(), 2),
      },
      {
        title: 'Vote Participation',
        value: votingHistory?.length.toString() || '',
      },
      {
        title: 'Received Delegations',
        value: delegateSelect.num_delegator,
      },
    ];
  }, [votingHistory, delegateSelect]);

  return (
    <Stack sx={{ padding: '20px' }}>
      <Box display="flex" gap="16px" alignItems={'center'}>
        <ArrowBackIcon
          sx={{ fontSize: '24px', backgroundColor: '#2465DE', borderRadius: '4px', color: 'white', cursor: 'pointer' }}
          onClick={() => {
            setDelegateSelect(delegationDefault);
          }}
        />
        <Typography fontSize={'32px'} fontWeight={700}>
          Delegate: {formatAddress(delegateSelect.address)}
        </Typography>
      </Box>
      <Box display="flex" gap="20px" sx={{ my: 4, flexDirection: { md: 'row', xs: 'column' } }}>
        {listStats.map(stat => (
          <Stack
            sx={{
              backgroundImage: 'linear-gradient(to bottom, #FFFFFF, #EDF6FF)',
              borderRadius: '20px',
              padding: '24px',
              flex: 1,
              justifyContent: { md: 'left', xs: 'center' },
              alignItems: { md: 'start', xs: 'center' },
            }}
            key={stat.title}
          >
            <Typography fontSize={'14px'} fontWeight={400}>
              {stat.title}
            </Typography>
            <Typography fontSize={'28px'} fontWeight={700}>
              {stat.value}
            </Typography>
          </Stack>
        ))}
      </Box>
      <TableVotingHistory votingHistory={votingHistory} isLoading={isLoading} />
    </Stack>
  );
}
