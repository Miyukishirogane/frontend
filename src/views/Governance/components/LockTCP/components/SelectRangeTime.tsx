import { MenuItem, Select, SelectProps } from '@mui/material';
import { rangeTimeOptions } from '../const';
import { IconCustomDropDown } from 'src/assets/icon';

type TProps = SelectProps;

export default function SelectRangeTime(props: TProps) {
  const { sx, ...rest } = props;

  return (
    <Select
      fullWidth
      MenuProps={{
        PaperProps: {
          sx: {
            '& .MuiMenuItem-root': {
              padding: 1,
            },
          },
        },
      }}
      sx={{
        border: 'none',
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'transparent !important',
        },
        '& .MuiSelect-select': {
          padding: '8px !important',
          minHeight: 'unset',
          textAlign: 'left',
        },
        '& .MuiInputBase-root.MuiOutlinedInput-root': {
          paddingRight: '8px !important',
        },
        overflow: 'hidden',
        boxShadow: 'none !important',
        paddingRight: '0px !important',
        ...sx,
      }}
      IconComponent={props => <IconCustomDropDown {...props} />}
      {...rest}
    >
      {rangeTimeOptions.map(item => (
        <MenuItem value={item.value} key={item.label}>
          {item.label}
        </MenuItem>
      ))}
    </Select>
  );
}
