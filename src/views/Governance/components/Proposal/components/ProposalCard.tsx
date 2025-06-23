import { Box, Stack, Typography } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
import TypographyByStatus from 'src/components/TypographyLoading/TypographyByStatus';
import { compactNumber, formatAddress } from 'src/utils/format';
import { mapPresetProposalInfo, stateProposalCard } from '../const';
import useProposalDetail from '../hooks/useProposalDetail';
import { TProposalCardData } from '../type';
import ChipProposalStatus from './ChipProposalStatus';
import ProposalStats from './GovernanceStats';

type TProps = {
  proposalData: TProposalCardData;
};

export default function ProposalCard(props: TProps) {
  const navigate = useNavigate();
  const { proposalData } = props;
  const { proposalDetail, status } = useProposalDetail(proposalData.id);
  const { state, duration, id, proposer, index } = proposalData;
  const title = mapPresetProposalInfo[index].shortDes;

  const handleChangeState = () => {
    navigate(`/governance/${index}/${id}`);
  };

  return (
    <Box
      sx={{
        cursor: 'pointer',
        width: '100%',
        borderRadius: '16px',
        border: '1px solid #DBE5FA',
        padding: '20px',
        backgroundImage: 'linear-gradient(to bottom, #FFFFFF, #EDF6FF)',
        '&:hover': {
          border: '1px solid #487FE3',
          backgroundImage: 'linear-gradient(to bottom, #FFFFFF, #C1E0FF)',
        },
      }}
      onClick={handleChangeState}
    >
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Typography fontWeight={700} fontSize={'16px'}>
          {title}
        </Typography>
        <ChipProposalStatus state={stateProposalCard[state]} />
      </Stack>
      <Box
        display="flex"
        sx={{ flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: '8px', sm: '16px' }, mt: 1, mb: 4 }}
      >
        <Typography fontWeight={500} fontSize={'14px'} color="#8C8C8C">
          #7cc26 by {formatAddress(proposer)}
        </Typography>
        <TypographyByStatus status={status} fontWeight={500} fontSize={'14px'} color="#8C8C8C">
          • {compactNumber((proposalDetail?.sumVotes || 0).toString(), 2)} votes
        </TypographyByStatus>
        <Typography fontWeight={500} fontSize={'14px'} color="#8C8C8C">
          • {formatDistanceToNow(Date.now() + Number(duration) * 1000, { addSuffix: true, locale: enUS })}
        </Typography>
      </Box>

      <ProposalStats
        againstVotes={proposalDetail?.againstVotes || 0}
        forVotes={proposalDetail?.forVotes || 0}
        sumVotes={proposalDetail?.sumVotes || 0}
        quorum={proposalDetail?.quorum || 0}
      />
    </Box>
  );
}
