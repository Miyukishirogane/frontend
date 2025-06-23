import ClearRounded from '@mui/icons-material/ClearRounded';
import { Box, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import { useModalData, useModalFunction } from 'src/jotai/modals/modal/modal';

export default function ModalCustom() {
  const modal = useModalData();
  const { closeModal } = useModalFunction();
  return (
    <Dialog fullWidth maxWidth={modal.modalProps?.maxWidth || 'xsm'} open={modal.open} {...modal.modalProps}>
      <DialogTitle>
        <Box sx={{ display: 'flex' }}>
          {typeof modal.title == 'string' ? <Typography variant="h5">{modal.title}</Typography> : modal.title}
          <ClearRounded sx={{ ml: 'auto', cursor: 'pointer', fontSize: '25px' }} onClick={closeModal} />
        </Box>
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: 'white' }}>{modal.content}</DialogContent>
    </Dialog>
  );
}
