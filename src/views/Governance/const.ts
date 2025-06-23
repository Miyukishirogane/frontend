import { mapTokenToIcon } from 'src/constants/mapTokenToIcon';
import { TTokenInfo } from 'src/constants/tokenType';

type TChainId = 56 | 97 | 42161 | 421614;

export const listChainIdSupport: TChainId[] = [97];

export const governanceTokenInfo: {
  [t: string]: TTokenInfo;
} = {
  TCV: {
    address: '0x73946Df19F6e11Eb1C96E45844826E6dC1A5FF9d',
    decimal: 18,
    icon: mapTokenToIcon.TCV,
    tokenName: 'TCV',
  },
};
