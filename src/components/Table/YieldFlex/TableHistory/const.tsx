import { TTableHeaderCustom } from '../../TableCustom/TableCustom';

export const statusOptions = [
  { value: 'All', label: 'All' },
  { value: 'Active', label: 'Active' },
  { value: 'Completed', label: 'Completed' },
  { value: 'Canceled', label: 'Cancelled' },
];

export const listTitleHeader: TTableHeaderCustom[] = [
  {
    title: 'Total Deposit',
    sx: { textAlign: 'center' },
  },

  {
    title: 'Total Return',
    sx: { textAlign: 'center', minWidth: '180px' },
  },
  {
    title: 'Average Entry Price',
    sx: { textAlign: 'center', minWidth: '180px' },
  },
  {
    title: 'PNL',
    sx: { textAlign: 'center', minWidth: '220px' },
  },
  {
    title: 'Next DCA round',
    sx: { textAlign: 'center', minWidth: '160px' },
  },
  {
    title: 'Progress',
  },
  {
    title: '',
    sx: { width: 'min-content' },
  },
];

export const itemPerPage = 5;

export type TMapPrice = Record<string, { price: number }>;
