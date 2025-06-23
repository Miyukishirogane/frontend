import { ReactNode } from 'react';
import { DialogProps } from '@mui/material';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import BigNumber from 'bignumber.js';
import { BN } from 'src/utils';

export type TModalData = {
  open: boolean;
  title: string | ReactNode;
  modalProps?: Omit<DialogProps, 'open'>;
  conditionOpen?: boolean | (() => boolean);
  content?: ReactNode;
  airdropValue: BigNumber;
};

const initData: TModalData = {
  open: false, 
  title: '',
  modalProps: undefined,
  conditionOpen: true,
  content: <></>,
  airdropValue: BN(0),
};

const modalData = atom(initData);

export const useModalAirdrop = () => useAtomValue(modalData);

export const useModalAirdropAction = () => {
  const _setModalData = useSetAtom(modalData);

  function setModalData(data: Partial<TModalData>) {
    _setModalData((prev) => {
      return {
        ...prev,
        ...data,
      };
    });
  }
  function openModal(data: Omit<TModalData, 'open'>) {
    setModalData({ ...data, open: true });
  }

  function closeModal() {
    setModalData({
      title: '',
      conditionOpen: true,
      open: false,
    });
  }

  return {
    setModalData,
    openModal,
    closeModal,
  };
};
