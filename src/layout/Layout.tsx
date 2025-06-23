import { lazy } from 'react';
import { Box } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import AppProvider from '../jotai/AppProvider';
import Content from './content/Content';
import Header from './header/Header';

const ModalCustom = lazy(() => import('src/components/Modals/ModalCustom/ModalCustom'));
const ModalConnectWallet = lazy(() => import('src/components/Modals/ModalConnectWallet/ModalConnectWallet'));

export default function Layout() {
  return (
    <>
      <AppProvider>
        <Box sx={{ backgroundColor: '#F9FDFF', pt: 4 }}>
          <Header check={true} />
          <Content headerHeight="64px" />
          <ModalCustom />
          <ModalConnectWallet />
          <ToastContainer
            position="top-center"
            autoClose={3000}
            theme="light"
            style={{ width: 'max-content', minWidth: '220px', maxWidth: '90%' }}
            pauseOnHover={true}
          />
        </Box>
      </AppProvider>
    </>
  );
}
