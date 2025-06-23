import { Box, SxProps } from '@mui/material';
import React from 'react';
import { airDropItemAnimation } from 'src/animations/airDrop';
import LiquidityBlurBox from '/img/LiquidityBlurBox.png';

type Props = {
  sx?: SxProps;
  imgProps?: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
};

export default function BlurBox({ sx, imgProps }: Props) {
  return (
    <Box
      sx={{
        animation: airDropItemAnimation,
        position: 'absolute',
        ...sx,
      }}
    >
      <img src={LiquidityBlurBox} alt="star" {...imgProps} />
    </Box>
  );
}
