import {
  IconETH,
  SvgComponent,
  IconTCV,
  IconUSDT,
  IconWBTC,
  IconBUSD,
  IconCAKE,
  IconUSDC,
  IconBNB,
  IconTrava,
  IconARB,
  IconWeETH,
  IconDAI,
} from 'src/assets/icon';
import { TAppChainId } from 'src/jotai/wallet/type';
import { Address } from 'viem';

export type TAppDenom =
  | 'SY-AaveUSDC'
  | 'aUSDC'
  | 'ezETH'
  | 'eEth'
  | 'dUSDC'
  | 'SY rsETH'
  | 'SY weETH'
  | 'SY Renzo ezETH'
  | 'AaveUSDC'
  | 'AaveWETH'
  | 'LP - aUSDC'
  | 'USDC (arb1)'
  | 'YT-aUSDC'
  | 'aArbUSDC'
  | 'weETH'
  | 'YT - aUSDC'
  | 'PT - aUSDC'
  | 'USDC(arb1)'
  | 'USDCARB1'
  | 'WBTC'
  | 'ETH'
  | 'wstETH'
  | 'WETH'
  | 'USDT'
  | 'BUSD'
  | 'CAKE'
  | 'Cake'
  | 'USDC'
  | 'WBNB'
  | 'TRAVA'
  | 'ARB'
  | 'BNB'
  | 'TCV'
  | 'PT - eEth'
  | 'PT - dUSDC'
  | 'PT - ezETH'
  | 'YT - eEth'
  | 'YT - dUSDC'
  | 'YT - ezETH'
  | 'PT - AaveUSDC'
  | 'YT - AaveUSDC'
  | 'PT - AaveWETH'
  | 'YT - AaveWETH'
  | 'LP - aUSDC'
  | 'LP - dUSDC'
  | 'LP - ezETH'
  | 'LP - eEth'
  | 'LP - AaveUSDC'
  | 'LP - AaveWETH'
  | 'TCP'
  | 'SY-AaveWETH'
  | 'DAI';

// USDCarb1N  === USDC (arb1)
export const mapTokenToIcon: { [key in TAppDenom]: SvgComponent } = {
  ETH: IconETH,
  wstETH: IconETH,
  WETH: IconETH,
  USDT: IconUSDT,
  BUSD: IconBUSD,
  CAKE: IconCAKE,
  Cake: IconCAKE,
  WBNB: IconBNB,
  USDC: IconUSDC,
  TRAVA: IconTrava,
  ARB: IconARB,
  BNB: IconBNB,
  WBTC: IconWBTC,
  TCV: IconTCV,
  USDCARB1: IconUSDC,
  'USDC(arb1)': IconUSDC,
  'PT - aUSDC': IconUSDC,
  'YT - aUSDC': IconUSDC,
  weETH: IconWeETH,
  aArbUSDC: IconUSDC,
  'YT-aUSDC': IconUSDC,
  'USDC (arb1)': IconUSDC,
  'LP - aUSDC': IconUSDC,
  AaveWETH: IconETH,
  AaveUSDC: IconUSDC,
  'SY rsETH': IconETH,
  'SY weETH': IconETH,
  'SY Renzo ezETH': IconETH,
  dUSDC: IconUSDC,
  eEth: IconETH,
  'PT - eEth': IconETH,
  'PT - dUSDC': IconUSDC,
  'PT - ezETH': IconETH,
  'YT - eEth': IconETH,
  'YT - dUSDC': IconUSDC,
  'YT - ezETH': IconETH,
  ezETH: IconETH,
  aUSDC: IconUSDC,
  'SY-AaveUSDC': IconUSDC,
  'PT - AaveUSDC': IconUSDC,
  'YT - AaveUSDC': IconUSDC,
  'PT - AaveWETH': IconETH,
  'YT - AaveWETH': IconETH,
  'LP - eEth': IconETH,
  'LP - dUSDC': IconUSDC,
  'LP - ezETH': IconETH,
  'LP - AaveUSDC': IconUSDC,
  'LP - AaveWETH': IconETH,
  TCP: IconTCV,
  'SY-AaveWETH': IconETH,
  DAI: IconDAI,
};

export const tokenInfo: {
  [k in TAppChainId]: { [t: string]: { address: Address; decimal: number; icon: SvgComponent } };
} = {
  '97': {
    BUSD: { address: '0xab1a4d4f1d656d2450692d237fdd6c7f9146e814', decimal: 18, icon: mapTokenToIcon.BUSD },
    CAKE: { address: '0xfa60d973f7642b748046464e165a65b7323b0dee', decimal: 18, icon: mapTokenToIcon.CAKE },
  },
  '42161': {},
  '421614': {
    WETH: { address: '0x6f933fB4cDD600056C6ec3cbcD20BcA519Fa261d', decimal: 18, icon: mapTokenToIcon.WETH },
    USDC: { address: '0x8d294256d858beAb208AdB60309AE04aEf99E93f', decimal: 6, icon: mapTokenToIcon.USDC },
    ARB: { address: '0xE6c7d5136Af78721Cf17d7B36e517e15f2608275', decimal: 18, icon: mapTokenToIcon.ARB },
    USDT: { address: '0x5Af7c16A7c2A8DD5126b1a3B4bF31094bdd395F5', decimal: 6, icon: mapTokenToIcon.USDT },
  },
  56: {}
};

export const marketList: { [k in TAppChainId]: string[] } = {
  '97': ['0x50b389f0D7d424ECf4AeA81EEb2F75D16d2C8CA8', '0xdd76f8C09673A531158f1Dd5c35F2674f994c9C2'],
  '421614': ['0x50b389f0D7d424ECf4AeA81EEb2F75D16d2C8CA8', '0xdd76f8C09673A531158f1Dd5c35F2674f994c9C2'],
  '42161': [
    '0xf9f9779d8ff604732eba9ad345e6a27ef5c2a9d6',
    '0x35f3db08a6e9cb4391348b0b404f493e7ae264c0',
    '0xed99fc8bdb8e9e7b8240f62f69609a125a0fbf14',
  ],
  '56': []
};

export const tokenPendleInfo: {
  [k in TAppChainId]: { [t: string]: { address: Address | ''; decimal: number; icon: SvgComponent } };
} = {
  '97': {
    BUSD: { address: '0xab1a4d4f1d656d2450692d237fdd6c7f9146e814', decimal: 18, icon: mapTokenToIcon.BUSD },
    CAKE: { address: '0xfa60d973f7642b748046464e165a65b7323b0dee', decimal: 18, icon: mapTokenToIcon.CAKE },
  },
  '42161': {
    LP: {
      address: '',
      decimal: 6,
      icon: mapTokenToIcon.USDC,
    },
    PT: {
      address: '',
      decimal: 6,
      icon: mapTokenToIcon.USDC,
    },
    SY: {
      address: '',
      decimal: 6,
      icon: mapTokenToIcon.USDC,
    },
    YT: {
      address: '',
      decimal: 6,
      icon: mapTokenToIcon.USDC,
    },
  },
  '421614': {
    YT: {
      address: '',
      decimal: 6,
      icon: mapTokenToIcon.USDC,
    },
    LP: {
      address: '',
      decimal: 6,
      icon: mapTokenToIcon.USDC,
    },
    PT: {
      address: '',
      decimal: 6,
      icon: mapTokenToIcon.USDC,
    },
    SY: {
      address: '',
      decimal: 6,
      icon: mapTokenToIcon.USDC,
    },
    WETH: {
      address: '0x6f933fB4cDD600056C6ec3cbcD20BcA519Fa261d',
      decimal: 18,
      icon: mapTokenToIcon.WETH,
    },
    USDC: {
      address: '0x8d294256d858beAb208AdB60309AE04aEf99E93f',
      decimal: 6,
      icon: mapTokenToIcon.USDC,
    },
    ARB: {
      address: '0xE6c7d5136Af78721Cf17d7B36e517e15f2608275',
      decimal: 18,
      icon: mapTokenToIcon.ARB,
    },
    USDT: {
      address: '0x5Af7c16A7c2A8DD5126b1a3B4bF31094bdd395F5',
      decimal: 6,
      icon: mapTokenToIcon.USDT,
    },
  },
  '56': {}
};

export const configTokenEarlySeed: {
  [k in TAppChainId]: { [t: string]: { address: Address | ''; decimal: number; icon: SvgComponent } };
} = {
  '97': {
    TCV: { address: '0xc7cc017cbae97e9fcf04feb10b2b855cc3809112', decimal: 18, icon: mapTokenToIcon.TCV },
    USDT: { address: '0x5Af7c16A7c2A8DD5126b1a3B4bF31094bdd395F5', decimal: 6, icon: mapTokenToIcon.USDT },
  },
  '42161': {
    TCV: { address: '0x8D5100f80e27d970ED86bcBc9D3BD7c69BC2CF40', decimal: 18, icon: mapTokenToIcon.TCV },
    USDT: { address: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9', decimal: 6, icon: mapTokenToIcon.USDT },
  },
  '421614': {
    TCV: { address: '0xc7cc017cbae97e9fcf04feb10b2b855cc3809112', decimal: 18, icon: mapTokenToIcon.TCV },
    USDT: { address: '0x5Af7c16A7c2A8DD5126b1a3B4bF31094bdd395F5', decimal: 6, icon: mapTokenToIcon.USDT },
  },
  '56': {}
};

export const marketTokensPendle: {
  [k in TAppChainId]: { [t: string]: { address: Address | ''; decimal: number; icon: SvgComponent } };
} = {
  '97': {
    BUSD: { address: '0xab1a4d4f1d656d2450692d237fdd6c7f9146e814', decimal: 18, icon: mapTokenToIcon.BUSD },
    CAKE: { address: '0xfa60d973f7642b748046464e165a65b7323b0dee', decimal: 18, icon: mapTokenToIcon.CAKE },
  },
  '42161': {
    eEth: {
      address: '0x35751007a407ca6feffe80b3cb397736d2cf4dbe',
      decimal: 18,
      icon: mapTokenToIcon.ETH,
    },
    aUSDC: {
      address: '0x724dc807b04555b71ed48a6896b6f41593b8c637',
      decimal: 6,
      icon: mapTokenToIcon.USDC,
    },
    ezETH: {
      address: '0x2416092f143378750bb29b79ed961ab195cceea5',
      decimal: 18,
      icon: mapTokenToIcon.ETH,
    },
    dUSDC: {
      address: '0x6dbd962b4f62d18f756b5de57425574c4b8228d6',
      decimal: 6,
      icon: mapTokenToIcon.USDC,
    },
  },
  '421614': {
    AaveUSDC: {
      address: '0x460b97bd498e1157530aeb3086301d5225b91216',
      decimal: 6,
      icon: mapTokenToIcon.USDC,
    },
    AaveWETH: {
      address: '0xf5f17EbE81E516Dc7cB38D61908EC252F150CE60',
      decimal: 18,
      icon: mapTokenToIcon.WETH,
    },
  },
  '56': {}
};
