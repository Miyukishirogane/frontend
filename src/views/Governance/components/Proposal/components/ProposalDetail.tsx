import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, Grid, Paper, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CustomTab from 'src/components/CustomTab/CustomTab';
import { IToggleButton } from 'src/components/ToggleButtonGroupCustom/ToggleButtonGroupCustom';
import { stateProposalCard } from '../const';
import useFunctionProposal from '../hooks/useFunctionProposal';
import useProposalDetail from '../hooks/useProposalDetail';
import ChipProposalStatus from './ChipProposalStatus';
import GovernanceStats from './GovernanceStats';
import GovernanceTimeline from './GovernanceTimeline';
import ProposalDescription from './ProposalDescription';
import ProposalVotes from './ProposalVotes';
import useGetProposalTimeline from '../hooks/useGetProposalTimeline';

const tabOptions: IToggleButton[] = [
  {
    label: 'Proposal Description',
    value: 'proposal_description',
  },
  {
    label: 'Votes',
    value: 'votes',
  },
];

export default function ProposalDetail() {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState<string>('proposal_description');
  const { voteAgainst, voteFor } = useFunctionProposal();
  const { id, index } = useParams();
  const { data } = useProposalDetail(id || '');
  const { timeline } = useGetProposalTimeline(id || '');
  const state = stateProposalCard[data?.state || 0];

  if (!id) {
    navigate('/governance', { replace: true });
    return null;
  }

  const handleChangeState = () => {
    window.history.back();
  };

  const handleAgainst = () => {
    voteAgainst(id);
  };

  const handleFor = () => {
    voteFor(id);
  };

  const handleExecute = () => {};

  return (
    <Stack sx={{ padding: '20px' }}>
      <Box display="flex" gap="10px">
        <ArrowBackIcon
          sx={{ fontSize: '24px', backgroundColor: '#2465DE', borderRadius: '4px', color: 'white', cursor: 'pointer' }}
          onClick={() => handleChangeState()}
        />
        <Typography>Back</Typography>
      </Box>
      <Grid container spacing={2} sx={{ mt: '4px' }}>
        <Grid item md={7} xs={12}>
          <Paper elevation={1}>
            <CustomTab value={tabValue} onChange={(_e, value) => setTabValue(value)} options={tabOptions} />

            {tabValue === 'proposal_description' ? (
              <ProposalDescription index={Number(index)} />
            ) : (
              <ProposalVotes proposalId={id} sumVotes={data?.sumVotes || 0} />
            )}
          </Paper>
        </Grid>
        <Grid item md={5} xs={12}>
          <Paper elevation={1} sx={{ p: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <GovernanceStats
              againstVotes={data?.againstVotes || 0}
              forVotes={data?.forVotes || 0}
              quorum={data?.quorum || '0'}
              sumVotes={data?.sumVotes || 0}
              sx={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #EDF6FF 100%)' }}
            />
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
              <Typography>State</Typography>
              <ChipProposalStatus state={state} />
            </Box>
            {state == 'active' && (
              <Box display={'flex'} justifyContent={'space-between'} gap={2} alignItems={'center'}>
                <Button sx={{ backgroundColor: '#16A34A', color: 'white', flex: 1 }} onClick={handleFor}>
                  For
                </Button>
                <Button sx={{ backgroundColor: '#DC2626', color: 'white', flex: 1 }} onClick={handleAgainst}>
                  Against
                </Button>
              </Box>
            )}
            {state == 'passed' && (
              <Button variant="gradient" disabled onClick={() => {}}>
                Execute
              </Button>
            )}
            {state == 'executable' && (
              <Button variant="gradient" onClick={handleExecute}>
                Execute
              </Button>
            )}
          </Paper>
          <Paper elevation={1} sx={{ mt: 2 }}>
            <GovernanceTimeline end={timeline?.end || ''} start={timeline?.start || ''} />
          </Paper>
        </Grid>
      </Grid>
    </Stack>
  );
}
