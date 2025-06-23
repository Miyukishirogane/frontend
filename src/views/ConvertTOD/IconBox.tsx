import { Box } from '@mui/material';
import React from 'react';
import { airDropItemAnimation } from 'src/animations/airDrop';
import { imagePath } from 'src/constants/imagePath';

const IconBox = () => {
  return (
    <>
      <Box
        component="img"
        sx={{
          position: 'absolute',
          right: { xs: '5%', md: '15%' },
          bottom: '20%',
          height: '80%',
          width: { xs: '90%', md: '30%' },
        }}
        src={imagePath.ConvertTodStar}
      />

      <Box
        component="img"
        sx={{
          position: 'absolute',
          right: { xs: '50%', md: '28%' },
          bottom: '8%',
          height: { xs: '120px', md: '170px' },
          aspectRatio: '1/1',
          animation: airDropItemAnimation,
          animationDelay: '2000ms',
        }}
        src={imagePath.ConvertTodCoin}
      />

      <Box
        component="img"
        sx={{
          position: 'absolute',
          right: { xs: '50%', md: '12%' },
          top: '10%',
          height: '60px',
          aspectRatio: '1/1',
          opacity: 0.3,
          rotate: '270deg',
          animation: airDropItemAnimation,
        }}
        src={imagePath.ConvertTodCoin}
      />

      <Box
        component="img"
        sx={{
          position: 'absolute',
          right: { xs: '70%', md: '40%' },
          top: '20%',
          height: '60px',
          aspectRatio: '1/1',
          opacity: 0.2,
          rotate: '315deg',
          animation: airDropItemAnimation,
        }}
        src={imagePath.ConvertTodIcon}
      />

      <Box
        component="img"
        sx={{
          position: 'absolute',
          right: '13%',
          top: { xs: '8%', md: '20%' },
          height: { xs: '150px', md: '200px' },
          aspectRatio: '1/1',
          animation: airDropItemAnimation,
        }}
        src={imagePath.ConvertTodIcon}
      />
    </>
  );
};

export default IconBox;
