import { IToggleButton } from 'src/components/ToggleButtonGroupCustom/ToggleButtonGroupCustom';

export const rangeTimeOptions: { label: string; value: number }[] = [
  {
    label: '1 Week',
    value: 7 * 24 * 3600,
  },
  {
    label: '1 Month',
    value: 30 * 24 * 3600,
  },
  {
    label: '3 Months',
    value: 3 * 30 * 24 * 3600,
  },
  {
    label: '6 Months',
    value: 6 * 30 * 24 * 3600,
  },
  {
    label: '1 Year',
    value: 365 * 24 * 3600,
  },
  {
    label: '4 Years',
    value: 4 * 365 * 24 * 3600,
  },
];

export const tabOptionsInLockTCP: IToggleButton[] = [
  {
    value: 'lock_tcp',
    label: 'Lock TCP',
  },
  {
    value: 'withdraw',
    label: 'Withdraw',
  },
];

export const btnGroupInLockTCP: IToggleButton[] = [
  {
    value: 'increase_amount',
    label: 'Increase Amount',
  },
  {
    value: 'change_unlock_time',
    label: 'Change Unlock Time',
  },
];
