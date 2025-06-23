import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { buyInfoAtom, isSellDcaAtom, isSwapAtom, pairsAtom, strategyAtom } from './state';

export const useStrategyState = () => useAtom(strategyAtom);
export const useSetStrategyState = () => useSetAtom(strategyAtom);
export const useBuyInfoAtomState = () => useAtom(buyInfoAtom);
export const usePairsAtomState = () => useAtom(pairsAtom);
export const usePairsAtomValue = () => useAtomValue(pairsAtom);
export const useSetPairsAtom = () => useSetAtom(pairsAtom);
export const useIsSellDca = () => useAtom(isSellDcaAtom);
export const useIsSwapAtom = () => useAtom(isSwapAtom);
