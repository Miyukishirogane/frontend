import { Address } from 'viem';

export type TVotingHistoryData = {
  voter: Address;
  date: number;
  vote: 'Against' | 'For';
  votingPower: string;
  index: number;
  proposalId: string;
};
