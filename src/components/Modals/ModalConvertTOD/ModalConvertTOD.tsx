import ClearRounded from '@mui/icons-material/ClearRounded';
import { Box, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import { IconTCV } from 'src/assets/icon';
import TextSmallNumber from 'src/components/TextSmallNumber/TextSmallNumber';
import { imagePath } from 'src/constants/imagePath';
import { BN } from 'src/utils';

interface IProps {
  open: boolean;
  onClose: () => void;
  todBalance: number;
}

const ModalConvertTOD = (props: IProps) => {
  const { open, onClose, todBalance } = props;

  return (
    <Dialog fullWidth maxWidth="xs" onClose={onClose} open={open}>
      <DialogTitle sx={{ backgroundColor: 'white' }}>
        <Box sx={{ display: 'flex', color: '#303030', mb: '12px' }}>
          <Box display="flex">
            <img src={imagePath.LOGO} alt="logo tcv" width={30} />
            <Typography variant="h5" sx={{ fontWeight: 800, ml: 1 }}>
              TCV
            </Typography>
          </Box>

          <ClearRounded sx={{ ml: 'auto', cursor: 'pointer', fontSize: '20px', color: '#2465DE' }} onClick={onClose} />
        </Box>
      </DialogTitle>

      <DialogContent
        sx={{
          backgroundColor: 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <IconTCV sx={{ width: '120px', height: '120px', mb: 4 }} />
        <Typography>You have receive </Typography>
        <Typography>
          <strong>
            <TextSmallNumber value={BN(todBalance)} />
          </strong>{' '}
          TCV Tokens
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default ModalConvertTOD;
