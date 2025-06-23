import { MenuItem, Select, SelectProps } from '@mui/material';
import { IconCustomDropDown } from 'src/assets/icon';

type TProps = SelectProps & {
  options: { value: string; label: string }[];
};

const CustomSelectField = (props: TProps) => {
  const { sx, options, ...rest } = props;

  return (
    <Select
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
        overflow: 'hidden',
        background: '#eff2f8 ',
        fontSize: '18px',
        fontWeight: '700',
        textAlign: 'end',
        color: 'black ',
        borderRadius: '16px ',
        pr: '18px',
        boxShadow: '0px 0px 6px 0px #B0CCDA80 inset',
        '& fieldset': { border: 'none ' },
        '& input': { padding: '16px 25px', fontSize: '20px', fontWeight: 700 },
        minWidth: '130px',
        ...sx,
      }}
      IconComponent={IconCustomDropDown}
      {...rest}
    >
      {options.map(item => (
        <MenuItem value={item.value} key={item.value}>
          {item.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default CustomSelectField;
