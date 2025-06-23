import { Box, Grid, Typography } from '@mui/material';
import { useEffect } from 'react';
import { IconSpinLoading } from 'src/assets/icon';
import { configUser } from 'src/constants/configEarlySeed';
import { useEarlySeed, useEarlySeedFunction } from 'src/jotai/earlySeed';
import { useModalConnectWalletAction } from 'src/jotai/modals/ModalConnectWallet/ModalConnectWallet';
import useAccount from 'src/hooks/useAccount';
import Announcement from '../EarlySeed/Announcement/Announcement';
import AccordionEarlySeed from './Accordion';
import DetailsEarlySeed from './DetailsEarlySeed/DetailsEarlySeed';
import ModalConnectWallet from 'src/components/Modals/ModalConnectWallet/ModalConnectWallet';
import { Helmet } from 'react-helmet';

export default function EarlySeed() {
  return (
    <>
      <Helmet>
        <title>TCV | Early Seed</title>
      </Helmet>
      <Announcement />
      <br />

      {/* Hidden this section for now  */}
      {/* <Wapper /> */}
    </>
  );
}

export function Wapper() {
  // jotai data
  const { address } = useAccount();
  const { loading, error, check, dataList } = useEarlySeed();
  const { getDataList, updateData, ClearAll } = useEarlySeedFunction();
  const { closeModal, openModal } = useModalConnectWalletAction();

  // useEffect
  useEffect(() => {
    if (address) {
      const checkAdd = configUser.filter(item => item === address);
      ClearAll();
      closeModal();
      updateData('checkJoin', checkAdd.length ? [1, 1] : []);
      updateData('check', false);
      getDataList(checkAdd.length ? 'special' : 'trava');
    } else {
      openModal({ title: 'Choose Wallet', content: <ModalConnectWallet />, modalProps: { maxWidth: 'xs' } });
    }
  }, [address, configUser]);

  return (
    <>
      {loading ? (
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
              <Grid container spacing={{ md: 2.5, xs: 4 }}>
                {check ? (
                  <DetailsEarlySeed />
                ) : (
                  <>
                    {dataList.map((item, index) => {
                      const checkAddress = configUser.filter(item => item === address);
                      if (checkAddress.length > 0 && item.user !== 'trava') {
                        if (item.user === 'special') {
                          return (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                              <AccordionEarlySeed props={item} index={index + 1} />
                            </Grid>
                          );
                        }
                      } else {
                        return (
                          <Grid item xs={12} sm={6} md={4} key={index}>
                            <AccordionEarlySeed props={item} index={index + 1} />
                          </Grid>
                        );
                      }
                    })}
                  </>
                )}
              </Grid>
            </Box>
          )}
        </>
      )}
    </>
  );
}
