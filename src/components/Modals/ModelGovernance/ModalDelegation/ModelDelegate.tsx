import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import { Button, Stack } from '@mui/material';
import CustomTextField from 'src/components/CustomForm/CustomTextField';
import { formatAddress } from 'src/utils/format';
import { Address } from 'viem';
import { useModalFunction } from 'src/jotai/modals/modal/modal';
import useFunctionDelegation from 'src/views/Governance/components/Delegation/hooks/useFunctionDelegation';

type TProps = {
  address: Address;
};

export default function ModalDelegate(props: TProps) {
  const { closeModal } = useModalFunction();
  const { address } = props;
  const { delegate } = useFunctionDelegation();

  const handleDelegate = () => {
    delegate(address);
    closeModal();
  };

  return (
    <Stack gap="16px">
      <CustomTextField
        value={formatAddress(address)}
        variant="outlined"
        name="Address"
        InputProps={{
          startAdornment: <AccountBalanceWalletRoundedIcon />,
        }}
        sx={{
          width: '100%',
          '& input': {
            fontSize: '16px!important',
            padding: '0px 12px!important',
          },
        }}
        size="small"
      />

      <Button variant="gradient" onClick={handleDelegate}>
        Delegate
      </Button>
    </Stack>
  );
}
