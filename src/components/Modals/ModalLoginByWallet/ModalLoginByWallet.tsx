import { Box, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import LoadingButton from 'src/components/LoadingButton/LoadingButton';
import useLoginQuest from 'src/hooks/Quest/useLoginQuest';
import useAccount from 'src/hooks/useAccount';
import { useAuthFunction, useAuthState } from 'src/jotai/auth/auth';
import { infoWallet } from 'src/jotai/wallet/config';
import { Address } from 'viem';

const ModalLoginByWallet = () => {
  const { address, connector } = useAccount();
  const { openAuthModal } = useAuthState();
  const { closeAuthModal } = useAuthFunction();
  const { mutate: loginQuest, isPending } = useLoginQuest();

  return (
    <Dialog maxWidth="md" open={openAuthModal} onClose={closeAuthModal}>
      <DialogTitle>Login with wallet</DialogTitle>
      <DialogContent>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap={2}
          p={4}
          minWidth={300}
        >
          <img
            src={connector?.icon || infoWallet[connector?.id || 0]?.logoWallet}
            alt={`logo wallet ${connector?.name}`}
            style={{ width: '100px', height: '100px', borderRadius: '4px' }}
          />

          <Typography variant="body1">Welcome to TCV</Typography>

          <LoadingButton
            loading={isPending}
            props={{
              fullWidth: true,
              variant: 'gradient',
            }}
            onClick={() => loginQuest(address as Address)}
          >
            Login with wallet
          </LoadingButton>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ModalLoginByWallet;
