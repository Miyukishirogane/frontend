import LaunchIcon from '@mui/icons-material/Launch';
import { IconButton, Stack } from '@mui/material';
import { toast } from 'react-toastify';
import getChainDetail from './chain';

export const toastTxSuccess = (tx: string) => {
  const { blockExplorers } = getChainDetail();
  const url = blockExplorers?.default.url || 'https://arbiscan.io';

  toast.success(
    <Stack direction="row" alignItems="center" gap={1}>
      Send transaction successful!
      <IconButton href={`${url}/tx/${tx}`} target="_blank" sx={{ flex: 0 }}>
        <LaunchIcon fontSize="medium" onClick={() => {}} />
      </IconButton>
    </Stack>,
    {
      isLoading: false,
      type: 'success',
      autoClose: 3000,
      hideProgressBar: false,
    },
  );
};
