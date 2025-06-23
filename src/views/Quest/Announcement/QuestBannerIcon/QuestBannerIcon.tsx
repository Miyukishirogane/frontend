import { Box, SxProps } from '@mui/material';
import React from 'react';
import { airDropItemAnimation } from 'src/animations/airDrop';
import { imagePath } from 'src/constants/imagePath';

interface IProps {
  sx?: SxProps;
  src?: string;
}

const QuestBannerIcon = ({ sx = {}, src = imagePath.QuestBannerCoin1 }: IProps) => {
  return (
    <Box
      sx={{
        animation: airDropItemAnimation,
        position: 'absolute',
        ...sx,
      }}
    >
      <img src={src} alt="quest_banner_coin" style={{ width: '100%' }} />
    </Box>
  );
};

export default QuestBannerIcon;
