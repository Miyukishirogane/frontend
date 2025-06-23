import { Box, SxProps } from '@mui/material';
import React from 'react';
import { airDropItemAnimation } from 'src/animations/airDrop';
import { imagePath } from 'src/constants/imagePath';

type Props = {
  sx?: SxProps;
};
export default function IconAirDropBlur({ sx }: Props) {
  return (
    <Box
      sx={{
        animation: airDropItemAnimation,
        position: 'absolute',
        ...sx,
      }}
    >
      <img loading="lazy" src={imagePath.AirdropItemBlur} alt="air_drop_item" style={{ width: '100%' }} />
    </Box>
  );
}
