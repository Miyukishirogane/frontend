import { Stack, SxProps, TextField, TextFieldProps, Typography } from '@mui/material';

type IProps = Omit<TextFieldProps, 'value' | 'onChange'> & {
  value: [string, string];
  onChange: (valueInput1: string, valueInput2: string) => void;
  wrapperStyle?: SxProps;
};

const RangeInput = (props: IProps) => {
  const { value, onChange, sx, wrapperStyle, ...rest } = props;
  const [valueInput1, valueInput2] = value;

  return (
    <Stack
      direction="row"
      sx={{
        bgcolor: '#EFF2F8',
        boxShadow: '0px 0px 6px 0px #B0CCDA80 inset',
        width: 'unset',
        alignItems: 'center',
        borderRadius: '16px',
        p: 1,
        px: 2,
        ...wrapperStyle,
      }}
      gap={1}
    >
      <TextField
        variant="standard"
        sx={{
          height: 'unset',
          flex: 1,
          '& input': { fontWeight: 700, fontSize: '16px' },
          '& .MuiInputBase-root': {
            ':after': {
              display: 'none',
            },
            ':before': {
              display: 'none',
            },
          },
          ...sx,
        }}
        placeholder="0"
        value={valueInput1}
        onChange={e => onChange(e.target.value, valueInput2)}
        {...rest}
      />
      <Typography fontWeight={700} variant="body1">
        -
      </Typography>
      <TextField
        variant="standard"
        sx={{
          height: 'unset',
          fontSize: '18px',
          flex: 1,
          '& input': { fontWeight: 700, fontSize: '16px' },
          '& .MuiInputBase-root': {
            ':after': {
              display: 'none',
            },
            ':before': {
              display: 'none',
            },
          },
          ...sx,
        }}
        placeholder="0"
        value={valueInput2}
        onChange={e => onChange(valueInput1, e.target.value)}
        {...rest}
      />
    </Stack>
  );
};

export default RangeInput;
