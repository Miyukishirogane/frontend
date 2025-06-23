import BigNumber from 'bignumber.js';
import { Buffer } from 'buffer';
import { toast } from 'react-toastify';
import { BaseError } from 'wagmi';

/**
 * Build exact url to resource in public folder
 * @param pathToPublicResource The path to the resource in public folder
 * @returns A string represents an url to resource
 */
export function buildPathToPublicResource(pathToPublicResource: string): string {
  if (pathToPublicResource[0] === '/') pathToPublicResource = pathToPublicResource.slice(1);
  return `${process.env.PUBLIC_URL}/${pathToPublicResource}`;
}

export function isNumeric(num: any) {
  return !isNaN(num) && !isNaN(parseFloat(num));
}

/**
 * Cast a value to BigNumber instance.
 * @param value - The value
 * @returns An instance of BigNumber or NaN if value isn't a valid number.
 */
export function BN(value: any): BigNumber {
  return new BigNumber(value);
}

export function getErrorMessage(error: any): string | undefined {
  return error ? error.reason ?? error.message : undefined;
}

export function handleError(error: any, notify?: (msg: string) => void) {
  const msg = getErrorMessage(error);
  if (msg && typeof notify === 'function') {
    notify(msg);
  }
}

export function toUSD(amount?: string | number, price?: string | number): string {
  return BN(amount).times(BN(price)).toString();
}

export function toAPY(apr: string | number): string {
  const bigNumberApr = BN(apr);
  if (bigNumberApr.isGreaterThan(100)) {
    return bigNumberApr.toString();
  }
  if (bigNumberApr.isLessThan(0)) {
    const _n = BN(1).plus(bigNumberApr.abs().div(BN(513131700))); // 5131317 = blockPerYear * 100 //  apr la dang %
    if (_n.isGreaterThan(5000)) {
      return 'Infinity';
    }
    return (
      '-' +
      BN(Math.pow(_n.toNumber(), 5131317) - 1)
        .times(100)
        .toString()
    );
  } else {
    const _n = BN(1).plus(bigNumberApr.div(BN(513131700))); // 5131317 = blockPerYear * 100 //  apr la dang %
    if (_n.isGreaterThan(5000)) {
      return 'Infinity';
    }
    return BN(Math.pow(_n.toNumber(), 5131317) - 1)
      .times(100)
      .toString();
  }
}

export function copyTextToClipboard(text: string, showToast?: boolean) {
  navigator.clipboard.writeText(text);

  if (showToast) {
    toast.success('Copy success');
  }
}

export function throttle(callback: (...args: any[]) => any, delay: number = 1000): (...args: any[]) => void {
  let shouldWait: boolean = false;

  return (...args: any[]) => {
    if (shouldWait) return;

    callback(...args);
    shouldWait = true;
    setTimeout(() => {
      shouldWait = false;
    }, delay);
  };
}

export function decodeBase64(text: string) {
  return JSON.parse(Buffer.from(text, 'base64').toString());
}

export function encodeToBase64(data: any) {
  return Buffer.from(JSON.stringify(data)).toString('base64');
}

export const sleep = (milisecond: number) => new Promise(resolve => setTimeout(resolve, milisecond));

export function readErrorTransaction(err: any): { text: string; type: 'shortMess' | 'metaMess' | 'unknow' }[] {
  const mess: { text: string; type: 'shortMess' | 'metaMess' | 'unknow' }[] = [];
  if ((err as BaseError).shortMessage) {
    mess.push({ text: err.shortMessage, type: 'shortMess' });
  }
  const metaMess = (err as BaseError).metaMessages;
  if (metaMess) {
    mess.push(
      ...metaMess.map(
        item => ({ text: item, type: 'metaMess' } as { text: string; type: 'shortMess' | 'metaMess' | 'unknow' }),
      ),
    );
  }
  if (mess.length > 0) {
    return mess;
  }
  return [{ text: (err as Error).message, type: 'unknow' }];
}

export function secondsToMonths(seconds: number): string {
  const daysInMonth: number = 30.44;

  const secondsInDay: number = 86400;

  const secondsInMonth: number = daysInMonth * secondsInDay;
  const months: number = seconds / secondsInMonth;

  return months.toFixed(0);
}

export function secondsToMonthsAndDays(seconds: number): string {
  const daysInMonth: number = 30.44;
  const secondsInDay: number = 86400;
  const secondsInMonth: number = daysInMonth * secondsInDay;

  // Tính số ngày từ số giây
  const days = seconds / secondsInDay;

  if (days > 31) {
    // Tính số tháng từ số giây
    const months = seconds / secondsInMonth;
    return `${Math.floor(months)} month${months >= 2 ? 's' : ''}`;
  } else {
    // Trả về số ngày nếu nhỏ hơn hoặc bằng 31 ngày
    return `${Math.floor(days)} day${days >= 2 ? 's' : ''}`;
  }
}

export function secondsToFormattedDays(seconds: number) {
  const secondsInDay = 86400; // 24 * 60 * 60

  // Tính số ngày nguyên
  const days = Math.floor(seconds / secondsInDay);

  // Định dạng kết quả với từ "day" hoặc "days"
  return days === 1 ? '1 day' : `${days} days`;
}

export const camelize = (str: string) => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
};

export const regexConfigValue = (input: string) => input.replace(/[^0-9.]|(\..*?)\..*/g, (match, group) => group || '');

export const isFunction = (f: unknown): f is (...args: unknown[]) => unknown => {
  return typeof f === 'function';
};
