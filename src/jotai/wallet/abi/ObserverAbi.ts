export const observerAbi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_gate',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'TickOutOfBound',
    type: 'error',
  },
  {
    inputs: [],
    name: 'gate',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'instrument',
        type: 'address',
      },
      {
        internalType: 'uint32',
        name: 'expiry',
        type: 'uint32',
      },
      {
        internalType: 'address',
        name: 'target',
        type: 'address',
      },
    ],
    name: 'getAcc',
    outputs: [
      {
        components: [
          {
            internalType: 'uint48[]',
            name: 'oids',
            type: 'uint48[]',
          },
          {
            internalType: 'uint48[]',
            name: 'rids',
            type: 'uint48[]',
          },
          {
            components: [
              {
                internalType: 'int128',
                name: 'balance',
                type: 'int128',
              },
              {
                internalType: 'int128',
                name: 'size',
                type: 'int128',
              },
              {
                internalType: 'uint128',
                name: 'entryNotional',
                type: 'uint128',
              },
              {
                internalType: 'uint128',
                name: 'entrySocialLossIndex',
                type: 'uint128',
              },
              {
                internalType: 'int128',
                name: 'entryFundingIndex',
                type: 'int128',
              },
            ],
            internalType: 'struct Position',
            name: 'position',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'uint128',
                name: 'balance',
                type: 'uint128',
              },
              {
                internalType: 'int128',
                name: 'size',
                type: 'int128',
              },
            ],
            internalType: 'struct Order[]',
            name: 'orders',
            type: 'tuple[]',
          },
          {
            components: [
              {
                internalType: 'uint128',
                name: 'liquidity',
                type: 'uint128',
              },
              {
                internalType: 'uint128',
                name: 'entryFeeIndex',
                type: 'uint128',
              },
              {
                internalType: 'uint96',
                name: 'balance',
                type: 'uint96',
              },
              {
                internalType: 'uint160',
                name: 'sqrtEntryPX96',
                type: 'uint160',
              },
            ],
            internalType: 'struct Range[]',
            name: 'ranges',
            type: 'tuple[]',
          },
          {
            internalType: 'int256[]',
            name: 'ordersTaken',
            type: 'int256[]',
          },
        ],
        internalType: 'struct Portfolio',
        name: 'portfolio',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'uint32',
            name: 'timestamp',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'height',
            type: 'uint32',
          },
        ],
        internalType: 'struct BlockInfo',
        name: 'blockInfo',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'instrument',
        type: 'address',
      },
      {
        internalType: 'uint32',
        name: 'expiry',
        type: 'uint32',
      },
      {
        internalType: 'address',
        name: 'target',
        type: 'address',
      },
    ],
    name: 'getAccMeta',
    outputs: [
      {
        internalType: 'uint256',
        name: 'onumber',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'rnumber',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getAllInstruments',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'instrumentAddr',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            internalType: 'address',
            name: 'market',
            type: 'address',
          },
          {
            components: [
              {
                internalType: 'enum FeederType',
                name: 'ftype',
                type: 'uint8',
              },
              {
                internalType: 'bool',
                name: 'isToken0Quote',
                type: 'bool',
              },
              {
                internalType: 'address',
                name: 'pair',
                type: 'address',
              },
              {
                internalType: 'uint64',
                name: 'scaler0',
                type: 'uint64',
              },
              {
                internalType: 'uint64',
                name: 'scaler1',
                type: 'uint64',
              },
            ],
            internalType: 'struct DexV2Feeder',
            name: 'dexV2Feeder',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'enum FeederType',
                name: 'ftype',
                type: 'uint8',
              },
              {
                internalType: 'uint64',
                name: 'scaler0',
                type: 'uint64',
              },
              {
                internalType: 'address',
                name: 'aggregator0',
                type: 'address',
              },
              {
                internalType: 'uint24',
                name: 'heartBeat0',
                type: 'uint24',
              },
              {
                internalType: 'uint64',
                name: 'scaler1',
                type: 'uint64',
              },
              {
                internalType: 'address',
                name: 'aggregator1',
                type: 'address',
              },
              {
                internalType: 'uint24',
                name: 'heartBeat1',
                type: 'uint24',
              },
            ],
            internalType: 'struct PriceFeeder',
            name: 'priceFeeder',
            type: 'tuple',
          },
          {
            internalType: 'uint16',
            name: 'initialMarginRatio',
            type: 'uint16',
          },
          {
            internalType: 'uint16',
            name: 'maintenanceMarginRatio',
            type: 'uint16',
          },
          {
            components: [
              {
                internalType: 'uint128',
                name: 'minMarginAmount',
                type: 'uint128',
              },
              {
                internalType: 'uint16',
                name: 'tradingFeeRatio',
                type: 'uint16',
              },
              {
                internalType: 'uint16',
                name: 'protocolFeeRatio',
                type: 'uint16',
              },
              {
                internalType: 'uint64',
                name: 'stabilityFeeRatioParam',
                type: 'uint64',
              },
              {
                internalType: 'enum QuoteType',
                name: 'qtype',
                type: 'uint8',
              },
              {
                internalType: 'uint128',
                name: 'tip',
                type: 'uint128',
              },
            ],
            internalType: 'struct QuoteParam',
            name: 'param',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'spotPrice',
            type: 'uint256',
          },
          {
            internalType: 'enum Condition',
            name: 'condition',
            type: 'uint8',
          },
          {
            components: [
              {
                internalType: 'uint32',
                name: 'expiry',
                type: 'uint32',
              },
              {
                internalType: 'uint32',
                name: 'timestamp',
                type: 'uint32',
              },
              {
                internalType: 'enum Status',
                name: 'status',
                type: 'uint8',
              },
              {
                internalType: 'int24',
                name: 'tick',
                type: 'int24',
              },
              {
                internalType: 'uint160',
                name: 'sqrtPX96',
                type: 'uint160',
              },
              {
                internalType: 'uint128',
                name: 'liquidity',
                type: 'uint128',
              },
              {
                internalType: 'uint128',
                name: 'totalLiquidity',
                type: 'uint128',
              },
              {
                internalType: 'uint128',
                name: 'totalShort',
                type: 'uint128',
              },
              {
                internalType: 'uint128',
                name: 'openInterests',
                type: 'uint128',
              },
              {
                internalType: 'uint128',
                name: 'totalLong',
                type: 'uint128',
              },
              {
                internalType: 'uint128',
                name: 'involvedFund',
                type: 'uint128',
              },
              {
                internalType: 'uint128',
                name: 'feeIndex',
                type: 'uint128',
              },
              {
                internalType: 'uint128',
                name: 'protocolFee',
                type: 'uint128',
              },
              {
                internalType: 'uint128',
                name: 'longSocialLossIndex',
                type: 'uint128',
              },
              {
                internalType: 'uint128',
                name: 'shortSocialLossIndex',
                type: 'uint128',
              },
              {
                internalType: 'int128',
                name: 'longFundingIndex',
                type: 'int128',
              },
              {
                internalType: 'int128',
                name: 'shortFundingIndex',
                type: 'int128',
              },
              {
                internalType: 'uint128',
                name: 'insuranceFund',
                type: 'uint128',
              },
              {
                internalType: 'uint128',
                name: 'settlementPrice',
                type: 'uint128',
              },
            ],
            internalType: 'struct Amm[]',
            name: 'amms',
            type: 'tuple[]',
          },
          {
            internalType: 'uint256[]',
            name: 'markPrices',
            type: 'uint256[]',
          },
        ],
        internalType: 'struct AssembledInstrumentData[]',
        name: '',
        type: 'tuple[]',
      },
      {
        components: [
          {
            internalType: 'uint32',
            name: 'timestamp',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'height',
            type: 'uint32',
          },
        ],
        internalType: 'struct BlockInfo',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'instrument',
        type: 'address',
      },
      {
        internalType: 'uint32',
        name: 'expiry',
        type: 'uint32',
      },
    ],
    name: 'getAmm',
    outputs: [
      {
        components: [
          {
            internalType: 'uint32',
            name: 'expiry',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'timestamp',
            type: 'uint32',
          },
          {
            internalType: 'enum Status',
            name: 'status',
            type: 'uint8',
          },
          {
            internalType: 'int24',
            name: 'tick',
            type: 'int24',
          },
          {
            internalType: 'uint160',
            name: 'sqrtPX96',
            type: 'uint160',
          },
          {
            internalType: 'uint128',
            name: 'liquidity',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'totalLiquidity',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'totalShort',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'openInterests',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'totalLong',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'involvedFund',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'feeIndex',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'protocolFee',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'longSocialLossIndex',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'shortSocialLossIndex',
            type: 'uint128',
          },
          {
            internalType: 'int128',
            name: 'longFundingIndex',
            type: 'int128',
          },
          {
            internalType: 'int128',
            name: 'shortFundingIndex',
            type: 'int128',
          },
          {
            internalType: 'uint128',
            name: 'insuranceFund',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'settlementPrice',
            type: 'uint128',
          },
        ],
        internalType: 'struct Amm',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'instrument',
            type: 'address',
          },
          {
            internalType: 'uint32[]',
            name: 'expiries',
            type: 'uint32[]',
          },
        ],
        internalType: 'struct FetchInstrumentParam[]',
        name: 'params',
        type: 'tuple[]',
      },
    ],
    name: 'getInstrumentBatch',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'instrumentAddr',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            internalType: 'address',
            name: 'market',
            type: 'address',
          },
          {
            components: [
              {
                internalType: 'enum FeederType',
                name: 'ftype',
                type: 'uint8',
              },
              {
                internalType: 'bool',
                name: 'isToken0Quote',
                type: 'bool',
              },
              {
                internalType: 'address',
                name: 'pair',
                type: 'address',
              },
              {
                internalType: 'uint64',
                name: 'scaler0',
                type: 'uint64',
              },
              {
                internalType: 'uint64',
                name: 'scaler1',
                type: 'uint64',
              },
            ],
            internalType: 'struct DexV2Feeder',
            name: 'dexV2Feeder',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'enum FeederType',
                name: 'ftype',
                type: 'uint8',
              },
              {
                internalType: 'uint64',
                name: 'scaler0',
                type: 'uint64',
              },
              {
                internalType: 'address',
                name: 'aggregator0',
                type: 'address',
              },
              {
                internalType: 'uint24',
                name: 'heartBeat0',
                type: 'uint24',
              },
              {
                internalType: 'uint64',
                name: 'scaler1',
                type: 'uint64',
              },
              {
                internalType: 'address',
                name: 'aggregator1',
                type: 'address',
              },
              {
                internalType: 'uint24',
                name: 'heartBeat1',
                type: 'uint24',
              },
            ],
            internalType: 'struct PriceFeeder',
            name: 'priceFeeder',
            type: 'tuple',
          },
          {
            internalType: 'uint16',
            name: 'initialMarginRatio',
            type: 'uint16',
          },
          {
            internalType: 'uint16',
            name: 'maintenanceMarginRatio',
            type: 'uint16',
          },
          {
            components: [
              {
                internalType: 'uint128',
                name: 'minMarginAmount',
                type: 'uint128',
              },
              {
                internalType: 'uint16',
                name: 'tradingFeeRatio',
                type: 'uint16',
              },
              {
                internalType: 'uint16',
                name: 'protocolFeeRatio',
                type: 'uint16',
              },
              {
                internalType: 'uint64',
                name: 'stabilityFeeRatioParam',
                type: 'uint64',
              },
              {
                internalType: 'enum QuoteType',
                name: 'qtype',
                type: 'uint8',
              },
              {
                internalType: 'uint128',
                name: 'tip',
                type: 'uint128',
              },
            ],
            internalType: 'struct QuoteParam',
            name: 'param',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'spotPrice',
            type: 'uint256',
          },
          {
            internalType: 'enum Condition',
            name: 'condition',
            type: 'uint8',
          },
          {
            components: [
              {
                internalType: 'uint32',
                name: 'expiry',
                type: 'uint32',
              },
              {
                internalType: 'uint32',
                name: 'timestamp',
                type: 'uint32',
              },
              {
                internalType: 'enum Status',
                name: 'status',
                type: 'uint8',
              },
              {
                internalType: 'int24',
                name: 'tick',
                type: 'int24',
              },
              {
                internalType: 'uint160',
                name: 'sqrtPX96',
                type: 'uint160',
              },
              {
                internalType: 'uint128',
                name: 'liquidity',
                type: 'uint128',
              },
              {
                internalType: 'uint128',
                name: 'totalLiquidity',
                type: 'uint128',
              },
              {
                internalType: 'uint128',
                name: 'totalShort',
                type: 'uint128',
              },
              {
                internalType: 'uint128',
                name: 'openInterests',
                type: 'uint128',
              },
              {
                internalType: 'uint128',
                name: 'totalLong',
                type: 'uint128',
              },
              {
                internalType: 'uint128',
                name: 'involvedFund',
                type: 'uint128',
              },
              {
                internalType: 'uint128',
                name: 'feeIndex',
                type: 'uint128',
              },
              {
                internalType: 'uint128',
                name: 'protocolFee',
                type: 'uint128',
              },
              {
                internalType: 'uint128',
                name: 'longSocialLossIndex',
                type: 'uint128',
              },
              {
                internalType: 'uint128',
                name: 'shortSocialLossIndex',
                type: 'uint128',
              },
              {
                internalType: 'int128',
                name: 'longFundingIndex',
                type: 'int128',
              },
              {
                internalType: 'int128',
                name: 'shortFundingIndex',
                type: 'int128',
              },
              {
                internalType: 'uint128',
                name: 'insuranceFund',
                type: 'uint128',
              },
              {
                internalType: 'uint128',
                name: 'settlementPrice',
                type: 'uint128',
              },
            ],
            internalType: 'struct Amm[]',
            name: 'amms',
            type: 'tuple[]',
          },
          {
            internalType: 'uint256[]',
            name: 'markPrices',
            type: 'uint256[]',
          },
        ],
        internalType: 'struct AssembledInstrumentData[]',
        name: '',
        type: 'tuple[]',
      },
      {
        components: [
          {
            internalType: 'uint32',
            name: 'timestamp',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'height',
            type: 'uint32',
          },
        ],
        internalType: 'struct BlockInfo',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: 'instrumentList',
        type: 'address[]',
      },
    ],
    name: 'getInstrumentByAddressList',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'instrumentAddr',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            internalType: 'address',
            name: 'market',
            type: 'address',
          },
          {
            components: [
              {
                internalType: 'enum FeederType',
                name: 'ftype',
                type: 'uint8',
              },
              {
                internalType: 'bool',
                name: 'isToken0Quote',
                type: 'bool',
              },
              {
                internalType: 'address',
                name: 'pair',
                type: 'address',
              },
              {
                internalType: 'uint64',
                name: 'scaler0',
                type: 'uint64',
              },
              {
                internalType: 'uint64',
                name: 'scaler1',
                type: 'uint64',
              },
            ],
            internalType: 'struct DexV2Feeder',
            name: 'dexV2Feeder',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'enum FeederType',
                name: 'ftype',
                type: 'uint8',
              },
              {
                internalType: 'uint64',
                name: 'scaler0',
                type: 'uint64',
              },
              {
                internalType: 'address',
                name: 'aggregator0',
                type: 'address',
              },
              {
                internalType: 'uint24',
                name: 'heartBeat0',
                type: 'uint24',
              },
              {
                internalType: 'uint64',
                name: 'scaler1',
                type: 'uint64',
              },
              {
                internalType: 'address',
                name: 'aggregator1',
                type: 'address',
              },
              {
                internalType: 'uint24',
                name: 'heartBeat1',
                type: 'uint24',
              },
            ],
            internalType: 'struct PriceFeeder',
            name: 'priceFeeder',
            type: 'tuple',
          },
          {
            internalType: 'uint16',
            name: 'initialMarginRatio',
            type: 'uint16',
          },
          {
            internalType: 'uint16',
            name: 'maintenanceMarginRatio',
            type: 'uint16',
          },
          {
            components: [
              {
                internalType: 'uint128',
                name: 'minMarginAmount',
                type: 'uint128',
              },
              {
                internalType: 'uint16',
                name: 'tradingFeeRatio',
                type: 'uint16',
              },
              {
                internalType: 'uint16',
                name: 'protocolFeeRatio',
                type: 'uint16',
              },
              {
                internalType: 'uint64',
                name: 'stabilityFeeRatioParam',
                type: 'uint64',
              },
              {
                internalType: 'enum QuoteType',
                name: 'qtype',
                type: 'uint8',
              },
              {
                internalType: 'uint128',
                name: 'tip',
                type: 'uint128',
              },
            ],
            internalType: 'struct QuoteParam',
            name: 'param',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'spotPrice',
            type: 'uint256',
          },
          {
            internalType: 'enum Condition',
            name: 'condition',
            type: 'uint8',
          },
          {
            components: [
              {
                internalType: 'uint32',
                name: 'expiry',
                type: 'uint32',
              },
              {
                internalType: 'uint32',
                name: 'timestamp',
                type: 'uint32',
              },
              {
                internalType: 'enum Status',
                name: 'status',
                type: 'uint8',
              },
              {
                internalType: 'int24',
                name: 'tick',
                type: 'int24',
              },
              {
                internalType: 'uint160',
                name: 'sqrtPX96',
                type: 'uint160',
              },
              {
                internalType: 'uint128',
                name: 'liquidity',
                type: 'uint128',
              },
              {
                internalType: 'uint128',
                name: 'totalLiquidity',
                type: 'uint128',
              },
              {
                internalType: 'uint128',
                name: 'totalShort',
                type: 'uint128',
              },
              {
                internalType: 'uint128',
                name: 'openInterests',
                type: 'uint128',
              },
              {
                internalType: 'uint128',
                name: 'totalLong',
                type: 'uint128',
              },
              {
                internalType: 'uint128',
                name: 'involvedFund',
                type: 'uint128',
              },
              {
                internalType: 'uint128',
                name: 'feeIndex',
                type: 'uint128',
              },
              {
                internalType: 'uint128',
                name: 'protocolFee',
                type: 'uint128',
              },
              {
                internalType: 'uint128',
                name: 'longSocialLossIndex',
                type: 'uint128',
              },
              {
                internalType: 'uint128',
                name: 'shortSocialLossIndex',
                type: 'uint128',
              },
              {
                internalType: 'int128',
                name: 'longFundingIndex',
                type: 'int128',
              },
              {
                internalType: 'int128',
                name: 'shortFundingIndex',
                type: 'int128',
              },
              {
                internalType: 'uint128',
                name: 'insuranceFund',
                type: 'uint128',
              },
              {
                internalType: 'uint128',
                name: 'settlementPrice',
                type: 'uint128',
              },
            ],
            internalType: 'struct Amm[]',
            name: 'amms',
            type: 'tuple[]',
          },
          {
            internalType: 'uint256[]',
            name: 'markPrices',
            type: 'uint256[]',
          },
        ],
        internalType: 'struct AssembledInstrumentData[]',
        name: '',
        type: 'tuple[]',
      },
      {
        components: [
          {
            internalType: 'uint32',
            name: 'timestamp',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'height',
            type: 'uint32',
          },
        ],
        internalType: 'struct BlockInfo',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'instrument',
        type: 'address',
      },
      {
        internalType: 'uint32',
        name: 'expiry',
        type: 'uint32',
      },
      {
        internalType: 'int24',
        name: 'tick',
        type: 'int24',
      },
      {
        internalType: 'bool',
        name: 'right',
        type: 'bool',
      },
    ],
    name: 'getNextInitializedTickOutside',
    outputs: [
      {
        internalType: 'int24',
        name: '',
        type: 'int24',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'instrument',
        type: 'address',
      },
      {
        internalType: 'uint32',
        name: 'expiry',
        type: 'uint32',
      },
      {
        internalType: 'address',
        name: 'target',
        type: 'address',
      },
    ],
    name: 'getOrderIndexes',
    outputs: [
      {
        internalType: 'uint48[]',
        name: '',
        type: 'uint48[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'instrument',
        type: 'address',
      },
      {
        internalType: 'uint32',
        name: 'expiry',
        type: 'uint32',
      },
      {
        internalType: 'address',
        name: 'target',
        type: 'address',
      },
      {
        internalType: 'uint48[]',
        name: 'oids',
        type: 'uint48[]',
      },
    ],
    name: 'getOrders',
    outputs: [
      {
        components: [
          {
            internalType: 'uint128',
            name: 'balance',
            type: 'uint128',
          },
          {
            internalType: 'int128',
            name: 'size',
            type: 'int128',
          },
        ],
        internalType: 'struct Order[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'instrument',
        type: 'address',
      },
      {
        internalType: 'uint32',
        name: 'expiry',
        type: 'uint32',
      },
      {
        internalType: 'int24[]',
        name: 'tids',
        type: 'int24[]',
      },
    ],
    name: 'getPearls',
    outputs: [
      {
        components: [
          {
            internalType: 'uint128',
            name: 'liquidityGross',
            type: 'uint128',
          },
          {
            internalType: 'int128',
            name: 'liquidityNet',
            type: 'int128',
          },
          {
            internalType: 'uint24',
            name: 'nonce',
            type: 'uint24',
          },
          {
            internalType: 'int96',
            name: 'left',
            type: 'int96',
          },
          {
            internalType: 'int96',
            name: 'taken',
            type: 'int96',
          },
          {
            internalType: 'uint128',
            name: 'fee',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'entrySocialLossIndex',
            type: 'uint128',
          },
          {
            internalType: 'int128',
            name: 'entryFundingIndex',
            type: 'int128',
          },
        ],
        internalType: 'struct Pearl[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: 'quotes',
        type: 'address[]',
      },
      {
        internalType: 'address',
        name: 'trader',
        type: 'address',
      },
    ],
    name: 'getPendings',
    outputs: [
      {
        components: [
          {
            internalType: 'uint32',
            name: 'timestamp',
            type: 'uint32',
          },
          {
            internalType: 'bool',
            name: 'native',
            type: 'bool',
          },
          {
            internalType: 'uint96',
            name: 'amount',
            type: 'uint96',
          },
          {
            internalType: 'uint120',
            name: 'exemption',
            type: 'uint120',
          },
        ],
        internalType: 'struct Pending[]',
        name: 'pendings',
        type: 'tuple[]',
      },
      {
        components: [
          {
            internalType: 'uint32',
            name: 'timestamp',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'height',
            type: 'uint32',
          },
        ],
        internalType: 'struct BlockInfo',
        name: 'blockInfo',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'target',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'instrument',
        type: 'address',
      },
    ],
    name: 'getPortfolios',
    outputs: [
      {
        internalType: 'uint32[]',
        name: 'expiries',
        type: 'uint32[]',
      },
      {
        components: [
          {
            internalType: 'uint48[]',
            name: 'oids',
            type: 'uint48[]',
          },
          {
            internalType: 'uint48[]',
            name: 'rids',
            type: 'uint48[]',
          },
          {
            components: [
              {
                internalType: 'int128',
                name: 'balance',
                type: 'int128',
              },
              {
                internalType: 'int128',
                name: 'size',
                type: 'int128',
              },
              {
                internalType: 'uint128',
                name: 'entryNotional',
                type: 'uint128',
              },
              {
                internalType: 'uint128',
                name: 'entrySocialLossIndex',
                type: 'uint128',
              },
              {
                internalType: 'int128',
                name: 'entryFundingIndex',
                type: 'int128',
              },
            ],
            internalType: 'struct Position',
            name: 'position',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'uint128',
                name: 'balance',
                type: 'uint128',
              },
              {
                internalType: 'int128',
                name: 'size',
                type: 'int128',
              },
            ],
            internalType: 'struct Order[]',
            name: 'orders',
            type: 'tuple[]',
          },
          {
            components: [
              {
                internalType: 'uint128',
                name: 'liquidity',
                type: 'uint128',
              },
              {
                internalType: 'uint128',
                name: 'entryFeeIndex',
                type: 'uint128',
              },
              {
                internalType: 'uint96',
                name: 'balance',
                type: 'uint96',
              },
              {
                internalType: 'uint160',
                name: 'sqrtEntryPX96',
                type: 'uint160',
              },
            ],
            internalType: 'struct Range[]',
            name: 'ranges',
            type: 'tuple[]',
          },
          {
            internalType: 'int256[]',
            name: 'ordersTaken',
            type: 'int256[]',
          },
        ],
        internalType: 'struct Portfolio[]',
        name: 'portfolios',
        type: 'tuple[]',
      },
      {
        components: [
          {
            internalType: 'uint32',
            name: 'timestamp',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'height',
            type: 'uint32',
          },
        ],
        internalType: 'struct BlockInfo',
        name: 'blockInfo',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'instrument',
        type: 'address',
      },
      {
        internalType: 'uint32',
        name: 'expiry',
        type: 'uint32',
      },
      {
        internalType: 'address',
        name: 'target',
        type: 'address',
      },
    ],
    name: 'getPosition',
    outputs: [
      {
        components: [
          {
            internalType: 'int128',
            name: 'balance',
            type: 'int128',
          },
          {
            internalType: 'int128',
            name: 'size',
            type: 'int128',
          },
          {
            internalType: 'uint128',
            name: 'entryNotional',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'entrySocialLossIndex',
            type: 'uint128',
          },
          {
            internalType: 'int128',
            name: 'entryFundingIndex',
            type: 'int128',
          },
        ],
        internalType: 'struct Position',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'instrument',
        type: 'address',
      },
    ],
    name: 'getQuoteParam',
    outputs: [
      {
        components: [
          {
            internalType: 'uint128',
            name: 'minMarginAmount',
            type: 'uint128',
          },
          {
            internalType: 'uint16',
            name: 'tradingFeeRatio',
            type: 'uint16',
          },
          {
            internalType: 'uint16',
            name: 'protocolFeeRatio',
            type: 'uint16',
          },
          {
            internalType: 'uint64',
            name: 'stabilityFeeRatioParam',
            type: 'uint64',
          },
          {
            internalType: 'enum QuoteType',
            name: 'qtype',
            type: 'uint8',
          },
          {
            internalType: 'uint128',
            name: 'tip',
            type: 'uint128',
          },
        ],
        internalType: 'struct QuoteParam',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'instrument',
        type: 'address',
      },
      {
        internalType: 'uint32',
        name: 'expiry',
        type: 'uint32',
      },
      {
        internalType: 'address',
        name: 'target',
        type: 'address',
      },
    ],
    name: 'getRangeIndexes',
    outputs: [
      {
        internalType: 'uint48[]',
        name: '',
        type: 'uint48[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'instrument',
        type: 'address',
      },
      {
        internalType: 'uint32',
        name: 'expiry',
        type: 'uint32',
      },
      {
        internalType: 'address',
        name: 'target',
        type: 'address',
      },
      {
        internalType: 'uint48[]',
        name: 'rids',
        type: 'uint48[]',
      },
    ],
    name: 'getRanges',
    outputs: [
      {
        components: [
          {
            internalType: 'uint128',
            name: 'liquidity',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'entryFeeIndex',
            type: 'uint128',
          },
          {
            internalType: 'uint96',
            name: 'balance',
            type: 'uint96',
          },
          {
            internalType: 'uint160',
            name: 'sqrtEntryPX96',
            type: 'uint160',
          },
        ],
        internalType: 'struct Range[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'instrument',
        type: 'address',
      },
      {
        internalType: 'uint32',
        name: 'expiry',
        type: 'uint32',
      },
      {
        internalType: 'int24[]',
        name: 'tids',
        type: 'int24[]',
      },
      {
        internalType: 'uint24[]',
        name: 'nonces',
        type: 'uint24[]',
      },
    ],
    name: 'getRecords',
    outputs: [
      {
        components: [
          {
            internalType: 'int128',
            name: 'taken',
            type: 'int128',
          },
          {
            internalType: 'uint128',
            name: 'fee',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'entrySocialLossIndex',
            type: 'uint128',
          },
          {
            internalType: 'int128',
            name: 'entryFundingIndex',
            type: 'int128',
          },
        ],
        internalType: 'struct Record[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'instrument',
        type: 'address',
      },
    ],
    name: 'getSetting',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            internalType: 'address',
            name: 'config',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'gate',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'market',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'quote',
            type: 'address',
          },
          {
            internalType: 'uint8',
            name: 'decimals',
            type: 'uint8',
          },
          {
            internalType: 'uint16',
            name: 'initialMarginRatio',
            type: 'uint16',
          },
          {
            internalType: 'uint16',
            name: 'maintenanceMarginRatio',
            type: 'uint16',
          },
          {
            components: [
              {
                internalType: 'uint128',
                name: 'minMarginAmount',
                type: 'uint128',
              },
              {
                internalType: 'uint16',
                name: 'tradingFeeRatio',
                type: 'uint16',
              },
              {
                internalType: 'uint16',
                name: 'protocolFeeRatio',
                type: 'uint16',
              },
              {
                internalType: 'uint64',
                name: 'stabilityFeeRatioParam',
                type: 'uint64',
              },
              {
                internalType: 'enum QuoteType',
                name: 'qtype',
                type: 'uint8',
              },
              {
                internalType: 'uint128',
                name: 'tip',
                type: 'uint128',
              },
            ],
            internalType: 'struct QuoteParam',
            name: 'param',
            type: 'tuple',
          },
        ],
        internalType: 'struct Setting',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'instrument',
        type: 'address',
      },
      {
        internalType: 'uint32',
        name: 'expiry',
        type: 'uint32',
      },
      {
        internalType: 'int16[]',
        name: 'tbids',
        type: 'int16[]',
      },
    ],
    name: 'getTickBitmaps',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'target',
        type: 'address',
      },
      {
        internalType: 'address[]',
        name: 'quotes',
        type: 'address[]',
      },
    ],
    name: 'getVaultBalances',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
      {
        components: [
          {
            internalType: 'uint32',
            name: 'timestamp',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'height',
            type: 'uint32',
          },
        ],
        internalType: 'struct BlockInfo',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'instrument',
        type: 'address',
      },
      {
        internalType: 'uint32',
        name: 'expiry',
        type: 'uint32',
      },
      {
        internalType: 'uint256',
        name: 'notional',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'long',
        type: 'bool',
      },
    ],
    name: 'inquireByNotional',
    outputs: [
      {
        internalType: 'int256',
        name: 'size',
        type: 'int256',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'benchmark',
            type: 'uint256',
          },
          {
            internalType: 'uint160',
            name: 'sqrtFairPX96',
            type: 'uint160',
          },
          {
            internalType: 'int24',
            name: 'tick',
            type: 'int24',
          },
          {
            internalType: 'uint256',
            name: 'mark',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'entryNotional',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'fee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint160',
            name: 'sqrtPostFairPX96',
            type: 'uint160',
          },
          {
            internalType: 'int24',
            name: 'postTick',
            type: 'int24',
          },
        ],
        internalType: 'struct Quotation',
        name: 'quotation',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'base',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'quote',
        type: 'address',
      },
    ],
    name: 'inspectMaxReserveDexV2Pair',
    outputs: [
      {
        internalType: 'address',
        name: 'maxReservePair',
        type: 'address',
      },
      {
        internalType: 'uint112',
        name: 'reserve0',
        type: 'uint112',
      },
      {
        internalType: 'uint112',
        name: 'reserve1',
        type: 'uint112',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'instrument',
        type: 'address',
      },
      {
        internalType: 'uint32',
        name: 'expiry',
        type: 'uint32',
      },
      {
        internalType: 'uint24',
        name: 'tickDelta',
        type: 'uint24',
      },
    ],
    name: 'liquidityDetails',
    outputs: [
      {
        components: [
          {
            internalType: 'uint160',
            name: 'sqrtPX96',
            type: 'uint160',
          },
          {
            internalType: 'int24',
            name: 'tick',
            type: 'int24',
          },
          {
            internalType: 'uint256',
            name: 'liquidity',
            type: 'uint256',
          },
        ],
        internalType: 'struct CurveState',
        name: 'amm',
        type: 'tuple',
      },
      {
        internalType: 'int24[]',
        name: 'tids',
        type: 'int24[]',
      },
      {
        components: [
          {
            internalType: 'int128',
            name: 'liquidityNet',
            type: 'int128',
          },
          {
            internalType: 'int96',
            name: 'left',
            type: 'int96',
          },
        ],
        internalType: 'struct MinimalPearl[]',
        name: 'pearls',
        type: 'tuple[]',
      },
      {
        components: [
          {
            internalType: 'uint32',
            name: 'timestamp',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'height',
            type: 'uint32',
          },
        ],
        internalType: 'struct BlockInfo',
        name: 'blockInfo',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'instrument',
        type: 'address',
      },
      {
        internalType: 'uint32',
        name: 'expiry',
        type: 'uint32',
      },
      {
        internalType: 'uint256',
        name: 'notional',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'long',
        type: 'bool',
      },
    ],
    name: 'sizeByNotional',
    outputs: [
      {
        internalType: 'int256',
        name: '',
        type: 'int256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const;
