import { IToggleButton } from 'src/components/ToggleButtonGroupCustom/ToggleButtonGroupCustom';

export const autoDcaTokenOutOptions = ['ETH', 'ARB', 'WBTC', 'USDC', 'USDT'];

export const autoDcaTokenInOptions = ['USDC', 'USDT'];
export const sellDcaTokenInOptions = ['ETH', 'ARB', 'WBTC'];

export const recurringCycleData: IToggleButton[] = [
  {
    value: 'hour',
    label: '1 Hour',
  },
  {
    value: 'day',
    label: '1 Day',
  },
  {
    value: 'week',
    label: '1 Week',
  },
  {
    value: 'month',
    label: '1 Month',
  },
];

export const limitOrderMarks = [
  {
    value: 0,
    label: '0%',
  },
  {
    value: 25,
    label: '25%',
  },
  {
    value: 50,
    label: '50%',
  },
  {
    value: 75,
    label: '75%',
  },
  {
    value: 100,
    label: '100%',
  },
];
