import { Address } from 'viem';

export type TVoteData = {
  voter: Address;
  choice: 'for' | 'against';
  date: number;
  votingPower: string;
};
