import { Box, SxProps } from '@mui/material';
import React from 'react';
import { airDropItemAnimation } from 'src/animations/airDrop';
import { imagePath } from 'src/constants/imagePath';

type Props = {
  sx?: SxProps;
  imgProps?: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
};

export default function GoldPaper({ sx, imgProps }: Props) {
  return (
    <Box
      sx={{
        animation: airDropItemAnimation,
        position: 'absolute',
        ...sx,
      }}
    >
      <img src={imagePath.LiquidityGoldPaper} alt="star" {...imgProps} />
    </Box>
  );
}
