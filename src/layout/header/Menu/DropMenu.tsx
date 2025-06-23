import React, { useState, useEffect } from 'react';
import { MenuItem, Box, Typography, ClickAwayListener } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { menu } from 'src/layout/menu';
import { NavLink, useLocation } from 'react-router-dom';
import { useChainId } from 'wagmi';

export default function DropMenu() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const chainId = useChainId();

  const filteredMenu = chainId === 42161 ? menu.filter(item => item.title !== 'Faucet') : menu;
  const handleClick = () => {
    setOpen(prev => !prev);
  };
  const handleClickAway = () => {
    setOpen(false);
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 600) {
        handleClickAway();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box sx={{ position: 'relative' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }} onClick={handleClick}>
          <MenuIcon sx={{ color: '#FFFFFF', fontSize: '28px' }} />
        </Box>
        {open ? (
          <Box
            sx={{
              position: 'absolute',
              top: '46px',
              left: '50%',
              transform: 'translateX(-83%)',
              width: '100%',
              minWidth: '200px',
              bgcolor: '#000000',
              borderRadius: '16px',
              maxHeight: 'calc(100vh - 46px)',
              overflow: 'auto',
              boxShadow: 4,
              py: 2,
            }}
          >
            {filteredMenu.map(item => (
              <>
                {item?.children && item.children.length > 0 ? (
                  <>
                    {item.children.map(nestI => (
                      <MenuItem
                        key={nestI.url}
                        onClick={() => {
                          handleClickAway();
                        }}
                        style={{ color: 'unset', textDecoration: 'none', justifyContent: 'center', padding: '8px 0' }}
                      >
                        <NavLink to={nestI.url} style={{ textDecoration: 'none' }}>
                          <Typography
                            variant="body2"
                            sx={{
                              color: nestI.url == pathname ? '#ffffff' : '#838383',
                              '&:hover': { color: '#ffffff' },
                            }}
                          >
                            {nestI.title}
                          </Typography>
                        </NavLink>
                      </MenuItem>
                    ))}
                  </>
                ) : (
                  <MenuItem
                    key={item.url}
                    onClick={() => {
                      handleClickAway();
                    }}
                    style={{ color: 'unset', textDecoration: 'none', justifyContent: 'center', padding: '8px 0' }}
                  >
                    <NavLink to={item.url} style={{ textDecoration: 'none' }}>
                      <Typography
                        variant="body2"
                        sx={{ color: item.url == pathname ? '#ffffff' : '#838383', '&:hover': { color: '#ffffff' } }}
                      >
                        {item.title}
                      </Typography>
                    </NavLink>
                  </MenuItem>
                )}
              </>
            ))}
          </Box>
        ) : null}
      </Box>
    </ClickAwayListener>
  );
}
