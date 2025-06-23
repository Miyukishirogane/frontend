import { Box } from '@mui/material';
import React from 'react';
import { imagePath } from 'src/constants/imagePath';
import IconAirDrop from './IconAirDrop/IconAirDrop';
import IconAirDropBlur from './IconAirDrop/IconAirDropBlur';

const AnnouncementIconBox = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        minWidth: { xs: '350px', lg: '450px' },
        flexDirection: 'column',
        justifyContent: 'flex-end',
        display: 'flex',
      }}
    >
      <IconAirDrop
        sx={{ top: '60px', width: '100px', right: '-15%', rotate: '45deg', display: { xs: 'none', md: 'block' } }}
      />
      <IconAirDrop
        sx={{ top: '2px', left: '-15%', rotate: '0deg', width: '100px', display: { xs: 'none', md: 'block' } }}
      />
      <IconAirDropBlur sx={{ top: '10px', left: '20%', width: '50px', display: { xs: 'none', md: 'block' } }} />
      <IconAirDropBlur
        sx={{ top: '10px', right: '20%', rotate: '40deg', width: '30px', display: { xs: 'none', md: 'block' } }}
      />
      <Box
        component="img"
        src={imagePath.airdropBannerImg}
        loading="lazy"
        alt="air_drop_box"
        sx={{
          width: { xs: '60%', md: '100%' },
          height: { xs: '20%', md: '50%' },
          objectFit: 'contain',
          margin: 'auto',
        }}
      />
    </Box>
  );
};

export default AnnouncementIconBox;
