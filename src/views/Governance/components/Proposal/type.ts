import { stateProposalCard } from './const';

export type TStateProposalCard = (typeof stateProposalCard)[number];

export type TProposalCardData = TDecodedProposals & {
  state: number;
  index: number;
};

export type TDecodedProposals = {
  id: string;
  cancelled: boolean;
  duration: string;
  eta: string;
  executed: boolean;
  proposer: string;
  quorum: string;
  startBlock: string;
};
