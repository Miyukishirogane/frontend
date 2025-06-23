import { mapTokenToIcon } from 'src/constants/mapTokenToIcon';
import { TTokenInfo } from 'src/constants/tokenType';
import { TAppChainId } from 'src/jotai/wallet/type';
import { Address } from 'viem';

type TMapTokenInfo = {
  [k in TAppChainId]: {
    [t: string]: TTokenInfo;
  };
};

type TMapProjeetTradeAbi = {
  [k in TAppChainId]?: {
    PROJEET_TRADE_ABI_ADDRESS: Address;
  };
};

export const projeetTradeTokens: TMapTokenInfo = {
  56: {
    ETH: {
      address: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
      decimal: 18,
      icon: mapTokenToIcon.ETH,
      tokenName: 'ETH',
    },
    USDC: {
      address: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
      decimal: 6,
      icon: mapTokenToIcon.USDC,
      tokenName: 'USDC',
    },
    USDT: {
      address: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
      decimal: 6,
      icon: mapTokenToIcon.USDT,
      tokenName: 'USDT',
    },
    DAI: {
      address: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
      decimal: 18,
      icon: mapTokenToIcon.DAI,
      tokenName: 'DAI',
    },
    WBTC: {
      address: '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
      decimal: 8,
      icon: mapTokenToIcon.WBTC,
      tokenName: 'WBTC',
    },
    ARB: {
      tokenName: 'ARB',
      address: '0x912CE59144191C1204E64559FE8253a0e49E6548',
      decimal: 18,
      icon: mapTokenToIcon.ARB,
    },
  },
  42161: {
    ETH: {
      address: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
      decimal: 18,
      icon: mapTokenToIcon.ETH,
      tokenName: 'ETH',
    },
    USDC: {
      address: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
      decimal: 6,
      icon: mapTokenToIcon.USDC,
      tokenName: 'USDC',
    },
    USDT: {
      address: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
      decimal: 6,
      icon: mapTokenToIcon.USDT,
      tokenName: 'USDT',
    },
    DAI: {
      address: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
      decimal: 18,
      icon: mapTokenToIcon.DAI,
      tokenName: 'DAI',
    },
    WBTC: {
      address: '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
      decimal: 8,
      icon: mapTokenToIcon.WBTC,
      tokenName: 'WBTC',
    },
    ARB: {
      tokenName: 'ARB',
      address: '0x912CE59144191C1204E64559FE8253a0e49E6548',
      decimal: 18,
      icon: mapTokenToIcon.ARB,
    },
  },
  '421614': {},
  '97': {},
} as const;

export const projeetTradeAbi: TMapProjeetTradeAbi = {
  '56': {
    PROJEET_TRADE_ABI_ADDRESS: '0x1AC0083dDA51dEde7a4f9F35a78fc02f91a242e7',
  },
  '42161': {
    PROJEET_TRADE_ABI_ADDRESS: '0x1AC0083dDA51dEde7a4f9F35a78fc02f91a242e7',
  },
} as const;
