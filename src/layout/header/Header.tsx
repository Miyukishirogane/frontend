import { Box, Chip, Container, Grid, Link, Typography } from '@mui/material';
import { useMemo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import ButtonConnectWallet from 'src/components/ButtonConnectWallet/ButtonConnectWallet';
import ButtonQuestPoint from 'src/components/Buttons/ButtonQuestPoint/ButtonQuestPoint';
import ButtonSelectChain from 'src/components/Buttons/ButtonSelectChain/ButtonSelectChain';
import { menu } from 'src/layout/menu';
import { useChainId } from 'wagmi';
import DropdownMenu from './Menu/DropdownMenu';
import DropMenu from './Menu/DropMenu';

export default function Header({ check }: { check: boolean }) {
  const chainId = useChainId();
  const { pathname } = useLocation();

  const filteredAllMenu = useMemo(() => {
    return chainId !== 421614
      ? menu.filter(item => item.title !== 'Faucet' && item.title !== 'Canalix')
      : menu.filter(item => item.title !== 'Canalix');
  }, [chainId]);

  return (
    <Box
      sx={{
        position: 'sticky',
        zIndex: '1000',
        width: '100%',
        top: 0,
        left: 0,
      }}
    >
      <Container>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            py: 2,
            background: '#000000',
            borderRadius: '32px',
            maxHeight: '63.5px',
          }}
        >
          <Grid
            container
            sx={{
              alignItems: 'center',
              ml: 2,
              display: 'flex',
              flexWrap: 'nowrap',
              overflow: 'hidden',
            }}
          >
            {check ? (
              <Box
                display="flex"
                flex={1}
                overflow="auto"
                sx={{
                  '-ms-overflow-style': 'none' /* Internet Explorer 10+ */,
                  'scrollbar-width': 'none',
                }}
              >
                {filteredAllMenu.map(item => {
                  return (
                    <Box key={item.title}>
                      {item?.children && item.children.length > 0 ? (
                        <DropdownMenu listNestMenu={item.children} defaultTitle={item.title} />
                      ) : (
                        <Grid item sx={{ display: { xs: 'none', md: 'block' }, pr: 4 }} style={{ cursor: 'pointer' }}>
                          <NavLink to={item.url} style={{ textDecoration: 'none' }}>
                            <Typography
                              variant="body2"
                              sx={{
                                color: pathname.includes(item.url) ? '#ffffff' : '#838383',
                                '&:hover': { color: '#ffffff' },
                                whiteSpace: 'nowrap',
                                display: 'flex',
                                flexWrap: 'nowrap',
                                alignItems: 'center',
                              }}
                            >
                              {item.title}
                              {item?.tag && (
                                <Chip
                                  label={item.tag}
                                  color="error"
                                  size="small"
                                  sx={{
                                    ml: 0.5,
                                    alignSelf: 'flex-start',
                                    height: '60%',
                                    '& .MuiChip-label': {
                                      fontSize: '0.7rem',
                                    },
                                  }}
                                />
                              )}
                            </Typography>
                          </NavLink>
                        </Grid>
                      )}
                    </Box>
                  );
                })}
              </Box>
            ) : (
              <></>
            )}
          </Grid>
          <Box sx={{ mr: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <ButtonQuestPoint />
            <ButtonSelectChain />
            <ButtonConnectWallet />
            {check ? (
              <Box sx={{ display: { sm: 'flex', md: 'none' }, cursor: 'pointer', margin: 'auto 0' }}>
                <DropMenu />
              </Box>
            ) : (
              <></>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
