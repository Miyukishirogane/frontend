import { TextField, TextFieldProps } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { regexConfigValue } from 'src/utils';
import { TOptionValidate, validate } from 'src/utils/validateForm';

type TProps = TextFieldProps & {
  _onError?: (error: string | undefined) => void;
  rule?: TOptionValidate;
  inputType?: string;
  resetFlag?: boolean;
  name: string;
};

const CustomTextField = (props: TProps) => {
  const { _onError, onChange, rule, inputType, sx, resetFlag, name, ...rest } = props;
  const ref = useRef<string | undefined>(undefined);

  const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (!onChange) return undefined;
    const inputValue = inputType === 'number' ? regexConfigValue(event.target.value) : event.target.value;

    if (rule) {
      const { error } = validate(inputValue, rule, name);
      ref.current = error[0];

      if (_onError) {
        _onError(error[0]);
      }
    }

    onChange({ ...event, target: { ...event.target, value: inputValue } });
  };

  useEffect(() => {
    ref.current = undefined;
  }, [resetFlag]);

  useEffect(() => {
    if (rule && rest.value) {
      const { error } = validate(rest.value as string, rule, name);
      ref.current = error[0];

      if (_onError) {
        _onError(error[0]);
      }
    }
  }, [rest.value]);

  return (
    <TextField
      variant="outlined"
      sx={{
        '& .MuiInputBase-root.MuiOutlinedInput-root': {
          background: '#eff2f8 !important',
          fontSize: '18px',
          fontWeight: '400',
          textAlign: 'end',
          color: 'black !important',
          borderRadius: '16px !important',
          pr: '18px',
          boxShadow: '0px 0px 6px 0px #B0CCDA80 inset',
        },

        '& fieldset': { border: 'none !important' },
        '& input': { padding: '12px 20px!important', fontSize: '20px', fontWeight: 700 },
        width: '130px',
        height: 'unset',
        ...sx,
      }}
      placeholder="0"
      onChange={handleOnChange}
      helperText={ref.current}
      error={Boolean(ref.current)}
      FormHelperTextProps={{
        sx: { fontSize: '12px', width: 'fit-content', alignSelf: 'end' },
      }}
      {...rest}
    />
  );
};

export default CustomTextField;
