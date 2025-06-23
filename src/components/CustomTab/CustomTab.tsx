import { Tabs, Tab, Typography, TabsProps } from '@mui/material';
import React from 'react';
import { IToggleButton } from 'src/components/ToggleButtonGroupCustom/ToggleButtonGroupCustom';

interface IProps extends TabsProps {
  options: IToggleButton[];
}

const CustomTab = (props: IProps) => {
  const { options, sx, TabIndicatorProps, value, ...rest } = props;

  return (
    <Tabs
      textColor="secondary"
      indicatorColor="secondary"
      sx={{
        width: '100%',
        background: '#F1F1F1',
        borderTopRightRadius: '20px',
        borderTopLeftRadius: '20px',
        ...sx,
      }}
      TabIndicatorProps={{
        style: {
          display: 'none',
        },
        ...TabIndicatorProps,
      }}
      {...rest}
      value={value}
    >
      {options.map(item => {
        const isActive = item.value === value;

        return (
          <Tab
            value={item.value}
            key={item.value}
            sx={{
              padding: '10px, 0px, 10px, 10px',
              borderTopRightRadius: '10px',
              borderTopLeftRadius: '10px',
              backgroundColor: `${isActive ? 'white' : ''}`,
              '&.Mui-selected': {
                color: 'white',
              },
              maxWidth: 'unset',
              flex: 1,
            }}
            label={
              <Typography
                variant="caption2"
                sx={{
                  fontSize: '16px',
                  color: `${isActive ? '#000000' : ''}`,
                  fontWeight: `${isActive ? '700' : ''}`,
                }}
              >
                {item.label}
              </Typography>
            }
          />
        );
      })}
    </Tabs>
  );
};

export default CustomTab;
