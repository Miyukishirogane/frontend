import { atom } from 'jotai';
import { defaultBuyInfo, defaultValueStrategy } from '../constants';
import { TBuyInfo, TStrategyItem } from '../type';

export const strategyAtom = atom<TStrategyItem[]>([defaultValueStrategy]);
export const buyInfoAtom = atom<TBuyInfo>(defaultBuyInfo);
export const borrowSubmitAtom = atom<boolean>(false);
export const pairsAtom = atom<string>('');
export const isSellDcaAtom = atom<boolean>(false);
export const isSwapAtom = atom<boolean>(false);

isSellDcaAtom.onMount = set => {
  //reset when unmount
  return () => {
    set(false);
  };
};
