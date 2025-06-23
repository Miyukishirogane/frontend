import { Box, SxProps } from '@mui/material';
import React from 'react';
import { airDropItemAnimation } from 'src/animations/airDrop';
import LiquidityCoin1 from '/img/LiquidityCoin_1.png';

type Props = {
  sx?: SxProps;
  imgProps?: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
};
export default function Coin1({ sx, imgProps }: Props) {
  return (
    <Box
      sx={{
        animation: airDropItemAnimation,
        position: 'absolute',
        ...sx,
      }}
    >
      <img src={LiquidityCoin1} alt="star" {...imgProps} />
    </Box>
  );
}
