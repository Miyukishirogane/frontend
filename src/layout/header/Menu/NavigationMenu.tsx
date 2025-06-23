import { Grid, Typography } from '@mui/material';
import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { menu } from 'src/layout/menu';
import { useChainId } from 'wagmi';

function NavigationMenu() {
  const chainId = useChainId();
  const { pathname } = useLocation();
  const filteredMenu =
    chainId === 42161
      ? menu.filter(item => item.title !== 'Faucet' && !item.isInCanalixDropDown && !item.isInAirdropDropDown && !item.isInQuestDropDown)
      : menu.filter(item => !item.isInCanalixDropDown && !item.isInAirdropDropDown && !item.isInQuestDropDown);

  return (
    <>
      {filteredMenu.map(item => (
        <Grid item key={item?.url} sx={{ display: { xs: 'none', md: 'block' }, pr: 4 }} style={{ cursor: 'pointer' }}>
          <NavLink to={item.url} style={{ textDecoration: 'none' }}>
            <Typography
              variant="body2"
              sx={{
                color: item.url === pathname ? '#ffffff' : '#838383',
                '&:hover': { color: '#ffffff' },
                whiteSpace: 'nowrap',
                display: 'flex',
                flexWrap: 'nowrap',
              }}
            >
              {item.title}
            </Typography>
          </NavLink>
        </Grid>
      ))}
    </>
  );
}

export default NavigationMenu;
