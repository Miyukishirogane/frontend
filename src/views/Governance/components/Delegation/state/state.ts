import { atom } from 'jotai';
import { TDelegationData } from 'src/components/Table/Governance/Delegation/type';
import { delegationDefault } from '../const';

export const delegateSelect = atom<TDelegationData>(delegationDefault);
