import { Button } from '@mui/material';
import { Grid } from '@mui/material';
import React from 'react';
import ModalProJeet from 'src/components/Modals/ModalProJeet/ModalProJeet';
import { TAppDenom } from 'src/constants/mapTokenToIcon';
import { useModalFunction } from 'src/jotai/modals/modal/modal';

interface IProps {
  token: TAppDenom;
}

const TableBalanceAction = (props: IProps) => {
  const { token } = props;
  const { openModal } = useModalFunction();

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} alignItems={'center'}>
        <Button
          variant="gradient"
          sx={{ width: '120px', height: '36px' }}
          onClick={() => {
            openModal({
              title: 'YieldFlex',
              content: <ModalProJeet type="deposit" tokenName={token} />,
              modalProps: {
                maxWidth: 'xs',
                sx: {
                  '&& .MuiDialogTitle-root': { backgroundColor: 'white', paddingBottom: '0px' },
                },
              },
            });
          }}
        >
          Deposit
        </Button>
      </Grid>
      <Grid item xs={6} alignItems={'center'}>
        <Button
          variant="outlined"
          sx={{ width: '120px', height: '36px' }}
          onClick={() => {
            openModal({
              title: 'YieldFlex',
              content: <ModalProJeet type="withdraw" tokenName={token} />,
              modalProps: {
                maxWidth: 'xs',
                sx: {
                  '&& .MuiDialogTitle-root': { backgroundColor: 'white', paddingBottom: '0px' },
                },
              },
            });
          }}
        >
          Withdraw
        </Button>
      </Grid>
    </Grid>
  );
};

export default TableBalanceAction;
