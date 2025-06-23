import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { delegateSelect } from './state';

export const useDelegateSelect = () => useAtom(delegateSelect);
export const useDelegateSelectValue = () => useAtomValue(delegateSelect);
export const useSetDelegateSelect = () => useSetAtom(delegateSelect);
