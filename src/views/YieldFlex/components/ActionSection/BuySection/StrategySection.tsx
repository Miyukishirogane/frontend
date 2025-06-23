import AddIcon from '@mui/icons-material/Add';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Button, IconButton, Stack, Typography } from '@mui/material';
import { AxiosError } from 'axios';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import CustomTextField from 'src/components/CustomForm/CustomTextField';
import RangeInput from 'src/components/CustomForm/RangeInput';
import { getFarmingStrategy } from 'src/services/api/yieldFlex/farmingStrategy';
import { defaultValueStrategy } from 'src/views/YieldFlex/constants';
import {
  useBuyInfoAtomState,
  useIsSwapAtom,
  usePairsAtomValue,
  useStrategyState,
} from 'src/views/YieldFlex/state/hooks';
import { TStrategyItem } from 'src/views/YieldFlex/type';
import { getStrategyItem } from 'src/views/YieldFlex/utils';
import { useDebounce } from 'use-debounce';
import LoadingStrategyItem from './LoadingStrategyItem';
import { formatNumber } from 'src/utils/format';
import { mapTokenToIcon } from 'src/constants/mapTokenToIcon';
import Help from '@mui/icons-material/Help';
import { TAppDenom } from 'src/constants/mapTokenToIcon';

const StrategySection = () => {
  const [buyInfo] = useBuyInfoAtomState();
  const [strategyItems, setStrategyItems] = useStrategyState();
  const pair = usePairsAtomValue();
  const [debounceAmountValue] = useDebounce(buyInfo.amount, 500);
  const [debounceMaxPriceValue] = useDebounce(buyInfo.maxPrice, 500);
  const [debounceDateValue] = useDebounce(buyInfo.expired, 500);
  const [isLoadingStrategy, setIsLoadingStrategy] = useState(false);
  const [isSwap] = useIsSwapAtom();

  const isHasSuggestion = useMemo(() => {
    return strategyItems.some(item => !item.isCreateByUser);
  }, [strategyItems]);

  const handleChangeStrategy = (index: number, value: string, key: keyof (typeof strategyItems)[0]) => {
    const cloneArr = strategyItems.map((item, strategyItemsIndex) => {
      if (index === strategyItemsIndex) {
        return { ...item, [key]: value };
      }

      return item;
    });

    setStrategyItems(cloneArr);
  };

  const handleChangeRangeInput = (value1: string, value2: string, index: number) => {
    const cloneArr = strategyItems.map((item, strategyItemsIndex) => {
      if (index === strategyItemsIndex) {
        return { ...item, minPrice: value1, maxPrice: value2, isCreateByUser: true };
      }

      return item;
    });

    setStrategyItems(cloneArr);
  };

  const handleRemoveItem = (index: number) => {
    if (strategyItems.length === 1) return;
    const newArr = [...strategyItems];
    newArr.splice(index, 1);

    setStrategyItems(newArr);
  };

  const handleAddItem = () => {
    setStrategyItems(prev => [...prev, defaultValueStrategy]);
  };

  const handleGetStrategy = useCallback(async () => {
    const { maxPrice: buyInfoMaxPrice, amount: buyInfoAmount, selectedToken, expired } = buyInfo;
    if (Number(buyInfoMaxPrice) > 0 && Number(buyInfoAmount) > 0) {
      setIsLoadingStrategy(true);

      try {
        const resp = await getFarmingStrategy(0, Number(buyInfoMaxPrice), pair, expired, isSwap);
        const listSuggestion: TStrategyItem[] = resp.map(item => ({
          minPrice: item.minPrice.toFixed(8),
          maxPrice: item.maxPrice.toFixed(8),
          amount:
            formatNumber(Number(item.ratio) * Number(buyInfoAmount), {
              fractionDigits: 6,
              fallback: 0,
            })?.toString() || '',
          selectedToken: selectedToken,
        }));

        const listCreateByUser = getStrategyItem([...strategyItems].filter(item => item.isCreateByUser));
        setStrategyItems([...listCreateByUser, ...listSuggestion]);
      } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        console.log('🚀 ~ handleGetStrategy ~ error:', err.response?.data.message);
        toast.error(<Typography sx={{ textTransform: 'capitalize' }}>{err.response?.data.message}</Typography>);
      } finally {
        setIsLoadingStrategy(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceAmountValue, debounceMaxPriceValue, debounceDateValue]);

  useEffect(() => {
    handleGetStrategy();
  }, [handleGetStrategy]);

  return (
    <Stack>
      <Stack direction={'row'} alignItems="center" justifyContent="space-between">
        <Typography>Suggestion Strategy</Typography>
        <Button variant="outlined" sx={{ py: 1, height: '36px' }} onClick={handleAddItem}>
          <Stack direction="row" gap={1}>
            <AddIcon />
            <Typography>Add</Typography>
          </Stack>
        </Button>
      </Stack>

      <Stack gap={1}>
        {strategyItems.map((strategyItem, index) => {
          const { minPrice, maxPrice } = strategyItem;
          const IconToken = mapTokenToIcon[buyInfo.selectedToken as TAppDenom] ?? Help;

          return (
            <Stack
              sx={{ flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' } }}
              gap={1}
              key={index}
            >
              <Stack flex={2} sx={{ width: { xs: '100%', sm: 'unset' } }}>
                <Typography variant="body2" mb={1}>
                  Price range
                </Typography>
                <RangeInput
                  value={[minPrice, maxPrice]}
                  wrapperStyle={{ minHeight: '52px', flex: 1 }}
                  onChange={(valueInput1, valueInput2) => {
                    handleChangeRangeInput(valueInput1, valueInput2, index);
                    return;
                  }}
                />
              </Stack>

              <Stack flex={1} sx={{ width: { xs: '100%', sm: 'unset' } }}>
                <Typography variant="body2" mb={1}>
                  Amount
                </Typography>
                <Stack direction="row">
                  <CustomTextField
                    value={strategyItem.amount}
                    onChange={e => handleChangeStrategy(index, e.target.value, 'amount')}
                    inputType="number"
                    name="amount"
                    sx={{
                      flex: 1,
                      width: { lg: '200px', xl: '150px' },
                      height: 'unset',
                      '& input': {
                        fontSize: '16px',
                        fontWeight: 700,
                        padding: '0px !important',
                        pl: '10px !important',
                        pr: '6px !important',
                      },
                    }}
                    InputProps={{
                      endAdornment: <IconToken sx={{ fontSize: '20px' }} />,
                    }}
                  />
                  <Stack justifyContent="center">
                    <IconButton onClick={() => handleRemoveItem(index)}>
                      <RemoveCircleIcon />
                    </IconButton>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          );
        })}
        {isLoadingStrategy ? <LoadingStrategyItem /> : null}
      </Stack>

      {isHasSuggestion && (
        <Stack mt={2}>
          <Typography variant="body2">
            (<span style={{ color: '#FF0000' }}>*</span>) The strategy is estimated based on the price in{' '}
            {Number(buyInfo.expired) > 1 ? `${buyInfo.expired} days` : '1 day'}.
          </Typography>
        </Stack>
      )}
    </Stack>
  );
};

export default StrategySection;
