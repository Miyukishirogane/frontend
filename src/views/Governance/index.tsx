import { Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CustomTab from 'src/components/CustomTab/CustomTab';
import { IToggleButton } from 'src/components/ToggleButtonGroupCustom/ToggleButtonGroupCustom';
import { useChainId, useSwitchChain } from 'wagmi';
import AnnouncementGovernance from './components/Announcement';
import DelegationGovernance from './components/Delegation';
import LockTCPGovernance from './components/LockTCP';
import ProposalGovernance from './components/Proposal';
import { listChainIdSupport } from './const';

const tabOptions: IToggleButton[] = [
  {
    label: 'Proposal',
    value: 'proposal',
  },
  {
    label: 'Lock TCP',
    value: 'lock_tcp',
  },
  {
    label: 'Delegation',
    value: 'delegation',
  },
];

export default function Governance() {
  const chainId = useChainId();
  const { switchChainAsync } = useSwitchChain();
  const [searchParams, setSearchParams] = useSearchParams();
  const [tabValue, setTabValue] = useState(searchParams.get('tab') || 'proposal');

  const handleToggleChange = (value: string) => {
    if (!value) return;
    setTabValue(value);
    searchParams.set('tab', value);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (!listChainIdSupport.includes(chainId)) {
      switchChainAsync({ chainId: listChainIdSupport[0] });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId]);

  return (
    <>
      <AnnouncementGovernance />

      <Paper sx={{ my: 4 }} elevation={1}>
        <CustomTab value={tabValue} onChange={(_e, value) => handleToggleChange(value)} options={tabOptions} />

        {tabValue === 'proposal' && <ProposalGovernance />}
        {tabValue === 'lock_tcp' && <LockTCPGovernance />}

        {tabValue === 'delegation' && <DelegationGovernance />}
      </Paper>
    </>
  );
}
