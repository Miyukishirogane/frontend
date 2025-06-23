import { SvgComponent } from 'src/assets/icon';
import { Address } from 'viem';

export type TTokenInfo = {
  address: Address;
  decimal: number;
  icon: SvgComponent;
  tokenName?: string;
};
