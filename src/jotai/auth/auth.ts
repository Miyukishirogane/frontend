import { atom, useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import useAccount from 'src/hooks/useAccount';
import { JWT_KEY } from 'src/utils/constant';
import { queryClient } from '../AppProvider';
import { prevAddress } from 'src/views/Quest/constant';
import { Address } from 'viem';

export type TAuthState = {
  openAuthModal: boolean;
  isLogin: boolean;
  token?: string;
};

const initData: TAuthState = {
  openAuthModal: false,
  isLogin: localStorage.getItem('token') ? true : false,
  token: localStorage.getItem('token') ?? undefined,
};

const authState = atom(initData);

export const useAuthState = () => useAtomValue(authState);
export const useAuthFunction = () => {
  const setAuthState = useSetAtom(authState);
  const { address } = useAccount();

  function setAuthPropsData(data: Partial<TAuthState>) {
    setAuthState(prev => {
      return {
        ...prev,
        ...data,
      };
    });
  }

  const openAuthModal = () => {
    setAuthState(prev => ({ ...prev, openAuthModal: true }));
  };

  const closeAuthModal = () => {
    setAuthState(prev => ({ ...prev, openAuthModal: false }));
  };

  const handleSetToken = (token: string, address: Address) => {
    setAuthState(prev => ({ ...prev, token: token, isLogin: true }));
    localStorage.setItem(JWT_KEY, token);
    localStorage.setItem(prevAddress, address);
    queryClient.invalidateQueries({ queryKey: ['userQuestInfo'] });
  };

  const handleLogout = () => {
    setAuthState(prev => ({ ...prev, token: undefined, isLogin: false }));
    localStorage.removeItem(JWT_KEY);
  };

  useEffect(() => {
    if (!address) {
      handleLogout();
    }
  }, []);

  return {
    setAuthPropsData,
    openAuthModal,
    closeAuthModal,
    handleSetToken,
    handleLogout,
  };
};
