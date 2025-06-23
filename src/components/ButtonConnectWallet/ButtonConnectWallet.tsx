import CheckIcon from '@mui/icons-material/Check';
import CopyAll from '@mui/icons-material/CopyAll';
import HourglassEmpty from '@mui/icons-material/HourglassEmpty';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Button, ClickAwayListener, Divider, MenuItem, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { rotateInfinity } from 'src/animations/rotate';
import { IconWallet } from 'src/assets/icon';
import { useModalFunction } from 'src/jotai/modals/modal/modal';
import { infoChain, infoWallet } from 'src/jotai/wallet/config';
import { copyTextToClipboard } from 'src/utils';
import { formatAddress } from 'src/utils/format';
import { useAccount, useChainId, useConnections, useDisconnect } from 'wagmi';
import ModalListWalletConnect from './ModalListWalletConnect/ModalListWalletConnect';
import { useAuthFunction, useAuthState } from 'src/jotai/auth/auth';
import useLoginQuest from 'src/hooks/Quest/useLoginQuest';
import { Address } from 'viem';

export default function ButtonConnectWallet() {
  const { isConnecting, address } = useAccount();
  if (isConnecting) return <ConnectingButton />;
  if (address) return <ConnectedButton address={address} />;
  return <NotconnectedButton />;
}
function NotconnectedButton() {
  const { openModal } = useModalFunction();
  return (
    <>
      <Button
        variant="gradient"
        onClick={() =>
          openModal({ title: 'Choose Wallet', content: <ModalListWalletConnect />, modalProps: { maxWidth: 'xs' } })
        }
        sx={{ textAlign: 'center', height: { xs: '36px', xsm: '44px' } }}
      >
        <Box component={'span'} sx={{ display: { sm: 'block', xs: 'none' }, mr: 1, width: '130px' }}>
          Connect Wallet
        </Box>
        <IconWallet fontSize="large" sx={{ display: { xs: 'block', sm: 'none' } }} />
      </Button>
    </>
  );
}
function ConnectingButton() {
  return (
    <Box>
      <Button
        variant="gradient"
        startIcon={
          <HourglassEmpty
            sx={{
              fontSize: '17px',
              animation: rotateInfinity,
            }}
          />
        }
        sx={{ height: { xs: '36px', xsm: '44px' } }}
      >
        <Box component={'span'} sx={{ display: { sm: 'block', xs: 'none' } }}>
          Connecting...
        </Box>
      </Button>
    </Box>
  );
}

function ConnectedButton({ address }: { address: string }) {
  const { disconnectAsync } = useDisconnect();
  const chainIdConnected = useChainId();
  const { isLogin } = useAuthState();
  const { openAuthModal, handleLogout } = useAuthFunction();
  const infoChainConnected = infoChain[chainIdConnected];
  const { mutateAsync: loginQuest } = useLoginQuest();

  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const connections = useConnections();

  const ChainIcon = infoChainConnected?.logoChain;

  const handleClick = () => {
    setOpen(prev => !prev);
    setCopied(false);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  function _copyText(_address: string) {
    copyTextToClipboard(_address);
    setCopied(true); // Copy success
  }

  async function clickDisconnect() {
    await disconnectAsync();
    handleLogout();
    window.location.reload();
  }

  useEffect(() => {
    if (open) {
      setCopied(false);
    }
  }, [open]);

  useEffect(() => {
    if (address && !isLogin) {
      loginQuest(address as Address);
    }
  }, [address, isLogin, loginQuest, open]);

  return (
    <>
      <ClickAwayListener onClickAway={handleClickAway}>
        <Box sx={{ position: 'relative' }}>
          <Button
            onClick={handleClick}
            variant="gradient"
            sx={{ height: { xs: '36px', xsm: '44px' } }}
            endIcon={<ExpandMoreIcon sx={{ color: 'white', fontSize: '24px', display: { xs: 'block', sm: 'none' } }} />}
          >
            <Box component={'span'} sx={{ display: { sm: 'block', xs: 'none' }, mr: 1 }}>
              {formatAddress(address)}
            </Box>
            <IconWallet fontSize="large" />
          </Button>
          {open ? (
            <Box
              sx={{
                position: 'absolute',
                top: '50px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '100%',
                minWidth: '200px',
                bgcolor: 'background.paper',
                borderRadius: '16px',
                boxShadow: 4,
                py: 2,
              }}
            >
              <Box sx={{ display: 'flex', placeItems: 'center', px: 2, justifyContent: 'center', mb: 1 }}>
                <ChainIcon sx={{ fontSize: '25px', mr: 1 }} />
                <Typography variant="body2" fontWeight={600} textAlign={'center'} >
                  {infoChainConnected?.name}
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: 'flex', placeItems: 'center', px: 2, mt: 2 }}>
                <Box mr={'auto'} textAlign={'left'}>
                  <Typography variant="body3" color={'text.secondary'} onClick={() => console.log(connections)}>
                    Wallet
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {connections[0]?.connector?.name}
                  </Typography>
                </Box>
                <img
                  src={connections[0]?.connector?.icon || infoWallet[connections[0]?.connector.id]?.logoWallet}
                  alt="logo wallet"
                  style={{ width: '24px', height: '24px', borderRadius: '4px' }}
                />
              </Box>
              <MenuItem sx={{ mt: 1, flexDirection: 'column', placeItems: 'start' }} onClick={() => _copyText(address)}>
                <Typography variant="body3" color={'text.secondary'}>
                  Account address
                </Typography>
                <Box display={'flex'} justifyContent={'space-between'} width={'100%'}>
                  <Typography variant="body2" fontWeight={600}>
                    {formatAddress(address, 5, 4)}
                  </Typography>
                  {copied ? <CheckIcon sx={{ fontSize: '20px' }} /> : <CopyAll sx={{ fontSize: '20px' }} />}{' '}
                  {/* Thay đổi icon dựa trên trạng thái */}
                </Box>
              </MenuItem>
              <MenuItem sx={{ mt: 1, display: isLogin ? 'none' : 'flex' }} hidden={isLogin} onClick={openAuthModal}>
                <Typography variant="body2" color={'text.primary'} fontWeight={600}>
                  Login to quest
                </Typography>
              </MenuItem>
              <MenuItem sx={{ mt: 1 }} onClick={() => clickDisconnect()}>
                <Typography variant="body2" color={'text.primary'} fontWeight={500}>
                  Disconnect
                </Typography>
              </MenuItem>
            </Box>
          ) : null}
        </Box>
      </ClickAwayListener>
      {address && (
        <div
          id="ga4-tcv-connected-wallet"
          style={{ position: 'absolute', zIndex: -1000000, overflow: 'hidden', width: '5px', color: 'transparent' }}
          key={address || ''}
        >
          {address}
        </div>
      )}
    </>
  );
}
