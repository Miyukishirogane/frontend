import { useEffect } from 'react';
import Announcement from './Announcement/Announcement';
import AccordionPrivateSale from './Accordion/AccordionPrivateSale';
import { Box, Grid, Typography } from '@mui/material';
import { IconSpinLoading } from 'src/assets/icon';
import { useModalJoinInction } from 'src/jotai/modals/ModalJoinIn/ModalJoinIn';
import { useUserPrivateSaleDetail } from 'src/jotai/userSale/detailPrivateSale';
import DetailsPrivateSale from './DetailsPrivateSale/DetailsPrivateSale';
import { useUserPrivateSaleFunction } from 'src/jotai/userSale/userPrivateSale';
import { useUserPrivateSale } from 'src/jotai/userSale/userPrivateSale';
import { useChainId } from 'wagmi';
import { useUserPrivateSaleDetailFunction } from 'src/jotai/userSale/detailPrivateSale';

export default function Privatesale() {
  const chainIdSelected = useChainId();
  const { openModal, closeModal } = useModalJoinInction();
  const { setState, getStateAllVaultsPrivateSaleData } = useUserPrivateSaleFunction();
  const checkPublicSale = sessionStorage.getItem('PrivateSaleToken');
  const { setState: setPrivateSaleDetailState } = useUserPrivateSaleDetailFunction();

  useEffect(() => {
    if (!checkPublicSale) {
      setState({
        messError: false,
      });
      setPrivateSaleDetailState({
        check: false,
      });
      openModal({
        title: 'Password to Join',
        content: 'Enter the provided password to join',
        modalProps: { maxWidth: 'xs' },
      });
    } else {
      setState({
        messError: false,
      });
      setPrivateSaleDetailState({
        check: false,
      });
      closeModal();
      getStateAllVaultsPrivateSaleData();
    }
  }, [chainIdSelected]);

  return (
    <>
      <Announcement />

      <br />

      <Wapper />
    </>
  );
}

function Wapper() {
  // jotai data
  const { check } = useUserPrivateSaleDetail();
  const { openModal, closeModal } = useModalJoinInction();
  const { dataList, loadingPage, error } = useUserPrivateSale();
  const { setState, getStateAllVaultsPrivateSaleData } = useUserPrivateSaleFunction();

  const checkPublicSale = sessionStorage.getItem('PrivateSaleToken');

  // check join in
  useEffect(() => {
    // close modal login true
    if (!checkPublicSale) {
      setState({
        messError: false,
      });
      openModal({
        title: 'Password to Join',
        content: 'Enter the provided password to join',
        modalProps: { maxWidth: 'xs' },
      });
    } else {
      setState({
        messError: false,
      });
      closeModal();
      getStateAllVaultsPrivateSaleData();
    }
  }, []);

  return (
    <>
      {loadingPage ? (
        <Box>
          <IconSpinLoading sx={{ fontSize: '100px' }} />
        </Box>
      ) : (
        <>
          {error ? (
            <Box>
              <Typography>{error.message || 'Error!!'}</Typography>
            </Box>
          ) : (
            <Box sx={{ pb: 10 }}>
              {checkPublicSale ? (
                <Grid container spacing={{ md: 2.5, xs: 4 }}>
                  {check ? (
                    <DetailsPrivateSale />
                  ) : (
                    <>
                      {dataList.map(item => (
                        <Grid item xs={12} sm={6} md={4} key={item.tcvPrice}>
                          <AccordionPrivateSale {...item} />
                        </Grid>
                      ))}
                    </>
                  )}
                </Grid>
              ) : (
                <></>
              )}
            </Box>
          )}
        </>
      )}
    </>
  );
}
