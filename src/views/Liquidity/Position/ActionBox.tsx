import { Box, Stack, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import CustomTextField from 'src/components/CustomForm/CustomTextField';
import IconAndName from 'src/components/IconAndName/IconAndName';
import LoadingButton from 'src/components/LoadingButton/LoadingButton';
import useExecuteTrade from './hooks/useExecuteTrade';
import useGetTokenBalance from 'src/hooks/Liquidlity/useGetTokenBalance';
import useUserTradingAddress from '../LiquidityLending/hooks/useUserTradingAddress';

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
  const { data: userTradingAddress } = useUserTradingAddress();
  console.log('🚀 ~ ActionBox ~ userTradingAddress:', userTradingAddress);
  const { tokenBalance } = useGetTokenBalance({
    addressToken: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
    decimal: 6,
    customAddress: userTradingAddress,
  });
  const [isValidate, setIsValidate] = useState(false);

  const handleExecuteTrade = (isLong: boolean) => {
    refExecuteTrade.current = isLong ? 'long' : 'short';
    console.log('🚀 ~ handleExecuteTrade: ~ inputValue:', refExecuteTrade.current);
    executeTrade({ margin: inputValue.margin, size: inputValue.size, isLong });
  };

  const handleMaxMargin = () => {
    if (tokenBalance && Number(tokenBalance) > 0) {
      setInputValue({ ...inputValue, margin: tokenBalance });
    }
  };

  useEffect(() => {
    setInputValue({ ...inputValue, size: (Number(inputValue.margin) * 25).toString() });
  }, [inputValue.margin]);

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
            _onError={e => setIsValidate(!!e)}
            InputProps={{
              endAdornment: (
                <Stack direction={'row'} gap={1.5}>
                  <Typography sx={{ cursor: 'pointer' }} onClick={handleMaxMargin}>
                    Max
                  </Typography>
                  <IconAndName nameToken={'USDC'} sxIcon={{ fontSize: '20px' }} />
                </Stack>
              ),
            }}
          />
        </Box>

        <Box>
          <Typography mb={1}>Size</Typography>
          <CustomTextField
            value={inputValue.size}
            inputType="number"
            onChange={e => setInputValue({ ...inputValue, size: e.target.value })}
            resetFlag={!inputValue.size.length || isValidate}
            name="Size"
            rule={{ min: 67, max: Number(tokenBalance) * 25 || undefined }}
            _onError={e => setIsValidate(!!e)}
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

      <Stack direction={'column'} gap={1} mt={2}>
        <LoadingButton
          props={{
            variant: 'gradient',
            fullWidth: true,
            sx: {
              background: 'linear-gradient(90deg, #63e031 0%,rgb(129, 248, 183) 100%)',
            },
            disabled: isPending || isValidate,
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
            disabled: isPending || isValidate,
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
