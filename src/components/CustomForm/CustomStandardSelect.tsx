import { Select, SelectProps } from '@mui/material';
import React from 'react';

interface IProps extends Omit<SelectProps, ''> {
  children: React.ReactNode;
}

const CustomStandardSelect = (props: IProps) => {
  const { children, MenuProps, sx, ...selectProps } = props;

  return (
    <Select
      variant="standard"
      disableUnderline
      sx={{
        fontSize: '16px',
        fontWeight: '600',
        pr: 0.5,
        color: 'rgba(36, 101, 222, 1)',
        '& div': {
          ':focus': {
            bgcolor: 'transparent !important',
          },
        },
        '& svg': {
          color: 'unset',
          fontSize: '24px',
        },
        ...sx,
      }}
      MenuProps={{
        MenuListProps: { sx: { minWidth: '120px' } },
        sx: {
          '&& .Mui-selected': {
            color: 'rgba(36, 101, 222, 1)',
            fontWeight: 600,
          },
        },
        ...MenuProps,
      }}
      {...selectProps}
    >
      {children}
    </Select>
  );
};

export default CustomStandardSelect;
