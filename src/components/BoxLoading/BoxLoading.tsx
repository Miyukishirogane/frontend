import { Box, BoxProps } from '@mui/material';
import React, { ReactNode } from 'react';
import { IconSpinLoading } from 'src/assets/icon';
interface IProps extends BoxProps {
  children: ReactNode;
  loading: boolean;
}

export default function BoxLoading(props: IProps) {
  const { children, loading, ...rest } = props;

  return (
    <Box position={'relative'} {...rest}>
      {children}
      {loading ? (
        <Box
          sx={{
            zIndex: 1,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            placeItems: 'center',
            backdropFilter: 'blur(3px)',
            background: '#03a9f40a',
          }}
        >
          <IconSpinLoading sx={{ fontSize: '110px' }} />
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
}
