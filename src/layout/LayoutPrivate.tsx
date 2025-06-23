import Header from './header/Header';
import AppProvider from '../jotai/AppProvider';
import Content from './content/Content';
import { ToastContainer } from 'react-toastify';
import { Box } from '@mui/material';
import ModalCustom from 'src/components/Modals/ModalCustom/ModalCustom';
import ModaInfro from 'src/components/Modals/ModaInfro/ModaInfro';

export default function LayoutPrivate() {


    return (
        <>
            <AppProvider>
                <Box sx={{ backgroundColor: '#F9FDFF', pt: 4 }}>
                    <Header check={false} />
                    <Content headerHeight="64px" />
                    <ModalCustom />
                    <ModaInfro />
                    <ToastContainer position="top-center" autoClose={3000} theme="light" style={{ width: 'max-content', minWidth: '220px', maxWidth: '90%' }} pauseOnHover={true} />
                </Box>
            </AppProvider>
        </>
    );
}
