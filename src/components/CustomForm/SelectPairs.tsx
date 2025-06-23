import { Box, MenuItem, Select, SelectProps, Typography } from '@mui/material';
import { IconCustomDropDown } from 'src/assets/icon';
import { mapTokenToIcon } from 'src/constants/mapTokenToIcon';
import usePairsList from 'src/hooks/Projeet/usePairsList';

const SelectPairs = (props: SelectProps) => {
  const { sx, ...rest } = props;
  const { data: pairsList } = usePairsList();

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
        },
        '.MuiInputBase-root.MuiOutlinedInput-root': {
          paddingRight: '8px !important',
        },
        minWidth: '210px',
        overflow: 'hidden',
        boxShadow: 'none !important',
        paddingRight: '0px !important',
        ...sx,
      }}
      IconComponent={props => <IconCustomDropDown {...props} />}
      {...rest}
    >
      {pairsList?.map(pair => {
        const { token0, token1 } = pair;
        const Icon1 = mapTokenToIcon[token0.symbol as keyof typeof mapTokenToIcon];
        const Icon2 = mapTokenToIcon[token1.symbol as keyof typeof mapTokenToIcon];

        return (
          <MenuItem value={pair.pair} key={pair.pair}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Icon1 />
              <Typography fontSize={'20px'} fontWeight={600}>
                {token0.symbol === 'WETH' ? 'ETH' : token0.symbol}
              </Typography>
              <Typography fontSize={'20px'} fontWeight={600}>
                /
              </Typography>
              <Icon2 />
              <Typography fontSize={'20px'} fontWeight={600}>
                {token1.symbol}
              </Typography>
            </Box>
          </MenuItem>
        );
      })}
    </Select>
  );
};

export default SelectPairs;
