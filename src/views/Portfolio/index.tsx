import { useEffect } from 'react';
import Announcement from './Announcement/Announcement';
import TablePorfolio from 'src/components/Table/TablePorfolio';
import { useChainId, useAccount } from 'wagmi';
import { usePendleFunction, usePendleData } from 'src/jotai/pendle/pendle';
import { configUser } from 'src/constants/configEarlySeed';
import { useModalConnectWalletAction } from 'src/jotai/modals/ModalConnectWallet/ModalConnectWallet';
import ModalConnectWallet from 'src/components/Modals/ModalConnectWallet/ModalConnectWallet';
import ModalPortfolioEar from 'src/components/Modals/ModalPortfolio/ModalPortfolioEar';

export default function Portfolio() {
  // state
  const chainIdSelected = useChainId();
  const { address } = useAccount();
  const { listPendle } = usePendleData();
  const { getMarketInfo, getNativeTokenBalance } = usePendleFunction();
  const { closeModal, openModal } = useModalConnectWalletAction();

  // useEffect
  useEffect(() => {
    if (!address) {
      openModal({ title: 'Choose Wallet', content: <ModalConnectWallet />, modalProps: { maxWidth: 'xs' } });
    } else {
      closeModal();
    }
  }, [address, configUser]);

  useEffect(() => {
    getMarketInfo('portfolio');
  }, [chainIdSelected, address]);

  // call token
  useEffect(() => {
    (async () => {
      if (address && listPendle.length > 0) {
        getNativeTokenBalance();
      }
    })();
  }, [address, listPendle.length]);

  return (
    <div style={{ paddingBottom: '100px' }}>
      <Announcement />

      <br />
      <TablePorfolio />

      <ModalPortfolioEar />
    </div>
  );
}
