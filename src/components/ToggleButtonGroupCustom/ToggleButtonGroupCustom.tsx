import React from 'react';
import { ToggleButton, ToggleButtonGroup, ToggleButtonGroupProps, ToggleButtonProps } from '@mui/material';

export type IToggleButton = {
  value: string;
  label: string;
};

interface IProps extends Omit<ToggleButtonGroupProps, 'value'> {
  value: string;
  handleToggleChange(event: React.MouseEvent<HTMLElement>, newAlignment: string): void;
  data: IToggleButton[];
  toggleBtnProps?: Omit<ToggleButtonProps, 'value'>;
}

const ToggleButtonGroupCustom = (props: IProps) => {
  const { value, handleToggleChange, data, sx, toggleBtnProps = {} as ToggleButtonProps, ...rest } = props;
  const { sx: sxBtn, ...btnProps } = toggleBtnProps;

  return (
    <ToggleButtonGroup
      color="primary"
      value={value}
      defaultValue={value}
      exclusive
      onChange={handleToggleChange}
      aria-label="Platform"
      sx={{
        padding: '4px',
        height: 'auto',
        borderRadius: '24px',
        background: '#F1F1F1',
        '&.MuiTouchRipple-root': {
          display: 'none',
        },
        '&& .Mui-selected, && .Mui-selected:hover': {
          backgroundColor: 'rgba(36, 101, 222, 1)',
          color: 'white',
          borderRadius: '24px',
        },
        ...sx,
      }}
      {...rest}
    >
      {data.map(item => (
        <ToggleButton
          sx={{
            padding: '6px 16px',
            borderRadius: '24px',
            border: 'none',
            height: 'auto',
            '&.MuiTouchRipple-root': {
              display: 'none',
            },
            ...sxBtn,
          }}
          {...btnProps}
          value={item.value}
          key={item.value}
        >
          {item.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default ToggleButtonGroupCustom;
