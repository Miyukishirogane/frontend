import { SvgComponent } from 'src/assets/icon';
import { Address } from 'viem';

export type TBuyInfo = {
  amount: string;
  selectedToken: string;
  minPrice: string;
  maxPrice: string;
  stopLoss: string;
  expired: string;
  tokenOut: string;
};

export type TStrategyItem = {
  minPrice: string;
  maxPrice: string;
  amount: string;
  selectedToken: string;
  isCreateByUser?: boolean;
};

export type TAutoDCA = {
  amount: string;
  tokenInSelect: string;
  tokenOutSelect: string;
  totalRound: string;
  totalAmount: string;
  recurringCycle: string;
  timeStart: string | null;
};

export type TTokenProjeetInfo =
  | {
      address: Address;
      decimal: number;
      icon: SvgComponent;
      tokenName?: string;
    }
  | undefined;
