import HourglassEmpty from '@mui/icons-material/HourglassEmpty';
import { Button, ButtonProps } from '@mui/material';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode | string;
  props?: ButtonProps;
  icon?: ReactNode;
  loading?: boolean;
  onClick?: () => void;
};

export default function LoadingButton({ props, children, loading = false, icon = '', onClick }: Props) {
  return (
    <>
      {loading ? (
        <Button
          {...props}
          startIcon={
            <HourglassEmpty
              sx={{
                fontSize: '17px',
                animation: 'spin 2s linear infinite',
                '@keyframes spin': {
                  '0%': {
                    transform: 'rotate(360deg)',
                  },
                  '100%': {
                    transform: 'rotate(0deg)',
                  },
                },
              }}
            />
          }
          disabled={true}
        >
          Loading...
        </Button>
      ) : (
        <Button {...props} startIcon={icon} onClick={onClick}>
          {children}
        </Button>
      )}
    </>
  );
}
