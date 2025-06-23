import { Box, Stack, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import CustomTextField from 'src/components/CustomForm/CustomTextField';
import IconAndName from 'src/components/IconAndName/IconAndName';
import LoadingButton from 'src/components/LoadingButton/LoadingButton';
import useExecuteTrade from './hooks/useExecuteTrade';

type TInputValue = {
  size: string;
  margin: string;
};

const ActionBox = () => {
  const [inputValue, setInputValue] = useState<TInputValue>({
    size: '',
    margin: '',
  });
  const { mutate: executeTrade, isPending } = useExecuteTrade();
  const refExecuteTrade = useRef<string | null>(null);

  const handleExecuteTrade = (isLong: boolean) => {
    refExecuteTrade.current = isLong ? 'long' : 'short';
    executeTrade({ margin: inputValue.margin, size: inputValue.size, isLong });
  };

  return (
    <Stack justifyContent={'space-between'} p={4} color="#828282" height={'100%'}>
      <Stack direction={'column'} gap={1}>
        <Box>
          <Typography mb={1}>Margin</Typography>
          <CustomTextField
            value={inputValue.margin}
            inputType="number"
            onChange={e => setInputValue({ ...inputValue, margin: e.target.value })}
            resetFlag={!inputValue.margin.length}
            name="Margin"
            rule={{ min: 0 }}
            sx={{
              width: '100%',
              '& .MuiInputBase-root': {
                width: '100%',
                alignSelf: 'end',
              },
            }}
            InputProps={{
              endAdornment: <IconAndName nameToken={'USDC'} sxIcon={{ fontSize: '20px' }} />,
            }}
          />
        </Box>

        <Box>
          <Typography mb={1}>Size</Typography>
          <CustomTextField
            value={inputValue.size}
            inputType="number"
            onChange={e => setInputValue({ ...inputValue, size: e.target.value })}
            resetFlag={!inputValue.size.length}
            name="Size"
            rule={{ min: 0 }}
            sx={{
              width: '100%',
              '& .MuiInputBase-root': {
                width: '100%',
                alignSelf: 'end',
              },
            }}
            InputProps={{
              endAdornment: <IconAndName nameToken={'USDC'} sxIcon={{ fontSize: '20px' }} />,
            }}
          />
        </Box>
      </Stack>

      <Stack direction={'column'} gap={1}>
        <LoadingButton
          props={{
            variant: 'gradient',
            fullWidth: true,
            sx: {
              background: 'linear-gradient(90deg, #63e031 0%,rgb(129, 248, 183) 100%)',
            },
            disabled: isPending,
          }}
          loading={isPending && refExecuteTrade.current === 'long'}
          onClick={() => handleExecuteTrade(true)}
        >
          Long
        </LoadingButton>
        <LoadingButton
          props={{
            variant: 'gradient',
            fullWidth: true,
            sx: {
              background: 'linear-gradient(90deg, #ff5858 0%,rgb(245, 80, 80) 100%)',
            },
            disabled: isPending,
          }}
          loading={isPending && refExecuteTrade.current === 'short'}
          onClick={() => handleExecuteTrade(false)}
        >
          Short
        </LoadingButton>
      </Stack>
    </Stack>
  );
};

export default ActionBox;
