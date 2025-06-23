import { defineChain } from 'viem';
import { chainConfig } from 'viem/op-stack';

export const customArbitrum = defineChain({
  id: 42_161,
  name: 'Arbitrum One',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: [
        'https://summer-responsive-wildflower.arbitrum-mainnet.quiknode.pro/b9828f169c16566aa212f6701dd2b443c1e5d6f6',
        // 'https://rpc.mazig.io/',
      ],
    },
  },
  blockExplorers: {
    default: {
      name: 'Arbiscan',
      url: 'https://arbiscan.io',
      apiUrl: 'https://api.arbiscan.io/api',
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 7654707,
    },
  },
});

export const customArbitrumSepolia = defineChain({
  id: 421_614,
  name: 'Arbitrum Sepolia',
  nativeCurrency: {
    name: 'Arbitrum Sepolia Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://arbitrum-sepolia.infura.io/v3/26917a1c15504eb192725711e8772184'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Arbiscan',
      url: 'https://sepolia.arbiscan.io',
      apiUrl: 'https://api-sepolia.arbiscan.io/api',
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 81930,
    },
  },
  testnet: true,
});

const sourceId = 1; // mainnet

export const customBase = /*#__PURE__*/ defineChain({
  ...chainConfig,
  id: 8453,
  name: 'Base',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://base.llamarpc.com/'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Basescan',
      url: 'https://basescan.org',
      apiUrl: 'https://api.basescan.org/api',
    },
  },
  contracts: {
    ...chainConfig.contracts,
    l2OutputOracle: {
      [sourceId]: {
        address: '0x56315b90c40730925ec5485cf004d835058518A0',
      },
    },
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 5022,
    },
    portal: {
      [sourceId]: {
        address: '0x49048044D57e1C92A77f79988d21Fa8fAF74E97e',
        blockCreated: 17482143,
      },
    },
    l1StandardBridge: {
      [sourceId]: {
        address: '0x3154Cf16ccdb4C6d922629664174b904d80F2C35',
        blockCreated: 17482143,
      },
    },
  },
  sourceId,
});
