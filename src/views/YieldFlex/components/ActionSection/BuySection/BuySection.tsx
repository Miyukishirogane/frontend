import { Divider, FormHelperText, Stack, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import CustomTextField from 'src/components/CustomForm/CustomTextField';
import LoadingButton from 'src/components/LoadingButton/LoadingButton';
import useGetTokenBalance from 'src/hooks/Liquidlity/useGetTokenBalance';
import useGetFarmingPrice from 'src/hooks/Projeet/useGetFarmingPrice';
import useAccount from 'src/hooks/useAccount';
import { defaultBuyInfo, defaultValueStrategy } from 'src/views/YieldFlex/constants';
import useSubmitLiquidity from 'src/views/YieldFlex/hooks/useSubmitLiquidity';
import {
  useBuyInfoAtomState,
  useIsSwapAtom,
  usePairsAtomState,
  useStrategyState,
} from 'src/views/YieldFlex/state/hooks';
import { projeetPortTokens } from 'src/views/YieldFlexDashboard/mapNameToken';
import { useChainId } from 'wagmi';
import AmountSection from './AmountSection';
import StrategySection from './StrategySection';

const BuySection = () => {
  const { address } = useAccount();
  const chainId = useChainId();
  const [strategyItems, setStrategyItems] = useStrategyState();
  const [pair] = usePairsAtomState();
  const { price } = useGetFarmingPrice(pair);
  const [isInvalid, setIsInvalid] = useState(false);
  const [buyInfo, setBuyInfo] = useBuyInfoAtomState();
  const [isSwap] = useIsSwapAtom();
  const { mutateAsync, isPending } = useSubmitLiquidity({
    onSuccess: () => {
      setBuyInfo({ ...defaultBuyInfo, selectedToken: buyInfo.selectedToken });
      setStrategyItems([defaultValueStrategy]);
    },
  });
  const tokenInfo = useMemo(() => {
    return projeetPortTokens[chainId][buyInfo.selectedToken] || projeetPortTokens[42161]['ETH'];
  }, [chainId, buyInfo.selectedToken]);

  const { data: balance } = useGetTokenBalance({
    addressToken: tokenInfo.address,
    decimal: tokenInfo.decimal,
    isNative: tokenInfo.tokenName === 'ETH',
    otherKey: [isSwap.toString()],
  });

  const totalAmountStrategy = useMemo(() => {
    return strategyItems.reduce((total, item) => total + Number(item.amount), 0);
  }, [strategyItems]);

  const isDisableSubmit = useMemo(() => {
    if (!address || isInvalid) return true;
    return !buyInfo.maxPrice || !buyInfo.stopLoss || totalAmountStrategy <= 0 || totalAmountStrategy > Number(balance);
  }, [address, balance, buyInfo.maxPrice, buyInfo.stopLoss, isInvalid, totalAmountStrategy]);

  const takeProfitRule = useMemo(() => {
    return {
      min: !isSwap
        ? {
            value: price || 0,
            message: 'Take profit cant lower than current price',
          }
        : undefined,
      max: isSwap
        ? {
            value: price || 0,
            message: 'Take profit cant higher than current price',
          }
        : undefined,
    };
  }, [isSwap, price]);

  const stopLossRule = useMemo(() => {
    return {
      max: !isSwap
        ? {
            value: price || 0,
            message: 'Stop loss cant higher than current price',
          }
        : undefined,
      min: isSwap
        ? {
            value: price || 0,
            message: 'Stop loss cant lower than current price',
          }
        : undefined,
    };
  }, [isSwap, price]);

  const handleChangeInput = (key: keyof typeof buyInfo, value: string) => {
    setBuyInfo({ ...buyInfo, [key]: value });
  };

  const handleFieldError = (err: string | undefined) => {
    setIsInvalid(err ? true : false);
  };

  const handleSubmit = async () => {
    await mutateAsync();
  };

  return (
    <Stack gap={1} p={4} color="#828282">
      <AmountSection handleFieldError={handleFieldError} handleChangeInput={handleChangeInput} balance={balance} />

      <Stack
        sx={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'left' }}
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography minWidth={'120px'}>Stop Loss</Typography>
        <CustomTextField
          value={buyInfo.stopLoss}
          inputType="number"
          onChange={e => handleChangeInput('stopLoss', e.target.value)}
          _onError={handleFieldError}
          resetFlag={!buyInfo.stopLoss.length}
          name="Stop loss"
          rule={stopLossRule}
          sx={{
            width: '100%',
            '& .MuiInputBase-root': {
              width: '130px',
              alignSelf: 'end',
            },
          }}
        />
      </Stack>

      <Stack
        sx={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'left' }}
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography minWidth={'120px'}>Take Profit</Typography>

        <CustomTextField
          value={buyInfo.maxPrice}
          inputType="number"
          onChange={e => handleChangeInput('maxPrice', e.target.value)}
          resetFlag={!buyInfo.maxPrice.length}
          name="Take profit"
          rule={takeProfitRule}
          sx={{
            width: '100%',
            '& .MuiInputBase-root': {
              width: '130px',
              alignSelf: 'end',
            },
            '& .MuiFormHelperText-root': {
              textAlign: 'end',
            },
          }}
        />
      </Stack>

      <Stack sx={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'left' }} alignItems="center" gap={1}>
        <Typography minWidth={120}>Expired</Typography>

        <CustomTextField
          value={buyInfo.expired}
          inputType="number"
          onChange={e => handleChangeInput('expired', e.target.value)}
          _onError={handleFieldError}
          name="Expired"
          rule={{
            min: 1,
          }}
          sx={{
            width: '100%',
            '& .MuiInputBase-root': {
              width: '130px',
              alignSelf: 'end',
            },
            '& .MuiFormHelperText-root': {
              textAlign: 'end',
            },
          }}
          InputProps={{
            endAdornment: (
              <Typography fontWeight={700} variant="body1" fontSize="20px">
                Day
              </Typography>
            ),
          }}
        />
      </Stack>

      <Divider sx={{ my: 2 }} />

      <StrategySection />

      {totalAmountStrategy > Number(balance) && <FormHelperText error>Insufficient balance</FormHelperText>}

      <LoadingButton
        loading={isPending}
        props={{ variant: 'gradient', disabled: isDisableSubmit }}
        onClick={handleSubmit}
      >
        Deposit
      </LoadingButton>
    </Stack>
  );
};

export default BuySection;
