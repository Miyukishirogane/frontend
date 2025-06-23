import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextFieldProps } from '@mui/material';
import CustomTextField from 'src/components/CustomForm/CustomTextField';

type TProps = TextFieldProps;
export default function InputSearch(props: TProps) {
  return (
    <CustomTextField
      variant="outlined"
      placeholder="Search...."
      name="Search"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: '#B5B8B8', fontSize: '24px' }} />
          </InputAdornment>
        ),
      }}
      sx={{
        width: { sm: '350px', xs: '100%' },
        '& input': {
          fontSize: '16px!important',
          padding: '0px 12px!important',
        },
      }}
      size="small"
      {...props}
    />
  );
}
