import { Box, Button, Skeleton } from '@mui/material';
import { TAccordionVaultState } from 'src/views/Liquidity/jotai/type';
import { BN } from 'src/utils';
import { useModalFunction } from 'src/jotai/modals/modal/modal';
import ModalAddLiquidity from 'src/components/Modals/ModalLiquidity/ModalAddLiquidity';
import ModalRemoveLiquidity from 'src/components/Modals/ModalLiquidity/ModalRemoveLiquidity';
import { useLiquidityData } from 'src/views/Liquidity/jotai/state';
import useAccount from 'src/hooks/useAccount';

export default function LeftContent({
  index,
  vault,
  loading,
}: {
  index: number;
  vault: TAccordionVaultState;
  loading: boolean;
}) {
  const { openModal } = useModalFunction();
  const { isFetchingUserVaultData } = useLiquidityData();
  const { address } = useAccount();

  return (
    <>
      {loading ? (
        <Skeleton variant="rounded" width={'100%'} />
      ) : (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="gradient"
            fullWidth
            onClick={() =>
              openModal({
                title: 'Add Liquidity',
                content: <ModalAddLiquidity index={index} />,
                modalProps: { maxWidth: 'md' },
              })
            }
          >
            Add Liquidity
          </Button>
          {(!isFetchingUserVaultData || address) && BN(vault.deposited).isGreaterThan(0) ? (
            <Button
              variant="outlined"
              fullWidth
              onClick={() =>
                openModal({
                  title: 'Remove Liquidity',
                  content: <ModalRemoveLiquidity index={index} />,
                  modalProps: { maxWidth: 'md' },
                })
              }
            >
              Remove
            </Button>
          ) : (
            <></>
          )}
        </Box>
      )}
    </>
  );
}
