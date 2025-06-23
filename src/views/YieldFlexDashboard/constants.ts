import { IconAaveV3Pool, IconCompoundV3Pool, SvgComponent } from 'src/assets/icon';

export const listPoolInfo: Record<string, { name: string; icon: SvgComponent }> = {
  'aave-v3': {
    name: 'aave-v3',
    icon: IconAaveV3Pool,
  },
  'compound-v3': {
    name: 'compound-v3',
    icon: IconCompoundV3Pool,
  },
};
