import { Box, Button, ClickAwayListener, Divider, MenuItem, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';
import { useChainId, useSwitchChain } from 'wagmi';
import HourglassEmpty from '@mui/icons-material/HourglassEmpty';
import { rotateInfinity } from 'src/animations/rotate';
import { infoChain } from 'src/jotai/wallet/config';
import { TAppChainId } from 'src/jotai/wallet/type';
import { useLocation } from 'react-router-dom';

export default function ButtonSelectChain() {
  // check
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const chainIdConnected = useChainId();
  const { chains, switchChain, isPending } = useSwitchChain();

  const IconChainConnected = infoChain[chainIdConnected]?.logoChain;

  const onSwitchChain = (item: number) => {
    switchChain({ chainId: item as 42161 | 421614 });
    handleClickAway();
  };

  const handleClick = () => {
    setOpen(prev => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box sx={{ position: 'relative', mr: 1 }}>
        {isPending ? (
          <Button
            startIcon={
              <HourglassEmpty
                sx={{
                  fontSize: '17px',
                  animation: rotateInfinity,
                }}
              />
            }
            variant="outlined"
            sx={{ borderColor: '#2465DE', color: 'white', height: { xs: '36px', xsm: '44px' } }}
          >
            <Box component={'span'} sx={{ display: { sm: 'block', xs: 'none' } }}>
              Switching...
            </Box>
          </Button>
        ) : (
          <Button
            onClick={handleClick}
            variant="outlined"
            sx={{ borderColor: '#2465DE', color: 'white', height: { xs: '36px', xsm: '44px' } }}
            endIcon={<ExpandMoreIcon sx={{ color: 'white', fontSize: '24px' }} />}
          >
            <IconChainConnected sx={{ fontSize: '24px', mr: { xs: 0, sm: 1 } }} />
            <Typography variant="body2" fontWeight={700} sx={{ display: { sm: 'inline-flex', xs: 'none' } }} noWrap>
              {infoChain[chainIdConnected]?.name}
            </Typography>
          </Button>
        )}

        {open ? (
          <Box
            sx={{
              position: 'absolute',
              top: '50px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100%',
              minWidth: '180px',
              bgcolor: 'background.paper',
              borderRadius: '16px',
              boxShadow: 4,
              py: 2,
            }}
          >
            <Typography sx={{ textAlign: 'center', mb: 1 }} variant="body2" fontWeight={600}>
              Select a network
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {chains.map((chain, index) => {
              // hidden 42161
              if (location?.pathname !== '/early_seed') {
                if (chain.id !== chainIdConnected && chain.id !== 56) {
                  const MenuIcon = infoChain[chain.id as TAppChainId]?.logoChain;

                  return (
                    <MenuItem
                      sx={{ mb: 0.5 }}
                      key={index + '' + chain.id}
                      onClick={() => {
                        onSwitchChain(chain.id);
                      }}
                    >
                      <MenuIcon sx={{ fontSize: '24px', mr: 1 }} />
                      <Typography>{infoChain[chain.id as TAppChainId]?.name || 'Unknow'}</Typography>
                    </MenuItem>
                  );
                }
              } else {
                if (chain.id !== chainIdConnected && chain.id !== 97 && chain.id !== 421614) {
                  const MenuIcon = infoChain[chain.id as TAppChainId]?.logoChain;

                  return (
                    <MenuItem
                      sx={{ mb: 0.5 }}
                      key={index + '' + chain.id}
                      onClick={() => {
                        onSwitchChain(chain.id);
                      }}
                    >
                      <MenuIcon sx={{ fontSize: '24px', mr: 1 }} />
                      <Typography>{infoChain[chain.id as TAppChainId]?.name || 'Unknow'}</Typography>
                    </MenuItem>
                  );
                }
              }
              return null;
            })}
          </Box>
        ) : null}
      </Box>
    </ClickAwayListener>
  );
}
