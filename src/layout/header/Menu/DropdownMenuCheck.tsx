import { Box, Typography, Popover, MenuItem } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { TMenu } from 'src/layout/menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface DropdownMenuCheckProps {
  filteredMenu: TMenu;
  defaultTitle: string;
}

function DropdownMenuCheck({ filteredMenu, defaultTitle }: DropdownMenuCheckProps) {
  const { pathname } = useLocation();

  const [selectedItem, setSelectedItem] = useState(defaultTitle);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const currPath = useMemo(() => {
    return filteredMenu.find(item => pathname.includes(item.url));
  }, [filteredMenu, pathname]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (currPath) {
      setSelectedItem(currPath.title);
    } else {
      setSelectedItem(defaultTitle);
    }
  }, [currPath, defaultTitle]);

  if (filteredMenu.length === 0) {
    return <></>;
  }

  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          mr: 3,
          cursor: 'pointer',
          color: selectedItem !== defaultTitle ? '#ffffff' : '#838383',
        }}
        component="div"
        onClick={handleClick}
      >
        <Typography
          variant="body2"
          sx={{
            color: selectedItem !== defaultTitle ? '#ffffff' : '#838383',
            '&:hover': { color: '#ffffff' },
            whiteSpace: 'nowrap',
            display: 'flex',
            flexWrap: 'nowrap',
          }}
        >
          {selectedItem}
        </Typography>
        <ArrowDropDownIcon />
      </Box>

      <Popover
        id={defaultTitle}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        PaperProps={{ sx: { minWidth: '200px', bgcolor: '#000000', borderRadius: '16px', boxShadow: 4, py: 2 } }}
      >
        {filteredMenu.map(item => (
          <MenuItem
            key={item.title}
            onClick={handleClose}
            style={{ color: 'unset', textDecoration: 'none', justifyContent: 'center', padding: '8px 0' }}
          >
            <NavLink onClick={() => setSelectedItem(item.title)} to={item.url} style={{ textDecoration: 'none' }}>
              <Typography
                variant="body2"
                sx={{
                  color: pathname.includes(item.url) ? '#ffffff' : '#838383',
                  '&:hover': { color: '#ffffff' },
                }}
              >
                {item.title}
              </Typography>
            </NavLink>
          </MenuItem>
        ))}
      </Popover>
    </Box>
  );
}

export default DropdownMenuCheck;
