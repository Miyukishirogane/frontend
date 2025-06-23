import { Box } from '@mui/material';
import Announcement from './Announcement';
import ConvertBox from './ConvertBox';
import WithdrawBox from './WithdrawBox';
import { useModalConnectWalletAction } from 'src/jotai/modals/ModalConnectWallet/ModalConnectWallet';
import useAccount from 'src/hooks/useAccount';
import { useEffect, useState } from 'react';
import ModalConnectWallet from 'src/components/Modals/ModalConnectWallet/ModalConnectWallet';
import { Helmet } from 'react-helmet';

const ConvertTCP = () => {
  const { closeModal, openModal } = useModalConnectWalletAction();
  const { address } = useAccount();

  const [tcpAmount, setTcpAmount] = useState(0);

  useEffect(() => {
    if (address) {
      closeModal();
    } else {
      openModal({ title: 'Choose Wallet', content: <ModalConnectWallet />, modalProps: { maxWidth: 'xs' } });
    }
  }, [address]);

  return (
    <>
      <Helmet>
        <title>TCV | Convert TCP</title>
      </Helmet>

      <Announcement />

      {/* <Box sx={{ py: 4, display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
        <Box sx={{ flex: 1.2 }}>
          <ConvertBox tcpAmount={tcpAmount} setTcpAmount={(value) => setTcpAmount(value)} />
        </Box>

        <Box sx={{ flex: 0.8 }}>
          <WithdrawBox tcpAmount={tcpAmount} />
        </Box>
      </Box> */}
    </>
  );
};

export default ConvertTCP;
