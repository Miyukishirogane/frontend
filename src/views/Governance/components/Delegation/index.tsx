import TableDelegation from 'src/components/Table/Governance/Delegation/TableDelegation';
import { useDelegateSelectValue } from './state/hook';
import DelegationDetail from './components/DelegationDetail';
import { zeroAddress } from 'viem';

export default function DelegationGovernance() {
  const delegateSelect = useDelegateSelectValue();

  if (delegateSelect.address === zeroAddress) return <TableDelegation />;
  return <DelegationDetail />;
}
