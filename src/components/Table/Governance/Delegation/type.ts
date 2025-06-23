import { Address } from 'viem';

export type TDelegationData = {
  address: Address;
  voting_power: number;
  num_delegator: number;
  quorum: number;
};
