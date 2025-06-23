import { Box, MenuItem, Select, SelectProps } from '@mui/material';
import { IconCustomDropDown } from 'src/assets/icon';
import IconAndName from 'src/components/IconAndName/IconAndName';

type TProps = SelectProps & {
  options: string[];
};

const SelectToken = (props: TProps) => {
  const { sx, options, ...rest } = props;

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
        '.MuiOutlinedInput-notchedOutline': {
          borderColor: 'transparent !important',
        },
        '.MuiSelect-select': {
          padding: '8px !important',
          minHeight: 'unset',
        },
        '.MuiInputBase-root.MuiOutlinedInput-root': {
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
      {options.map(item => (
        <MenuItem value={item} key={item}>
          <Box>
            <IconAndName nameToken={item} sxIcon={{ fontSize: '20px' }} />
          </Box>
        </MenuItem>
      ))}
    </Select>
  );
};

export default SelectToken;
