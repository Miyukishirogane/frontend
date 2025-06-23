import { atom, useAtomValue, useSetAtom } from 'jotai';
import { TypePoolState } from './type';

export const poolStateInitData = atom<TypePoolState>({
  filter: 'active',
} as TypePoolState);

export const usePoolState = () => useAtomValue(poolStateInitData);

export const poolState = atom(poolStateInitData);

export const usePoolStateAction = () => {
  const _setModalData = useSetAtom(poolStateInitData);

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