import { Button, Box, Dialog, DialogContent } from '@mui/material';
import {
  useModalConnectWallet,
  useModalConnectWalletAction,
} from 'src/jotai/modals/ModalConnectWallet/ModalConnectWallet';
import { useModalFunction } from 'src/jotai/modals/modal/modal';
import { IconWallet } from 'src/assets/icon';
import ModalListWalletConnect from 'src/components/ButtonConnectWallet/ModalListWalletConnect/ModalListWalletConnect';
import { useEffect } from 'react';

export default function ModalConnectWallet() {
  const modal = useModalConnectWallet();
  const path = window.location.pathname;
  const { closeModal } = useModalConnectWalletAction();
  const { openModal } = useModalFunction();

  useEffect(() => {
    if (modal.open) {
      closeModal();
    }
  }, [path]);

  return (
    <Dialog fullWidth maxWidth={modal.modalProps?.maxWidth || 'xsm'} open={modal.open} {...modal.modalProps}>
      <DialogContent
        sx={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Button
          variant="gradient"
          onClick={() =>
            openModal({ title: 'Choose Wallet', content: <ModalListWalletConnect />, modalProps: { maxWidth: 'xs' } })
          }
          sx={{ textAlign: 'center', height: { xs: '36px', xsm: '44px' } }}
        >
          <Box component={'span'} sx={{ display: { sm: 'block', xs: 'none' }, mr: 1, width: '130px' }}>
            Connect Wallet
          </Box>
          <IconWallet fontSize="large" sx={{ display: { xs: 'block', sm: 'none' } }} />
        </Button>
      </DialogContent>
    </Dialog>
  );
}
