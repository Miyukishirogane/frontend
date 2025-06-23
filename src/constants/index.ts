import { Address } from 'viem';

export const localKey = { chainConnected: 'ChainConnected', walletConnected: 'WalletConnected' };

export const Err_NotConnectWallet = new Error('You have not connected your wallet yet!');

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000' as Address;

// Pendle market for test
export const marketInfoTest = {
  '0xf9f9779d8ff604732eba9ad345e6a27ef5c2a9d6': {
    name: 'SY ETHx-BbAWeth_BalancerLP Aura',
    symbol: 'SY-ETHx-BbAWeth_BalancerLP Aura',
    doCacheIndex: true,
    expiry: 1727308800,
    scalarRoot: '43572533013000000000',
    initialRateAnchor: '1059268791000000000',
    SY: '0xbA72de8B5B56552e537994DddFe82e7ce43409f5',
    PT: '0x880cC97A7222C6b7Ed77232143a220fd2dcB3004',
    YT: '0x2C4413364623d6AC247E0AF629cEC8ACc596f646',
  },
};

// TCV_PASSWORD="KOLf1BCCDbwmUKwHL4,Useri77JasY589jSLAo,0"
export const URL_HASH: { [key: string]: string } = {
  '1': 'VENWIEtPTCBzYWxl', // TCV KOL sale
  '2': 'VENWIGNvbW11bml0eSBzYWxl', // TCV community sale
  '3': 'VENWIHB1YmxpYyBzYWxl', // TCV public sale
};

export const URL_TESTNET = 'https://sepolia-rollup.arbitrum.io/rpc';

export type Network = {
  chainId: number;
  chainName: string;
  blockExplorerUrls: Array<string>;
  iconUrls: Array<string>;
  rpcUrls: Array<string>;
  nativeCurrency: { name: string; decimals: number; symbol: string };
};

export type Networks = {
  arbSepolia: Network;
  bscTestnet2: Network;
  bscTestnet: Network;
  bscMainnet: Network;
  arbMainnet: Network;
};

export const NETWORKS: Networks = {
  bscTestnet: {
    chainId: 97,
    chainName: 'Binance Smart Chain Testnet',
    blockExplorerUrls: ['https://testnet.bscscan.com/'],
    iconUrls: [],
    rpcUrls: [],
    nativeCurrency: { name: 'BNB', decimals: 18, symbol: 'BNB' },
  },
  bscTestnet2: {
    chainId: 98,
    chainName: 'Binance Smart Chain Testnet',
    blockExplorerUrls: ['https://testnet.bscscan.com/'],
    iconUrls: [],
    rpcUrls: [],
    nativeCurrency: { name: 'BNB', decimals: 18, symbol: 'BNB' },
  },
  bscMainnet: {
    chainId: 56,
    chainName: 'Binance Smart Chain Mainnet',
    blockExplorerUrls: ['https://bscscan.com/'],
    iconUrls: [],
    rpcUrls: [],
    nativeCurrency: { name: 'BNB', decimals: 18, symbol: 'BNB' },
  },
  arbSepolia: {
    chainId: 421614,
    chainName: 'Arbitrum Sepolia',
    blockExplorerUrls: ['https://sepolia.arbiscan.io/'],
    iconUrls: [],
    rpcUrls: [],
    nativeCurrency: { name: 'ETH', decimals: 18, symbol: 'ETH' },
  },
  arbMainnet: {
    chainId: 42161,
    chainName: 'Arbitrum Mainnet',
    blockExplorerUrls: ['https://arbitrum-mainnet.infura.io/v3/9ef82335298241f28950f71f0ab0e573'],
    iconUrls: [],
    rpcUrls: [],
    nativeCurrency: { name: 'ETH', decimals: 18, symbol: 'ETH' },
  },
};

export const listAddr = {
  [NETWORKS.arbSepolia.chainId]: {
    URL: 'https://arbitrum-sepolia.core.chainstack.com/b98114b0470ff24a073e0b056fcf6b05',
    PUBLIC_KEY: '0x595622cBd0Fc4727DF476a1172AdA30A9dDf8F43',
    WETH_ADDRESS: '0x6f933fB4cDD600056C6ec3cbcD20BcA519Fa261d',
    USDC_ADDRESS: '0x8d294256d858beAb208AdB60309AE04aEf99E93f',
    ARB_ADDRESS: '0xE6c7d5136Af78721Cf17d7B36e517e15f2608275',
    USDT_ADDRESS: ZERO_ADDRESS,
    TREASURY_ADDRESS: '0x411ff9D19CBFf77a2a86b5B5d1957B43E31675ec',
    PENDLE_YIELD_CONTRACT_FACTORY_V2: '0x811afA15E8FE4C6a64c032aCF422E2871f18BA75',
    PENDLE_MARKET_FACTORY_V3: '0x0488a33536fA3A098C87c15509508288aAB0cfA9',
    ROUTER_ADDRESS: '0xF23ff397F5055d5656705A9B5C5B72154fE7E006',
    MULTI_CALL_ADDRESS: '0x69ad17ad18F54b4DFD2540b07D63a8d1F1492676',
    UNISWAP_V3_FACTORY: '0x248AB79Bbb9bC29bB72f7Cd42F17e054Fc40188e',
    SWAP_AGGREGATOR_ADDRESS: '0x51166441451A4CC55E3D5AFE2f0d3E6Cef2dA493',
    UNISWAP_V3_ROUTER_ADDRESS: '0x101F443B4d1b059569D643917553c771E1b9663E',
  },
  [NETWORKS.arbMainnet.chainId]: {
    URL: 'https://nd-410-727-823.p2pify.com/f34df17e953972ecd51eb26b3fc5583f',
    PUBLIC_KEY: '0x805d0d2ae6D777Be7C126bf75330F0E471D9D584',
    WETH_ADDRESS: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
    USDC_ADDRESS: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
    USDCE_ADDRESS: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
    ARB_ADDRESS: '0x912CE59144191C1204E64559FE8253a0e49E6548',
    WBTC_ADDRESS: '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
    USDT_ADDRESS: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
    ROUTER_ADDRESS: '0x888888888889758F76e7103c6CbF23ABbF58F946',
    MULTI_CALL_ADDRESS: '0x12da044ff09d1B9C60B8847DC669E11CbBF5f8e5',
    UNISWAP_V3_FACTORY: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
    SWAP_AGGREGATOR_ADDRESS: '0x51166441451A4CC55E3D5AFE2f0d3E6Cef2dA493',
    UNISWAP_V3_ROUTER_ADDRESS: '0x101F443B4d1b059569D643917553c771E1b9663E',
  },
};
