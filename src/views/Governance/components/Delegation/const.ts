import { TDelegationData } from 'src/components/Table/Governance/Delegation/type';
import { zeroAddress } from 'viem';

export const delegationDefault: TDelegationData = {
  address: zeroAddress,
  num_delegator: 0,
  quorum: 0,
  voting_power: 0,
};
