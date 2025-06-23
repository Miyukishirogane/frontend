import { atom, useAtomValue, useSetAtom } from 'jotai';
import { TypeMarketState } from './type';

export const marketStateInitData = atom<TypeMarketState>({
  filter: 'active',
} as TypeMarketState);

export const useMarketState = () => useAtomValue(marketStateInitData);

export const marketState = atom(marketStateInitData);

export const useMarketStateAction = () => {
  const _setModalData = useSetAtom(marketStateInitData);

  function setFilterPendleList(filter: string) {
      _setModalData((prev) => {
          return {
              ...prev,
              filter: filter
          };
      });
  }

  return {
    setFilterPendleList,
  };
};