import { Box, Button, Skeleton } from '@mui/material';
import ModalLiquidityLending from 'src/components/Modals/ModalLiquidity/ModalLiquidityLending';
import { useModalFunction } from 'src/jotai/modals/modal/modal';
import { TAccordionVaultLendingState } from '../jotai/type';

interface IProps {
  index: number;
  vault: TAccordionVaultLendingState;
  loading: boolean;
}

const AccordionContent = (props: IProps) => {
  const { vault, loading } = props;
  const { openModal } = useModalFunction();

  return (
    <>
      {loading ? (
        <Skeleton variant="rounded" width={'100%'} />
      ) : (
        <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
          <Button
            variant="gradient"
            fullWidth
            onClick={() => {
              openModal({
                title: 'Lending',
                content: (
                  <ModalLiquidityLending type="supply" loading={loading} vault={vault as TAccordionVaultLendingState} />
                ),
                modalProps: {
                  maxWidth: 'xs',
                  sx: { '&& .MuiDialogTitle-root': { backgroundColor: 'white', paddingBottom: '0px' } },
                },
              });
            }}
          >
            Supply
          </Button>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => {
              openModal({
                title: 'Lending',
                content: (
                  <ModalLiquidityLending
                    type="withdraw"
                    loading={loading}
                    vault={vault as TAccordionVaultLendingState}
                  />
                ),
                modalProps: {
                  maxWidth: 'xs',
                  sx: { '&& .MuiDialogTitle-root': { backgroundColor: 'white', paddingBottom: '0px' } },
                },
              });
            }}
          >
            Withdraw
          </Button>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => {
              openModal({
                title: 'Lending',
                content: (
                  <ModalLiquidityLending type="borrow" loading={loading} vault={vault as TAccordionVaultLendingState} />
                ),
                modalProps: {
                  maxWidth: 'xs',
                  sx: { '&& .MuiDialogTitle-root': { backgroundColor: 'white', paddingBottom: '0px' } },
                },
              });
            }}
          >
            Borrow
          </Button>
        </Box>
      )}
    </>
  );
};

export default AccordionContent;
