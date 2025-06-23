import { Box } from '@mui/material';
import TableProposalVote from 'src/components/Table/Governance/ProposalVotes/TableProposalVote';
import useGetVotesData from '../hooks/useGetVotesData';

type TProps = {
  proposalId: string;
  sumVotes: number;
};
export default function ProposalVotes(props: TProps) {
  const { proposalId, sumVotes } = props;
  const { votesData, isLoading } = useGetVotesData(proposalId);

  return (
    <Box sx={{ p: '20px' }}>
      <TableProposalVote votesData={votesData} isLoading={isLoading} sumVotes={sumVotes} />
    </Box>
  );
}
