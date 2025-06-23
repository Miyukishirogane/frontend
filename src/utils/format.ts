import { SxProps, Theme } from '@mui/material';
import { SystemStyleObject } from '@mui/system';
import BigNumber from 'bignumber.js';
import { format as fd } from 'date-fns';
import { FormatNumberOptions } from 'src/global.config';
import { TPendleState } from 'src/jotai/pendle/type';
import { isNumeric } from '.';

/**
 *
 * @param address The input address
 * @param first The number of characters will be taken from begin of the address. This value cannot be negative
 * @param last The number of characters will be taken from last of the address. This value cannot be negative
 * @returns
 */
export function formatAddress(address: string, first = 6, last = 4): string {
  if (first < 0 || last <= 0) {
    throw new Error('Invalid parameter(s)');
  }
  return address.slice(0, first) + '...' + address.slice(-last);
}

/**
 * Format a number
 * @param {*} number - The number needs to format
 * @param {FormatNumberOptions} options - Includes options to customize the results returned
 * @returns A string representing a number in formatted, `option.fallback` will be returned if `number` is invalid
 */
export function formatNumber(number: any, options?: FormatNumberOptions): string | FormatNumberOptions['fallback'] {
  const { fallback = '0.00', fractionDigits, delimiter, padZero, prefix, suffix, onlyPositive } = options ?? {};

  if (!isNumeric(number) || Number(number) === 0) {
    return fallback;
  }

  let num: number | string = parseFloat(number);
  if (onlyPositive && num < 0) {
    num = 0;
  }
  if (isNumeric(fractionDigits)) {
    num = num.toFixed(fractionDigits);
  }
  if (!padZero) {
    num = Number(num); // remove last zeros
  }
  return (prefix ?? '') + numberWithCommas(num, delimiter) + (suffix ?? '');
}

/**
 * Compact large number
 * @param {*} n The number
 * @param {Number} fractionDigits Number of digits after the decimal point
 */
export function compactNumber(n: number | string, fractionDigits = 1) {
  if (!isNumeric(n)) {
    // comment error
    // throw new Error('Must provide a correct number');
    return 0;
  }
  const suffixes = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp'];
  const suffixNum = Math.floor((('' + parseInt('' + n)).length - 1) / 3);

  let shortValue = (Number(n) / Math.pow(1000, suffixNum)).toPrecision(fractionDigits + 1);

  if (Number(shortValue) % 1 !== 0) {
    shortValue = Number(shortValue).toFixed(fractionDigits);
  }

  return Number(shortValue).toString() + suffixes[suffixNum];
}

export function numberWithCommas(x: number | string, delimiter = ','): string {
  if (!isNumeric(x)) {
    return x.toString();
  }
  const [naturalPart, decimalPart] = x.toString().split('.');
  let out = naturalPart.replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
  if (decimalPart) {
    out += '.' + decimalPart;
  }
  return out;
}

/**
 * Decimal adjustment of a number.
 *
 * @param {String}  type  The type of adjustment.
 * @param {Number}  value The number.
 * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
 * @returns {Number} The adjusted value.
 */
export function decimalAdjust(type: 'ceil' | 'round' | 'floor', value: any, exp?: any): any {
  // If the exp is undefined or zero...
  if (typeof exp === 'undefined' || +exp === 0) {
    return Math[type](value);
  }
  value = +value;
  exp = +exp;
  // If the value is not a number or the exp is not an integer...
  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
    return NaN;
  }
  // If the value is negative...
  if (value < 0) {
    return -decimalAdjust(type, -value, exp);
  }
  // Shift
  value = value.toString().split('e');
  value = Math[type](+(value[0] + 'e' + (value[1] ? +value[1] - exp : -exp)));
  // Shift back
  value = value.toString().split('e');
  return +(value[0] + 'e' + (value[1] ? +value[1] + exp : exp));
}

export type TDateFormat =
  | 'MMM dd, h:mm'
  | 'MMM dd, h'
  | 'MMM dd, h:mm a'
  | 'MMM dd yyyy, h:mm a'
  | 'MMMM dd, YYY'
  | 'dd MMM yyyy'
  | 'dd MMM'
  | 'dd/MM/yyyy'
  | 'MMM dd'
  | 'MMM dddd, h:mm a'
  | 'MMM dd, HH'
  | 'MMM dd, H'
  | 'MMM dd, H:mm'
  | 'dd/MM';

export const formatDate = (date: Date | number, type: string) => {
  try {
    return fd(date, type);
  } catch (err) {
    // console.log(`date = ${date} ==>`, err);
    return 'Invalid Date';
  }
};

// format big numbers
export function formatBigNumber(value?: string) {
  if (!value) return '0';
  const BN = new BigNumber(value);

  // Kiểm tra xem giá trị có phải là 0 không
  if (BN.isZero()) {
    return '0'; // Trả về '0' nếu giá trị bằng 0
  }

  // Nếu không phải 0, chia cho 1 triệu và định dạng với 6 chữ số thập phân
  return BN.dividedBy('1e6').toFixed(6);
}

// time to date
export function formatDuration(seconds: number) {
  const secondsInMinute = 60;
  const secondsInHour = 3600;
  const secondsInDay = 86400; // 24 * 60 * 60
  const secondsInMonth = 2592000; // 30 * 24 * 60 * 60

  const months = Math.floor(seconds / secondsInMonth);
  const remainingSecondsAfterMonths = seconds % secondsInMonth;
  const days = Math.floor(remainingSecondsAfterMonths / secondsInDay);
  const remainingSecondsAfterDays = remainingSecondsAfterMonths % secondsInDay;
  const hours = Math.floor(remainingSecondsAfterDays / secondsInHour);
  const remainingSecondsAfterHours = remainingSecondsAfterDays % secondsInHour;
  const minutes = Math.floor(remainingSecondsAfterHours / secondsInMinute);
  const secs = remainingSecondsAfterHours % secondsInMinute;

  // Build the formatted duration string
  let durationString = '';

  if (months > 0) {
    durationString += months == 1 ? '1 month' : `${months} months `;
  }
  if (days > 0) {
    durationString += days == 1 ? '1 day' : `${days} days `;
  }
  if (hours > 0) {
    durationString += hours == 1 ? '1 hour' : `${hours} hours `;
  }
  if (minutes > 0) {
    durationString += minutes == 1 ? '1 minute' : `${minutes} minutes `;
  }
  if (secs > 0 || durationString === '') {
    // Include seconds if it's 0 but no other units are present
    durationString += secs == 1 ? '1 second' : `${secs} seconds`;
  }

  return durationString.trim();
}

export const formatMinusNumber = (number: number | string, prefix?: string) => {
  const target = Number(number);

  if (isNaN(target)) return `${prefix || ''}0`;
  if (target >= 0) return `${prefix || ''}${target}`;

  const absNumber = Math.abs(target);

  return `-${prefix || ''}${absNumber}`;
};

export function mergeDataPendle(
  pendle: TPendleState[],
  interest: {
    [key: string]: {
      ptPosition: string;
      ytPosition: string;
      lpPosition: string;
      syInterest: string;
      assetInterest: string;
    };
  },
): TPendleState[] {
  return pendle.map(item => {
    const interestInfo = interest[item.marketAddress];

    // Merge interest data with the pendle item data
    const mergedItem: TPendleState = {
      ...item,
      syInterest: interestInfo ? interestInfo.syInterest : 'NaN',
      assetInterest: interestInfo ? interestInfo.assetInterest : 'NaN',
    };

    return mergedItem;
  });
}

export function mergeDataPendlePortfolio(
  pendle: TPendleState[],
  interest: {
    [key: string]: {
      ptPosition: string;
      ytPosition: string;
      lpPosition: string;
      syInterest: string;
      assetInterest: string;
    };
  },
): TPendleState[] {
  return pendle.map(item => {
    const interestInfo = interest[item.marketAddress];

    // Merge interest data with the pendle item data
    const mergedItem: TPendleState = {
      ...item,
      ...interestInfo,
      syInterest: interestInfo ? interestInfo.syInterest : 'NaN',
      assetInterest: interestInfo ? interestInfo.assetInterest : 'NaN',
    };

    return mergedItem;
  });
}

export function sumArrayValues(arr: { assetInterest: string | undefined }[]): string {
  // toal
  const sum = arr.reduce((total, item) => {
    return total + Number(item?.assetInterest !== 'NaN' && item?.assetInterest ? item.assetInterest : '0');
  }, 0);

  return sum.toString();
}

export function mergeSx(sxs: Array<boolean | SxProps<Theme> | undefined>): SxProps<Theme> {
  let result: Array<boolean | SystemStyleObject<Theme> | ((theme: Theme) => SystemStyleObject<Theme>)> = [];
  for (const sx of sxs) {
    if (sx) {
      if (Array.isArray(sx))
        result = result.concat(
          sx as ReadonlyArray<boolean | SystemStyleObject<Theme> | ((theme: Theme) => SystemStyleObject<Theme>)>,
        );
      else result.push(sx as SystemStyleObject<Theme> | ((theme: Theme) => SystemStyleObject<Theme>));
    }
  }
  return result;
}

export const formatStringNumber = (str: string): string => {
  if (/^0\.$/.test(str)) {
    return str;
  }

  if (/^\d+$/.test(str)) {
    return str.replace(/^0+/, '') || '0';
  }

  if (/^\d*\.\d+$/.test(str)) {
    const [integerPartRaw, decimalPart] = str.split('.');

    let integerPart = integerPartRaw.replace(/^0+/, '');

    if (integerPart === '') {
      integerPart = '0';
    }

    return `${integerPart}.${decimalPart}`;
  }

  return str;
};

export const formatRankText = (rank: number): string => {
  if (rank === 1) {
    return '1st';
  }

  if (rank === 2) {
    return '2nd';
  }

  if (rank === 3) {
    return '3rd';
  }

  return `${rank}th`;
};

export const toFixedLargeNumbers = (value: number, decimal?: number) => {
  if (value !== 0 && !value) return '0';
  if (value === 0) return value.toString();

  return (value.toString().match(/e/) ? Number(value.toString().match(/[^e]*/)?.[0]) : value).toFixed(decimal || 4);
};

export function decimalFlood(num: string | number, precision: number) {
  const _precision = BigNumber('10').pow(precision);
  const _bigNumber = BigNumber(num).multipliedBy(_precision);
  return _bigNumber.integerValue(BigNumber.ROUND_FLOOR).div(_precision).toFixed();
}
