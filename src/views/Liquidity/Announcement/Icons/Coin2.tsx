import { Box, SxProps } from '@mui/material';
import React from 'react';
import { airDropItemAnimation } from 'src/animations/airDrop';
import LiquidityCoin2 from '/img/LiquidityCoin_2.png';

type Props = {
  sx?: SxProps;
  imgProps?: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
};
export default function Coin2({ sx, imgProps }: Props) {
  return (
    <Box
      sx={{
        animation: airDropItemAnimation,
        position: 'absolute',
        ...sx,
      }}
    >
      <img src={LiquidityCoin2} alt="star" {...imgProps} />
    </Box>
  );
}
