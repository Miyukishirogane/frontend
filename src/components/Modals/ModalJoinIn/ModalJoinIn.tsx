import ClearRounded from '@mui/icons-material/ClearRounded';
import { Box, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import { useModalJoinIn, useModalJoinInction } from 'src/jotai/modals/ModalJoinIn/ModalJoinIn';

export default function ModalJoinIn() {
  const modal = useModalJoinIn();
  const { closeModal } = useModalJoinInction();
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
