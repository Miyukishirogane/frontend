import { roundToNearestMinutes } from 'date-fns';
import { TAppDenom } from 'src/constants/mapTokenToIcon';
import { TAutoDCA, TBuyInfo } from './type';

export const defaultBuyInfo: TBuyInfo = {
  amount: '',
  selectedToken: 'ETH',
  minPrice: '',
  maxPrice: '',
  stopLoss: '',
  expired: '1',
  tokenOut: 'USDC',
};

export const defaultValueStrategy = {
  minPrice: '',
  maxPrice: '',
  amount: '',
  selectedToken: 'ETH',
  isCreateByUser: true,
};

export type TKeyPairsData = { token1: TAppDenom; token2: TAppDenom; value: string };

export const defaultValueAutoDCA: TAutoDCA = {
  amount: '',
  totalRound: '',
  totalAmount: '',
  recurringCycle: 'hour',
  timeStart: roundToNearestMinutes(new Date(), { nearestTo: 30, roundingMethod: 'ceil' }).toString(),
  tokenInSelect: 'USDC',
  tokenOutSelect: 'ETH',
};

export const pairsData: Record<string, TKeyPairsData> = {
  'ETH/USDC': { token1: 'ETH', token2: 'USDC', value: 'ETH/USDC' },
  'WBTC/USDC': { token1: 'WBTC', token2: 'USDC', value: 'WBTC/USDC' },
  'ARB/USDC': { token1: 'ARB', token2: 'USDC', value: 'ARB/USDC' },
  'USDC/ETH': { token1: 'USDC', token2: 'ETH', value: 'USDC/ETH' },
};

export const listPairs = ['ETH/USDC', 'WBTC/USDC', 'ARB/USDC', 'USDC/ETH'];
export const autoLimitOrderOptions = ['ETH', 'WBTC', 'ARB', 'USDC'];

export const dcaStatus: { [key: number]: string } = {
  0: 'Active',
  1: 'Cancelled',
  2: 'Completed',
};

export const timeBySec: { [key: string]: number } = {
  hour: 3600,
  day: 86400, // 24 * 60 * 60
  week: 86400 * 7,
  month: 2592000, // 30 * 24 * 60 * 60
};
