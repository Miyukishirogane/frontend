import { Button } from '@mui/material';
import React from 'react';

const BtnGroup = () => {
  return (
    <>
      <Button
        variant="outlined"
        sx={{
          width: '27px',
          height: '20px',
          color: '#2465DE',
          borderColor: '#2465DE',
        }}
      >
        YT
      </Button>
      <Button
        variant="outlined"
        sx={{
          width: '27px',
          height: '20px',
          margin: '0 7px',
          color: '#39BAFD',
          borderColor: '#39BAFD',
        }}
      >
        LP
      </Button>
      <Button
        variant="outlined"
        sx={{
          width: '27px',
          height: '20px',
          color: '#E38080',
          borderColor: '#E38080',
        }}
      >
        SY
      </Button>
    </>
  );
};

export default BtnGroup;
