import { Box, Grid, Stack, Typography } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { IconSpinLoading } from 'src/assets/icon';
import ToggleButtonGroupCustom from 'src/components/ToggleButtonGroupCustom/ToggleButtonGroupCustom';
import useGetProposals from './hooks/useGetProposals';
import ProposalCard from './components/ProposalCard';
import { btnGroupInProposal, stateProposalCard } from './const';
import { EmptyIcon } from 'src/assets/EmptyIcon';
import CustomSelectField from 'src/components/CustomForm/CustomSelectField';

export default function ProposalGovernance() {
  const [toggleValue, setToggleValue] = useState<string>('all');
  const { listProposals, isLoading } = useGetProposals();

  const listProposalsFilter = useMemo(() => {
    if (toggleValue === 'all') return listProposals;
    return listProposals?.filter(proposal => stateProposalCard[proposal.state] === toggleValue);
  }, [toggleValue, listProposals]);

  const handleToggleChange = (_event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    if (newAlignment !== toggleValue && newAlignment) {
      setToggleValue(newAlignment);
    }
  };

  return (
    <Box sx={{ padding: '20px', mb: '20px' }}>
      <ToggleButtonGroupCustom
        value={toggleValue}
        handleToggleChange={handleToggleChange}
        data={btnGroupInProposal}
        sx={{ mb: 2, display: { xs: 'none', md: 'inline-flex' } }}
      />
      <CustomSelectField
        value={toggleValue}
        sx={{
          display: { xs: 'block', md: 'none' },
          mb: 2,
          textAlign: 'start',
        }}
        onChange={e => setToggleValue(e.target.value as string)}
        options={btnGroupInProposal}
        size="small"
      />
      {isLoading ? (
        <IconSpinLoading sx={{ fontSize: '110px' }} />
      ) : (
        <Grid container spacing={2}>
          {listProposalsFilter?.length === 0 ? (
            <Stack justifyContent="center" alignItems="center" sx={{ width: '100%' }}>
              <EmptyIcon sx={{ fontSize: '140px' }} />
              <Typography variant={'h6'}>No Data</Typography>
            </Stack>
          ) : (
            <>
              {listProposalsFilter?.map(proposal => {
                return (
                  <Grid item xs={12} md={6}>
                    <ProposalCard proposalData={proposal} />
                  </Grid>
                );
              })}
            </>
          )}
        </Grid>
      )}
    </Box>
  );
}
