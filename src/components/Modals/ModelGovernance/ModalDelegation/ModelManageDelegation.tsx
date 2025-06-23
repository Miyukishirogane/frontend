import { Box, Button, Stack } from '@mui/material';
import { useModalFunction } from 'src/jotai/modals/modal/modal';
import useFunctionDelegation from '../../../../views/Governance/components/Delegation/hooks/useFunctionDelegation';
import CardVotingPower from './components/CardVotingPower';
import useGetDelegated from 'src/views/Governance/components/Delegation/hooks/useGetDelegated';
import { zeroAddress } from 'viem';

export default function ModalManageDelegate() {
  const { closeModal } = useModalFunction();
  const { undelegate } = useFunctionDelegation();
  const { delegated, isLoading } = useGetDelegated();

  const handleDelegate = () => {
    // delegate();
    // closeModal();
  };

  const handleUndelegate = () => {
    undelegate();
    closeModal();
  };

  return (
    <Stack gap="28px">
      <CardVotingPower />
      <Box display="flex" gap="16px" justifyContent="right">
        <Button
          variant="outlined"
          color="error"
          onClick={handleUndelegate}
          disabled={isLoading || delegated === zeroAddress}
        >
          Undelegate
        </Button>
        <Button variant="gradient" onClick={handleDelegate}>
          Delegate
        </Button>
      </Box>
    </Stack>
  );
}
