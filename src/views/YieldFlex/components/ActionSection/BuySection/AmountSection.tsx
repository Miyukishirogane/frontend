import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Box, Button, Divider, FormControl, IconButton, Slider, Stack, Tooltip, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import CustomTextField from 'src/components/CustomForm/CustomTextField';
import SelectToken from 'src/components/CustomForm/SelectToken';
import TypographyByStatus from 'src/components/TypographyLoading/TypographyByStatus';
import usePairsList from 'src/hooks/Projeet/usePairsList';
import { BN } from 'src/utils';
import { decimalFlood, formatNumber } from 'src/utils/format';
import { validate } from 'src/utils/validateForm';
import { defaultBuyInfo, defaultValueStrategy } from 'src/views/YieldFlex/constants';
import useSimulateGetFee from 'src/views/YieldFlex/hooks/useSimulateGetFee';
import {
  useBuyInfoAtomState,
  useIsSwapAtom,
  usePairsAtomState,
  useStrategyState,
} from 'src/views/YieldFlex/state/hooks';
import { TBuyInfo } from 'src/views/YieldFlex/type';
import { limitOrderMarks } from '../../AutoDCA/constant';

interface IProps {
  handleChangeInput: (key: keyof TBuyInfo, value: string) => void;
  handleFieldError: (err: string | undefined) => void;
  balance: string | undefined;
}

const AmountSection = (props: IProps) => {
  const { handleChangeInput, handleFieldError, balance } = props;
  const [buyInfo, setBuyInfo] = useBuyInfoAtomState();
  const [, setStrategyItems] = useStrategyState();
  const [percentage, setPercentage] = useState(0);
  const [, setPair] = usePairsAtomState();
  const [helpText, setHelpText] = useState<string | undefined>();
  const { data: fee, status: feeLoading } = useSimulateGetFee();
  const { data: pairsList } = usePairsList();
  const [isSwap, setIsSwap] = useIsSwapAtom();

  const maxBalanceAfterFee = useMemo(() => {
    if (!balance) return '0';
    if (fee === undefined) return balance;
    if (fee.isLessThan(0)) return '0';

    return BN(balance).minus(fee).toString();
  }, [fee, balance]);

  const rule = {
    max: { value: Number(maxBalanceAfterFee || 0), message: 'Input value must smaller than your balance' },
  };

  const listTokenOut = useMemo(() => {
    if (!pairsList) return [];
    const setTokenOut = new Set<string>();
    pairsList.forEach(item => {
      setTokenOut.add(item.token1.symbol);
    });

    return Array.from(setTokenOut);
  }, [pairsList]);

  const listTokenIn = useMemo(() => {
    if (!pairsList) return [];
    const setTokenIn = new Set<string>();
    pairsList.forEach(item => {
      setTokenIn.add(item.token0.symbol);
    });

    return Array.from(setTokenIn);
  }, [pairsList]);

  const handleChangeSlider = (_event: Event, value: number | number[]) => {
    setPercentage(value as number);
    if (maxBalanceAfterFee && maxBalanceAfterFee !== '0') {
      const newValue = decimalFlood((parseFloat(maxBalanceAfterFee) * (value as number)) / 100, 6);

      if (parseFloat(newValue) > parseFloat(maxBalanceAfterFee) && !BN(maxBalanceAfterFee).isEqualTo(balance || 0))
        handleChangeInput(
          'amount',
          formatNumber((parseFloat(maxBalanceAfterFee) * 99) / 100, {
            fractionDigits: 10,
          })?.toString() || '0',
        );
      else handleChangeInput('amount', newValue);
    }
  };

  const handleChangeTokenIn = (value: string) => {
    if (!pairsList) return;
    const selectPair = pairsList.find(item => item.token0.symbol === value);
    const newObj = isSwap
      ? { ...defaultBuyInfo, tokenOut: value, selectedToken: selectPair?.token1.symbol || 'USDC' }
      : { ...defaultBuyInfo, selectedToken: value, tokenOut: selectPair?.token1.symbol || 'USDC' };

    setBuyInfo(newObj);
    setPair(selectPair?.pair || pairsList[0].pair);
    setStrategyItems([defaultValueStrategy]);
  };

  const handleChangeTokenOut = (value: string) => {
    setBuyInfo({ ...defaultBuyInfo, tokenOut: value });
  };

  const handleTokenChange = (value: string, isBuyField: boolean) => {
    if (isSwap) {
      isBuyField ? handleChangeTokenIn(value) : handleChangeTokenOut(value);
    } else {
      isBuyField ? handleChangeTokenOut(value) : handleChangeTokenIn(value);
    }
  };

  const handleChangeBuyField = (value: string) => handleTokenChange(value, true);
  const handleChangeTokenAmount = (value: string) => handleTokenChange(value, false);

  const handleSwap = () => {
    setIsSwap(!isSwap);
    setBuyInfo({ ...defaultBuyInfo, amount: '', tokenOut: buyInfo.selectedToken, selectedToken: buyInfo.tokenOut });
    setStrategyItems([defaultValueStrategy]);
  };

  useEffect(() => {
    if (buyInfo.amount === '') {
      setPercentage(0);
      handleFieldError(undefined);
      setHelpText(undefined);
      return;
    }

    if (maxBalanceAfterFee && maxBalanceAfterFee !== '0')
      setPercentage(Math.round((parseFloat(buyInfo.amount) / parseFloat(maxBalanceAfterFee)) * 100));

    const { error } = validate(buyInfo.amount, rule, 'Amount');
    handleFieldError(error[0]);
    setHelpText(error[0]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buyInfo.amount, buyInfo.selectedToken]);

  return (
    <>
      <Stack sx={{ alignItems: { xs: 'flex-start', md: 'center' } }} alignItems="center">
        <Stack direction={'row'} sx={{ width: '100%', mb: 1, alignItems: 'center' }}>
          <Typography variant="h6" fontWeight={700} sx={{ fontSize: '18px', textAlign: 'center' }}>
            Buy
          </Typography>
          <SelectToken
            value={buyInfo.tokenOut}
            options={isSwap ? listTokenIn : listTokenOut}
            onChange={e => handleChangeBuyField(e.target.value as string)}
            sx={{
              maxWidth: '110px',
              '& .MuiTypography-root': {
                fontSize: '18px',
              },
              '& .MuiSelect-icon': {
                width: '20px',
                height: '20px',
              },
            }}
          />

          <Button
            variant="outlined"
            sx={{ height: 'fit-content', py: 0.5, px: 1.5, ml: 1, borderRadius: '10px' }}
            onClick={handleSwap}
          >
            Swap
          </Button>
        </Stack>

        <Box display="flex" justifyContent="space-between" sx={{ width: '100%', mb: 1 }}>
          <Typography>Amount</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Typography>Available:</Typography>
            <TypographyByStatus status={feeLoading} fontWeight={700}>
              {Number(maxBalanceAfterFee) > 0 ? decimalFlood(maxBalanceAfterFee, 6) : 0}
            </TypographyByStatus>
            <Tooltip title={"The user's available balance after all protocol and transaction fees are deducted."}>
              <IconButton sx={{ padding: 0 }}>
                <HelpOutlineIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <CustomTextField
          value={buyInfo.amount}
          onChange={e => {
            handleChangeInput('amount', e.target.value);
          }}
          sx={{ flex: 1, width: '100%' }}
          inputType="number"
          name="amount"
          InputProps={{
            endAdornment: (
              <FormControl sx={{ minWidth: '100px' }}>
                <Stack direction={'row'}>
                  <Divider orientation="vertical" variant="middle" flexItem sx={{ borderColor: '#ABCDED' }} />
                  <SelectToken
                    options={isSwap ? listTokenOut : listTokenIn}
                    value={buyInfo.selectedToken}
                    onChange={e => handleChangeTokenAmount(e.target.value as string)}
                  />
                </Stack>
              </FormControl>
            ),
          }}
          rule={rule}
          _onError={handleFieldError}
          helperText={helpText}
        />
      </Stack>

      <Slider
        size="small"
        value={percentage}
        valueLabelDisplay="auto"
        onChange={handleChangeSlider}
        min={0}
        max={100}
        marks={limitOrderMarks}
      />

      <Divider />
    </>
  );
};

export default AmountSection;
