export const abiIAllAction = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'market',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'netSyUsed',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'netPtUsed',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'netLpOut',
        type: 'uint256',
      },
    ],
    name: 'AddLiquidityDualSyAndPt',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'market',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'tokenIn',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'netTokenUsed',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'netPtUsed',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'netLpOut',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'netSyInterm',
        type: 'uint256',
      },
    ],
    name: 'AddLiquidityDualTokenAndPt',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'market',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'netPtIn',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'netLpOut',
        type: 'uint256',
      },
    ],
    name: 'AddLiquiditySinglePt',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'market',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'netSyIn',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'netLpOut',
        type: 'uint256',
      },
    ],
    name: 'AddLiquiditySingleSy',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'market',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'netSyIn',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'netSyMintPy',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'netLpOut',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'netYtOut',
        type: 'uint256',
      },
    ],
    name: 'AddLiquiditySingleSyKeepYt',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'market',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'netTokenIn',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'netLpOut',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'netSyInterm',
        type: 'uint256',
      },
    ],
    name: 'AddLiquiditySingleToken',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'market',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'netTokenIn',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'netLpOut',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'netYtOut',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'netSyMintPy',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'netSyInterm',
        type: 'uint256',
      },
    ],
    name: 'AddLiquiditySingleTokenKeepYt',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'YT',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'netSyIn',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'netPyOut',
        type: 'uint256',
      },
    ],
    name: 'MintPyFromSy',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'tokenIn',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'YT',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'netTokenIn',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'netPyOut',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'netSyInterm',
        type: 'uint256',
      },
    ],
    name: 'MintPyFromToken',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'tokenIn',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'SY',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'netTokenIn',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'netSyOut',
        type: 'uint256',
      },
    ],
    name: 'MintSyFromToken',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'YT',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'netPyIn',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'netSyOut',
        type: 'uint256',
      },
    ],
    name: 'RedeemPyToSy',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'tokenOut',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'YT',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'netPyIn',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'netTokenOut',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'netSyInterm',
        type: 'uint256',
      },
    ],
    name: 'RedeemPyToToken',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'tokenOut',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'SY',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'netSyIn',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'netTokenOut',
        type: 'uint256',
      },
    ],
    name: 'RedeemSyToToken',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'market',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'netLpToRemove',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'netPtOut',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'netSyOut',
        type: 'uint256',
      },
    ],
    name: 'RemoveLiquidityDualSyAndPt',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'market',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'tokenOut',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'netLpToRemove',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'netPtOut',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'netTokenOut',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'netSyInterm',
        type: 'uint256',
      },
    ],
    name: 'RemoveLiquidityDualTokenAndPt',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'market',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'netLpToRemove',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'netPtOut',
        type: 'uint256',
      },
    ],
    name: 'RemoveLiquiditySinglePt',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'market',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'netLpToRemove',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'netSyOut',
        type: 'uint256',
      },
    ],
    name: 'RemoveLiquiditySingleSy',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'market',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'netLpToRemove',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'netTokenOut',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'netSyInterm',
        type: 'uint256',
      },
    ],
    name: 'RemoveLiquiditySingleToken',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes4',
        name: 'selector',
        type: 'bytes4',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'facet',
        type: 'address',
      },
    ],
    name: 'SelectorToFacetSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'market',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'netPtToAccount',
        type: 'int256',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'netSyToAccount',
        type: 'int256',
      },
    ],
    name: 'SwapPtAndSy',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'market',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'netPtToAccount',
        type: 'int256',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'netTokenToAccount',
        type: 'int256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'netSyInterm',
        type: 'uint256',
      },
    ],
    name: 'SwapPtAndToken',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'market',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'netPtToAccount',
        type: 'int256',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'netYtToAccount',
        type: 'int256',
      },
    ],
    name: 'SwapPtAndYt',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'market',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'netYtToAccount',
        type: 'int256',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'netSyToAccount',
        type: 'int256',
      },
    ],
    name: 'SwapYtAndSy',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'market',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'netYtToAccount',
        type: 'int256',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'netTokenToAccount',
        type: 'int256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'netSyInterm',
        type: 'uint256',
      },
    ],
    name: 'SwapYtAndToken',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'market',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'netSyDesired',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'netPtDesired',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'minLpOut',
        type: 'uint256',
      },
    ],
    name: 'addLiquidityDualSyAndPt',
    outputs: [
      {
        internalType: 'uint256',
        name: 'netLpOut',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'netSyUsed',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'netPtUsed',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'market',
        type: 'address',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'tokenIn',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'netTokenIn',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'tokenMintSy',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'swapAggregator',
            type: 'address',
          },
          {
            components: [
              {
                internalType: 'enum SwapType',
                name: 'swapType',
                type: 'uint8',
              },
              {
                internalType: 'address',
                name: 'extRouter',
                type: 'address',
              },
              {
                internalType: 'bytes',
                name: 'extCalldata',
                type: 'bytes',
              },
              {
                internalType: 'bool',
                name: 'needScale',
                type: 'bool',
              },
            ],
            internalType: 'struct SwapData',
            name: 'swapData',
            type: 'tuple',
          },
        ],
        internalType: 'struct TokenInput',
        name: 'input',
        type: 'tuple',
      },
      {
        internalType: 'uint256',
        name: 'netPtDesired',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'minLpOut',
        type: 'uint256',
      },
    ],
    name: 'addLiquidityDualTokenAndPt',
    outputs: [
      {
        internalType: 'uint256',
        name: 'netLpOut',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'netPtUsed',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'netSyInterm',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'market',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'netPtIn',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'minLpOut',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'guessMin',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'guessMax',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'guessOffchain',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'maxIteration',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'eps',
            type: 'uint256',
          },
        ],
        internalType: 'struct ApproxParams',
        name: 'guessPtSwapToSy',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'limitRouter',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'epsSkipMarket',
            type: 'uint256',
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: 'uint256',
                    name: 'salt',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'expiry',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'nonce',
                    type: 'uint256',
                  },
                  {
                    internalType: 'enum ILimitOrderType.OrderType',
                    name: 'orderType',
                    type: 'uint8',
                  },
                  {
                    internalType: 'address',
                    name: 'token',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'YT',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'maker',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'receiver',
                    type: 'address',
                  },
                  {
                    internalType: 'uint256',
                    name: 'makingAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'lnImpliedRate',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'failSafeRate',
                    type: 'uint256',
                  },
                  {
                    internalType: 'bytes',
                    name: 'permit',
                    type: 'bytes',
                  },
                ],
                internalType: 'struct Order',
                name: 'order',
                type: 'tuple',
              },
              {
                internalType: 'bytes',
                name: 'signature',
                type: 'bytes',
              },
              {
                internalType: 'uint256',
                name: 'makingAmount',
                type: 'uint256',
              },
            ],
            internalType: 'struct FillOrderParams[]',
            name: 'normalFills',
            type: 'tuple[]',
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: 'uint256',
                    name: 'salt',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'expiry',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'nonce',
                    type: 'uint256',
                  },
                  {
                    internalType: 'enum ILimitOrderType.OrderType',
                    name: 'orderType',
                    type: 'uint8',
                  },
                  {
                    internalType: 'address',
                    name: 'token',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'YT',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'maker',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'receiver',
                    type: 'address',
                  },
                  {
                    internalType: 'uint256',
                    name: 'makingAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'lnImpliedRate',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'failSafeRate',
                    type: 'uint256',
                  },
                  {
                    internalType: 'bytes',
                    name: 'permit',
                    type: 'bytes',
                  },
                ],
                internalType: 'struct Order',
                name: 'order',
                type: 'tuple',
              },
              {
                internalType: 'bytes',
                name: 'signature',
                type: 'bytes',
              },
              {
                internalType: 'uint256',
                name: 'makingAmount',
                type: 'uint256',
              },
            ],
            internalType: 'struct FillOrderParams[]',
            name: 'flashFills',
            type: 'tuple[]',
          },
          {
            internalType: 'bytes',
            name: 'optData',
            type: 'bytes',
          },
        ],
        internalType: 'struct LimitOrderData',
        name: 'limit',
        type: 'tuple',
      },
    ],
    name: 'addLiquiditySinglePt',
    outputs: [
      {
        internalType: 'uint256',
        name: 'netLpOut',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'netSyFee',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'market',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'netSyIn',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'minLpOut',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'guessMin',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'guessMax',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'guessOffchain',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'maxIteration',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'eps',
            type: 'uint256',
          },
        ],
        internalType: 'struct ApproxParams',
        name: 'guessPtReceivedFromSy',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'limitRouter',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'epsSkipMarket',
            type: 'uint256',
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: 'uint256',
                    name: 'salt',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'expiry',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'nonce',
                    type: 'uint256',
                  },
                  {
                    internalType: 'enum ILimitOrderType.OrderType',
                    name: 'orderType',
                    type: 'uint8',
                  },
                  {
                    internalType: 'address',
                    name: 'token',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'YT',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'maker',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'receiver',
                    type: 'address',
                  },
                  {
                    internalType: 'uint256',
                    name: 'makingAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'lnImpliedRate',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'failSafeRate',
                    type: 'uint256',
                  },
                  {
                    internalType: 'bytes',
                    name: 'permit',
                    type: 'bytes',
                  },
                ],
                internalType: 'struct Order',
                name: 'order',
                type: 'tuple',
              },
              {
                internalType: 'bytes',
                name: 'signature',
                type: 'bytes',
              },
              {
                internalType: 'uint256',
                name: 'makingAmount',
                type: 'uint256',
              },
            ],
            internalType: 'struct FillOrderParams[]',
            name: 'normalFills',
            type: 'tuple[]',
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: 'uint256',
                    name: 'salt',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'expiry',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'nonce',
                    type: 'uint256',
                  },
                  {
                    internalType: 'enum ILimitOrderType.OrderType',
                    name: 'orderType',
                    type: 'uint8',
                  },
                  {
                    internalType: 'address',
                    name: 'token',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'YT',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'maker',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'receiver',
                    type: 'address',
                  },
                  {
                    internalType: 'uint256',
                    name: 'makingAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'lnImpliedRate',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'failSafeRate',
                    type: 'uint256',
                  },
                  {
                    internalType: 'bytes',
                    name: 'permit',
                    type: 'bytes',
                  },
                ],
                internalType: 'struct Order',
                name: 'order',
                type: 'tuple',
              },
              {
                internalType: 'bytes',
                name: 'signature',
                type: 'bytes',
              },
              {
                internalType: 'uint256',
                name: 'makingAmount',
                type: 'uint256',
              },
            ],
            internalType: 'struct FillOrderParams[]',
            name: 'flashFills',
            type: 'tuple[]',
          },
          {
            internalType: 'bytes',
            name: 'optData',
            type: 'bytes',
          },
        ],
        internalType: 'struct LimitOrderData',
        name: 'limit',
        type: 'tuple',
      },
    ],
    name: 'addLiquiditySingleSy',
    outputs: [
      {
        internalType: 'uint256',
        name: 'netLpOut',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'netSyFee',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'market',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'netSyIn',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'minLpOut',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'minYtOut',
        type: 'uint256',
      },
    ],
    name: 'addLiquiditySingleSyKeepYt',
    outputs: [
      {
        internalType: 'uint256',
        name: 'netLpOut',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'netYtOut',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'netSyMintPy',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'market',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'minLpOut',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'guessMin',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'guessMax',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'guessOffchain',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'maxIteration',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'eps',
            type: 'uint256',
          },
        ],
        internalType: 'struct ApproxParams',
        name: 'guessPtReceivedFromSy',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'tokenIn',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'netTokenIn',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'tokenMintSy',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'swapAggregator',
            type: 'address',
          },
          {
            components: [
              {
                internalType: 'enum SwapType',
                name: 'swapType',
                type: 'uint8',
              },
              {
                internalType: 'address',
                name: 'extRouter',
                type: 'address',
              },
              {
                internalType: 'bytes',
                name: 'extCalldata',
                type: 'bytes',
              },
              {
                internalType: 'bool',
                name: 'needScale',
                type: 'bool',
              },
            ],
            internalType: 'struct SwapData',
            name: 'swapData',
            type: 'tuple',
          },
        ],
        internalType: 'struct TokenInput',
        name: 'input',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'limitRouter',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'epsSkipMarket',
            type: 'uint256',
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: 'uint256',
                    name: 'salt',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'expiry',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'nonce',
                    type: 'uint256',
                  },
                  {
                    internalType: 'enum ILimitOrderType.OrderType',
                    name: 'orderType',
                    type: 'uint8',
                  },
                  {
                    internalType: 'address',
                    name: 'token',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'YT',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'maker',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'receiver',
                    type: 'address',
                  },
                  {
                    internalType: 'uint256',
                    name: 'makingAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'lnImpliedRate',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'failSafeRate',
                    type: 'uint256',
                  },
                  {
                    internalType: 'bytes',
                    name: 'permit',
                    type: 'bytes',
                  },
                ],
                internalType: 'struct Order',
                name: 'order',
                type: 'tuple',
              },
              {
                internalType: 'bytes',
                name: 'signature',
                type: 'bytes',
              },
              {
                internalType: 'uint256',
                name: 'makingAmount',
                type: 'uint256',
              },
            ],
            internalType: 'struct FillOrderParams[]',
            name: 'normalFills',
            type: 'tuple[]',
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: 'uint256',
                    name: 'salt',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'expiry',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'nonce',
                    type: 'uint256',
                  },
                  {
                    internalType: 'enum ILimitOrderType.OrderType',
                    name: 'orderType',
                    type: 'uint8',
                  },
                  {
                    internalType: 'address',
                    name: 'token',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'YT',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'maker',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'receiver',
                    type: 'address',
                  },
                  {
                    internalType: 'uint256',
                    name: 'makingAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'lnImpliedRate',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'failSafeRate',
                    type: 'uint256',
                  },
                  {
                    internalType: 'bytes',
                    name: 'permit',
                    type: 'bytes',
                  },
                ],
                internalType: 'struct Order',
                name: 'order',
                type: 'tuple',
              },
              {
                internalType: 'bytes',
                name: 'signature',
                type: 'bytes',
              },
              {
                internalType: 'uint256',
                name: 'makingAmount',
                type: 'uint256',
              },
            ],
            internalType: 'struct FillOrderParams[]',
            name: 'flashFills',
            type: 'tuple[]',
          },
          {
            internalType: 'bytes',
            name: 'optData',
            type: 'bytes',
          },
        ],
        internalType: 'struct LimitOrderData',
        name: 'limit',
        type: 'tuple',
      },
    ],
    name: 'addLiquiditySingleToken',
    outputs: [
      {
        internalType: 'uint256',
        name: 'netLpOut',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'netSyFee',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'netSyInterm',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'market',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'minLpOut',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'minYtOut',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'tokenIn',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'netTokenIn',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'tokenMintSy',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'swapAggregator',
            type: 'address',
          },
          {
            components: [
              {
                internalType: 'enum SwapType',
                name: 'swapType',
                type: 'uint8',
              },
              {
                internalType: 'address',
                name: 'extRouter',
                type: 'address',
              },
              {
                internalType: 'bytes',
                name: 'extCalldata',
                type: 'bytes',
              },
              {
                internalType: 'bool',
                name: 'needScale',
                type: 'bool',
              },
            ],
            internalType: 'struct SwapData',
            name: 'swapData',
            type: 'tuple',
          },
        ],
        internalType: 'struct TokenInput',
        name: 'input',
        type: 'tuple',
      },
    ],
    name: 'addLiquiditySingleTokenKeepYt',
    outputs: [
      {
        internalType: 'uint256',
        name: 'netLpOut',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'netYtOut',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'netSyMintPy',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'netSyInterm',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: 'markets',
        type: 'address[]',
      },
    ],
    name: 'boostMarkets',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'claimOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'actualMaking',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'actualTaking',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'totalFee',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'limitRouterCallback',
    outputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'YT',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'netSyIn',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'minPyOut',
        type: 'uint256',
      },
    ],
    name: 'mintPyFromSy',
    outputs: [
      {
        internalType: 'uint256',
        name: 'netPyOut',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'YT',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'minPyOut',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'tokenIn',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'netTokenIn',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'tokenMintSy',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'swapAggregator',
            type: 'address',
          },
          {
            components: [
              {
                internalType: 'enum SwapType',
                name: 'swapType',
                type: 'uint8',
              },
              {
                internalType: 'address',
                name: 'extRouter',
                type: 'address',
              },
              {
                internalType: 'bytes',
                name: 'extCalldata',
                type: 'bytes',
              },
              {
                internalType: 'bool',
                name: 'needScale',
                type: 'bool',
              },
            ],
            internalType: 'struct SwapData',
            name: 'swapData',
            type: 'tuple',
          },
        ],
        internalType: 'struct TokenInput',
        name: 'input',
        type: 'tuple',
      },
    ],
    name: 'mintPyFromToken',
    outputs: [
      {
        internalType: 'uint256',
        name: 'netPyOut',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'netSyInterm',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'SY',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'minSyOut',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'tokenIn',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'netTokenIn',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'tokenMintSy',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'swapAggregator',
            type: 'address',
          },
          {
            components: [
              {
                internalType: 'enum SwapType',
                name: 'swapType',
                type: 'uint8',
              },
              {
                internalType: 'address',
                name: 'extRouter',
                type: 'address',
              },
              {
                internalType: 'bytes',
                name: 'extCalldata',
                type: 'bytes',
              },
              {
                internalType: 'bool',
                name: 'needScale',
                type: 'bool',
              },
            ],
            internalType: 'struct SwapData',
            name: 'swapData',
            type: 'tuple',
          },
        ],
        internalType: 'struct TokenInput',
        name: 'input',
        type: 'tuple',
      },
    ],
    name: 'mintSyFromToken',
    outputs: [
      {
        internalType: 'uint256',
        name: 'netSyOut',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'bool',
            name: 'allowFailure',
            type: 'bool',
          },
          {
            internalType: 'bytes',
            name: 'callData',
            type: 'bytes',
          },
        ],
        internalType: 'struct IActionMisc.Call3[]',
        name: 'calls',
        type: 'tuple[]',
      },
    ],
    name: 'multicall',
    outputs: [
      {
        components: [
          {
            internalType: 'bool',
            name: 'success',
            type: 'bool',
          },
          {
            internalType: 'bytes',
            name: 'returnData',
            type: 'bytes',
          },
        ],
        internalType: 'struct IActionMisc.Result[]',
        name: 'res',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
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
    inputs: [],
    name: 'pendingOwner',
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
        name: 'market',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'YT',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'exactPtIn',
        type: 'uint256',
      },
    ],
    name: 'previewSwapPtForSy',
    outputs: [
      {
        internalType: 'uint256',
        name: 'netSyOut',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'netSyFee',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'market',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'YT',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_totalPtIn',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_netSyHolding',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'guessMin',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'guessMax',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'guessOffchain',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'maxIteration',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'eps',
            type: 'uint256',
          },
        ],
        internalType: 'struct ApproxParams',
        name: 'guessPtOut',
        type: 'tuple',
      },
    ],
    name: 'previewSwapPtToAddLiquidity',
    outputs: [
      {
        internalType: 'uint256',
        name: 'lpToReserve',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'lpToAccount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'netSyFee',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'market',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'YT',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'exactSyIn',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'guessMin',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'guessMax',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'guessOffchain',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'maxIteration',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'eps',
            type: 'uint256',
          },
        ],
        internalType: 'struct ApproxParams',
        name: 'guessPtOut',
        type: 'tuple',
      },
    ],
    name: 'previewSwapSyForPt',
    outputs: [
      {
        internalType: 'uint256',
        name: 'netPtOut',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'netSyFee',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'market',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'YT',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'exactSyIn',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'guessMin',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'guessMax',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'guessOffchain',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'maxIteration',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'eps',
            type: 'uint256',
          },
        ],
        internalType: 'struct ApproxParams',
        name: 'guessYtOut',
        type: 'tuple',
      },
    ],
    name: 'previewSwapSyForYt',
    outputs: [
      {
        internalType: 'uint256',
        name: 'netYtOut',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'netSyFee',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'market',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'YT',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_totalSyIn',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_netPtHolding',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'guessMin',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'guessMax',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'guessOffchain',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'maxIteration',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'eps',
            type: 'uint256',
          },
        ],
        internalType: 'struct ApproxParams',
        name: 'guessPtOut',
        type: 'tuple',
      },
    ],
    name: 'previewSwapSyToAddLiquidity',
    outputs: [
      {
        internalType: 'uint256',
        name: 'lpToReserve',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'lpToAccount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'netSyFee',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'market',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'YT',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'exactYtIn',
        type: 'uint256',
      },
    ],
    name: 'previewSwapYtForSy',
    outputs: [
      {
        internalType: 'uint256',
        name: 'netSyOut',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'netSyFee',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        internalType: 'address[]',
        name: 'sys',
        type: 'address[]',
      },
      {
        internalType: 'address[]',
        name: 'yts',
        type: 'address[]',
      },
      {
        internalType: 'address[]',
        name: 'markets',
        type: 'address[]',
      },
    ],
    name: 'redeemDueInterestAndRewards',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'YT',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'netPyIn',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'minSyOut',
        type: 'uint256',
      },
    ],
    name: 'redeemPyToSy',
    outputs: [
      {
        internalType: 'uint256',
        name: 'netSyOut',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'YT',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'netPyIn',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'tokenOut',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'minTokenOut',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'tokenRedeemSy',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'swapAggregator',
            type: 'address',
          },
          {
            components: [
              {
                internalType: 'enum SwapType',
                name: 'swapType',
                type: 'uint8',
              },
              {
                internalType: 'address',
                name: 'extRouter',
                type: 'address',
              },
              {
                internalType: 'bytes',
                name: 'extCalldata',
                type: 'bytes',
              },
              {
                internalType: 'bool',
                name: 'needScale',
                type: 'bool',
              },
            ],
            internalType: 'struct SwapData',
            name: 'swapData',
            type: 'tuple',
          },
        ],
        internalType: 'struct TokenOutput',
        name: 'output',
        type: 'tuple',
      },
    ],
    name: 'redeemPyToToken',
    outputs: [
      {
        internalType: 'uint256',
        name: 'netTokenOut',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'netSyInterm',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'SY',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'netSyIn',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'tokenOut',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'minTokenOut',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'tokenRedeemSy',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'swapAggregator',
            type: 'address',
          },
          {
            components: [
              {
                internalType: 'enum SwapType',
                name: 'swapType',
                type: 'uint8',
              },
              {
                internalType: 'address',
                name: 'extRouter',
                type: 'address',
              },
              {
                internalType: 'bytes',
                name: 'extCalldata',
                type: 'bytes',
              },
              {
                internalType: 'bool',
                name: 'needScale',
                type: 'bool',
              },
            ],
            internalType: 'struct SwapData',
            name: 'swapData',
            type: 'tuple',
          },
        ],
        internalType: 'struct TokenOutput',
        name: 'output',
        type: 'tuple',
      },
    ],
    name: 'redeemSyToToken',
    outputs: [
      {
        internalType: 'uint256',
        name: 'netTokenOut',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'market',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'netLpToRemove',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'minSyOut',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'minPtOut',
        type: 'uint256',
      },
    ],
    name: 'removeLiquidityDualSyAndPt',
    outputs: [
      {
        internalType: 'uint256',
        name: 'netSyOut',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'netPtOut',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'market',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'netLpToRemove',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'tokenOut',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'minTokenOut',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'tokenRedeemSy',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'swapAggregator',
            type: 'address',
          },
          {
            components: [
              {
                internalType: 'enum SwapType',
                name: 'swapType',
                type: 'uint8',
              },
              {
                internalType: 'address',
                name: 'extRouter',
                type: 'address',
              },
              {
                internalType: 'bytes',
                name: 'extCalldata',
                type: 'bytes',
              },
              {
                internalType: 'bool',
                name: 'needScale',
                type: 'bool',
              },
            ],
            internalType: 'struct SwapData',
            name: 'swapData',
            type: 'tuple',
          },
        ],
        internalType: 'struct TokenOutput',
        name: 'output',
        type: 'tuple',
      },
      {
        internalType: 'uint256',
        name: 'minPtOut',
        type: 'uint256',
      },
    ],
    name: 'removeLiquidityDualTokenAndPt',
    outputs: [
      {
        internalType: 'uint256',
        name: 'netTokenOut',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'netPtOut',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'netSyInterm',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'market',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'netLpToRemove',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'minPtOut',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'guessMin',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'guessMax',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'guessOffchain',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'maxIteration',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'eps',
            type: 'uint256',
          },
        ],
        internalType: 'struct ApproxParams',
        name: 'guessPtReceivedFromSy',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'limitRouter',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'epsSkipMarket',
            type: 'uint256',
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: 'uint256',
                    name: 'salt',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'expiry',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'nonce',
                    type: 'uint256',
                  },
                  {
                    internalType: 'enum ILimitOrderType.OrderType',
                    name: 'orderType',
                    type: 'uint8',
                  },
                  {
                    internalType: 'address',
                    name: 'token',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'YT',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'maker',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'receiver',
                    type: 'address',
                  },
                  {
                    internalType: 'uint256',
                    name: 'makingAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'lnImpliedRate',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'failSafeRate',
                    type: 'uint256',
                  },
                  {
                    internalType: 'bytes',
                    name: 'permit',
                    type: 'bytes',
                  },
                ],
                internalType: 'struct Order',
                name: 'order',
                type: 'tuple',
              },
              {
                internalType: 'bytes',
                name: 'signature',
                type: 'bytes',
              },
              {
                internalType: 'uint256',
                name: 'makingAmount',
                type: 'uint256',
              },
            ],
            internalType: 'struct FillOrderParams[]',
            name: 'normalFills',
            type: 'tuple[]',
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: 'uint256',
                    name: 'salt',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'expiry',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'nonce',
                    type: 'uint256',
                  },
                  {
                    internalType: 'enum ILimitOrderType.OrderType',
                    name: 'orderType',
                    type: 'uint8',
                  },
                  {
                    internalType: 'address',
                    name: 'token',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'YT',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'maker',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'receiver',
                    type: 'address',
                  },
                  {
                    internalType: 'uint256',
                    name: 'makingAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'lnImpliedRate',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'failSafeRate',
                    type: 'uint256',
                  },
                  {
                    internalType: 'bytes',
                    name: 'permit',
                    type: 'bytes',
                  },
                ],
                internalType: 'struct Order',
                name: 'order',
                type: 'tuple',
              },
              {
                internalType: 'bytes',
                name: 'signature',
                type: 'bytes',
              },
              {
                internalType: 'uint256',
                name: 'makingAmount',
                type: 'uint256',
              },
            ],
            internalType: 'struct FillOrderParams[]',
            name: 'flashFills',
            type: 'tuple[]',
          },
          {
            internalType: 'bytes',
            name: 'optData',
            type: 'bytes',
          },
        ],
        internalType: 'struct LimitOrderData',
        name: 'limit',
        type: 'tuple',
      },
    ],
    name: 'removeLiquiditySinglePt',
    outputs: [
      {
        internalType: 'uint256',
        name: 'netPtOut',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'netSyFee',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'market',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'netLpToRemove',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'minSyOut',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'limitRouter',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'epsSkipMarket',
            type: 'uint256',
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: 'uint256',
                    name: 'salt',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'expiry',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'nonce',
                    type: 'uint256',
                  },
                  {
                    internalType: 'enum ILimitOrderType.OrderType',
                    name: 'orderType',
                    type: 'uint8',
                  },
                  {
                    internalType: 'address',
                    name: 'token',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'YT',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'maker',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'receiver',
                    type: 'address',
                  },
                  {
                    internalType: 'uint256',
                    name: 'makingAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'lnImpliedRate',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'failSafeRate',
                    type: 'uint256',
                  },
                  {
                    internalType: 'bytes',
                    name: 'permit',
                    type: 'bytes',
                  },
                ],
                internalType: 'struct Order',
                name: 'order',
                type: 'tuple',
              },
              {
                internalType: 'bytes',
                name: 'signature',
                type: 'bytes',
              },
              {
                internalType: 'uint256',
                name: 'makingAmount',
                type: 'uint256',
              },
            ],
            internalType: 'struct FillOrderParams[]',
            name: 'normalFills',
            type: 'tuple[]',
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: 'uint256',
                    name: 'salt',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'expiry',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'nonce',
                    type: 'uint256',
                  },
                  {
                    internalType: 'enum ILimitOrderType.OrderType',
                    name: 'orderType',
                    type: 'uint8',
                  },
                  {
                    internalType: 'address',
                    name: 'token',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'YT',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'maker',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'receiver',
                    type: 'address',
                  },
                  {
                    internalType: 'uint256',
                    name: 'makingAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'lnImpliedRate',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'failSafeRate',
                    type: 'uint256',
                  },
                  {
                    internalType: 'bytes',
                    name: 'permit',
                    type: 'bytes',
                  },
                ],
                internalType: 'struct Order',
                name: 'order',
                type: 'tuple',
              },
              {
                internalType: 'bytes',
                name: 'signature',
                type: 'bytes',
              },
              {
                internalType: 'uint256',
                name: 'makingAmount',
                type: 'uint256',
              },
            ],
            internalType: 'struct FillOrderParams[]',
            name: 'flashFills',
            type: 'tuple[]',
          },
          {
            internalType: 'bytes',
            name: 'optData',
            type: 'bytes',
          },
        ],
        internalType: 'struct LimitOrderData',
        name: 'limit',
        type: 'tuple',
      },
    ],
    name: 'removeLiquiditySingleSy',
    outputs: [
      {
        internalType: 'uint256',
        name: 'netSyOut',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'netSyFee',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'market',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'netLpToRemove',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'tokenOut',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'minTokenOut',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'tokenRedeemSy',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'swapAggregator',
            type: 'address',
          },
          {
            components: [
              {
                internalType: 'enum SwapType',
                name: 'swapType',
                type: 'uint8',
              },
              {
                internalType: 'address',
                name: 'extRouter',
                type: 'address',
              },
              {
                internalType: 'bytes',
                name: 'extCalldata',
                type: 'bytes',
              },
              {
                internalType: 'bool',
                name: 'needScale',
                type: 'bool',
              },
            ],
            internalType: 'struct SwapData',
            name: 'swapData',
            type: 'tuple',
          },
        ],
        internalType: 'struct TokenOutput',
        name: 'output',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'limitRouter',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'epsSkipMarket',
            type: 'uint256',
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: 'uint256',
                    name: 'salt',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'expiry',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'nonce',
                    type: 'uint256',
                  },
                  {
                    internalType: 'enum ILimitOrderType.OrderType',
                    name: 'orderType',
                    type: 'uint8',
                  },
                  {
                    internalType: 'address',
                    name: 'token',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'YT',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'maker',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'receiver',
                    type: 'address',
                  },
                  {
                    internalType: 'uint256',
                    name: 'makingAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'lnImpliedRate',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'failSafeRate',
                    type: 'uint256',
                  },
                  {
                    internalType: 'bytes',
                    name: 'permit',
                    type: 'bytes',
                  },
                ],
                internalType: 'struct Order',
                name: 'order',
                type: 'tuple',
              },
              {
                internalType: 'bytes',
                name: 'signature',
                type: 'bytes',
              },
              {
                internalType: 'uint256',
                name: 'makingAmount',
                type: 'uint256',
              },
            ],
            internalType: 'struct FillOrderParams[]',
            name: 'normalFills',
            type: 'tuple[]',
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: 'uint256',
                    name: 'salt',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'expiry',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'nonce',
                    type: 'uint256',
                  },
                  {
                    internalType: 'enum ILimitOrderType.OrderType',
                    name: 'orderType',
                    type: 'uint8',
                  },
                  {
                    internalType: 'address',
                    name: 'token',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'YT',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'maker',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'receiver',
                    type: 'address',
                  },
                  {
                    internalType: 'uint256',
                    name: 'makingAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'lnImpliedRate',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'failSafeRate',
                    type: 'uint256',
                  },
                  {
                    internalType: 'bytes',
                    name: 'permit',
                    type: 'bytes',
                  },
                ],
                internalType: 'struct Order',
                name: 'order',
                type: 'tuple',
              },
              {
                internalType: 'bytes',
                name: 'signature',
                type: 'bytes',
              },
              {
                internalType: 'uint256',
                name: 'makingAmount',
                type: 'uint256',
              },
            ],
            internalType: 'struct FillOrderParams[]',
            name: 'flashFills',
            type: 'tuple[]',
          },
          {
            internalType: 'bytes',
            name: 'optData',
            type: 'bytes',
          },
        ],
        internalType: 'struct LimitOrderData',
        name: 'limit',
        type: 'tuple',
      },
    ],
    name: 'removeLiquiditySingleToken',
    outputs: [
      {
        internalType: 'uint256',
        name: 'netTokenOut',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'netSyFee',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'netSyInterm',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'selector',
        type: 'bytes4',
      },
    ],
    name: 'selectorToFacet',
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
        components: [
          {
            internalType: 'address',
            name: 'facet',
            type: 'address',
          },
          {
            internalType: 'bytes4[]',
            name: 'selectors',
            type: 'bytes4[]',
          },
        ],
        internalType: 'struct IActionStorage.SelectorsToFacet[]',
        name: 'arr',
        type: 'tuple[]',
      },
    ],
    name: 'setSelectorToFacets',
    outputs: [],
    stateMutability: 'nonpayable',
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
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'simulate',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'int256',
        name: 'ptToAccount',
        type: 'int256',
      },
      {
        internalType: 'int256',
        name: 'syToAccount',
        type: 'int256',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'swapCallback',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'market',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'exactPtIn',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'minSyOut',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'limitRouter',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'epsSkipMarket',
            type: 'uint256',
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: 'uint256',
                    name: 'salt',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'expiry',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'nonce',
                    type: 'uint256',
                  },
                  {
                    internalType: 'enum ILimitOrderType.OrderType',
                    name: 'orderType',
                    type: 'uint8',
                  },
                  {
                    internalType: 'address',
                    name: 'token',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'YT',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'maker',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'receiver',
                    type: 'address',
                  },
                  {
                    internalType: 'uint256',
                    name: 'makingAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'lnImpliedRate',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'failSafeRate',
                    type: 'uint256',
                  },
                  {
                    internalType: 'bytes',
                    name: 'permit',
                    type: 'bytes',
                  },
                ],
                internalType: 'struct Order',
                name: 'order',
                type: 'tuple',
              },
              {
                internalType: 'bytes',
                name: 'signature',
                type: 'bytes',
              },
              {
                internalType: 'uint256',
                name: 'makingAmount',
                type: 'uint256',
              },
            ],
            internalType: 'struct FillOrderParams[]',
            name: 'normalFills',
            type: 'tuple[]',
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: 'uint256',
                    name: 'salt',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'expiry',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'nonce',
                    type: 'uint256',
                  },
                  {
                    internalType: 'enum ILimitOrderType.OrderType',
                    name: 'orderType',
                    type: 'uint8',
                  },
                  {
                    internalType: 'address',
                    name: 'token',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'YT',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'maker',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'receiver',
                    type: 'address',
                  },
                  {
                    internalType: 'uint256',
                    name: 'makingAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'lnImpliedRate',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'failSafeRate',
                    type: 'uint256',
                  },
                  {
                    internalType: 'bytes',
                    name: 'permit',
                    type: 'bytes',
                  },
                ],
                internalType: 'struct Order',
                name: 'order',
                type: 'tuple',
              },
              {
                internalType: 'bytes',
                name: 'signature',
                type: 'bytes',
              },
              {
                internalType: 'uint256',
                name: 'makingAmount',
                type: 'uint256',
              },
            ],
            internalType: 'struct FillOrderParams[]',
            name: 'flashFills',
            type: 'tuple[]',
          },
          {
            internalType: 'bytes',
            name: 'optData',
            type: 'bytes',
          },
        ],
        internalType: 'struct LimitOrderData',
        name: 'limit',
        type: 'tuple',
      },
    ],
    name: 'swapExactPtForSy',
    outputs: [
      {
        internalType: 'uint256',
        name: 'netSyOut',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'netSyFee',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'market',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'exactPtIn',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'tokenOut',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'minTokenOut',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'tokenRedeemSy',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'swapAggregator',
            type: 'address',
          },
          {
            components: [
              {
                internalType: 'enum SwapType',
                name: 'swapType',
                type: 'uint8',
              },
              {
                internalType: 'address',
                name: 'extRouter',
                type: 'address',
              },
              {
                internalType: 'bytes',
                name: 'extCalldata',
                type: 'bytes',
              },
              {
                internalType: 'bool',
                name: 'needScale',
                type: 'bool',
              },
            ],
            internalType: 'struct SwapData',
            name: 'swapData',
            type: 'tuple',
          },
        ],
        internalType: 'struct TokenOutput',
        name: 'output',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'limitRouter',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'epsSkipMarket',
            type: 'uint256',
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: 'uint256',
                    name: 'salt',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'expiry',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'nonce',
                    type: 'uint256',
                  },
                  {
                    internalType: 'enum ILimitOrderType.OrderType',
                    name: 'orderType',
                    type: 'uint8',
                  },
                  {
                    internalType: 'address',
                    name: 'token',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'YT',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'maker',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'receiver',
                    type: 'address',
                  },
                  {
                    internalType: 'uint256',
                    name: 'makingAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'lnImpliedRate',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'failSafeRate',
                    type: 'uint256',
                  },
                  {
                    internalType: 'bytes',
                    name: 'permit',
                    type: 'bytes',
                  },
                ],
                internalType: 'struct Order',
                name: 'order',
                type: 'tuple',
              },
              {
                internalType: 'bytes',
                name: 'signature',
                type: 'bytes',
              },
              {
                internalType: 'uint256',
                name: 'makingAmount',
                type: 'uint256',
              },
            ],
            internalType: 'struct FillOrderParams[]',
            name: 'normalFills',
            type: 'tuple[]',
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: 'uint256',
                    name: 'salt',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'expiry',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'nonce',
                    type: 'uint256',
                  },
                  {
                    internalType: 'enum ILimitOrderType.OrderType',
                    name: 'orderType',
                    type: 'uint8',
                  },
                  {
                    internalType: 'address',
                    name: 'token',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'YT',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'maker',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'receiver',
                    type: 'address',
                  },
                  {
                    internalType: 'uint256',
                    name: 'makingAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'lnImpliedRate',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'failSafeRate',
                    type: 'uint256',
                  },
                  {
                    internalType: 'bytes',
                    name: 'permit',
                    type: 'bytes',
                  },
                ],
                internalType: 'struct Order',
                name: 'order',
                type: 'tuple',
              },
              {
                internalType: 'bytes',
                name: 'signature',
                type: 'bytes',
              },
              {
                internalType: 'uint256',
                name: 'makingAmount',
                type: 'uint256',
              },
            ],
            internalType: 'struct FillOrderParams[]',
            name: 'flashFills',
            type: 'tuple[]',
          },
          {
            internalType: 'bytes',
            name: 'optData',
            type: 'bytes',
          },
        ],
        internalType: 'struct LimitOrderData',
        name: 'limit',
        type: 'tuple',
      },
    ],
    name: 'swapExactPtForToken',
    outputs: [
      {
        internalType: 'uint256',
        name: 'netTokenOut',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'netSyFee',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'netSyInterm',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'market',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'exactPtIn',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'minYtOut',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'guessMin',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'guessMax',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'guessOffchain',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'maxIteration',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'eps',
            type: 'uint256',
          },
        ],
        internalType: 'struct ApproxParams',
        name: 'guessTotalPtToSwap',
        type: 'tuple',
      },
    ],
    name: 'swapExactPtForYt',
    outputs: [
      {
        internalType: 'uint256',
        name: 'netYtOut',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'netSyFee',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'market',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'exactSyIn',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'minPtOut',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'guessMin',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'guessMax',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'guessOffchain',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'maxIteration',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'eps',
            type: 'uint256',
          },
        ],
        internalType: 'struct ApproxParams',
        name: 'guessPtOut',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'limitRouter',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'epsSkipMarket',
            type: 'uint256',
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: 'uint256',
                    name: 'salt',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'expiry',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'nonce',
                    type: 'uint256',
                  },
                  {
                    internalType: 'enum ILimitOrderType.OrderType',
                    name: 'orderType',
                    type: 'uint8',
                  },
                  {
                    internalType: 'address',
                    name: 'token',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'YT',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'maker',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'receiver',
                    type: 'address',
                  },
                  {
                    internalType: 'uint256',
                    name: 'makingAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'lnImpliedRate',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'failSafeRate',
                    type: 'uint256',
                  },
                  {
                    internalType: 'bytes',
                    name: 'permit',
                    type: 'bytes',
                  },
                ],
                internalType: 'struct Order',
                name: 'order',
                type: 'tuple',
              },
              {
                internalType: 'bytes',
                name: 'signature',
                type: 'bytes',
              },
              {
                internalType: 'uint256',
                name: 'makingAmount',
                type: 'uint256',
              },
            ],
            internalType: 'struct FillOrderParams[]',
            name: 'normalFills',
            type: 'tuple[]',
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: 'uint256',
                    name: 'salt',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'expiry',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'nonce',
                    type: 'uint256',
                  },
                  {
                    internalType: 'enum ILimitOrderType.OrderType',
                    name: 'orderType',
                    type: 'uint8',
                  },
                  {
                    internalType: 'address',
                    name: 'token',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'YT',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'maker',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'receiver',
                    type: 'address',
                  },
                  {
                    internalType: 'uint256',
                    name: 'makingAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'lnImpliedRate',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'failSafeRate',
                    type: 'uint256',
                  },
                  {
                    internalType: 'bytes',
                    name: 'permit',
                    type: 'bytes',
                  },
                ],
                internalType: 'struct Order',
                name: 'order',
                type: 'tuple',
              },
              {
                internalType: 'bytes',
                name: 'signature',
                type: 'bytes',
              },
              {
                internalType: 'uint256',
                name: 'makingAmount',
                type: 'uint256',
              },
            ],
            internalType: 'struct FillOrderParams[]',
            name: 'flashFills',
            type: 'tuple[]',
          },
          {
            internalType: 'bytes',
            name: 'optData',
            type: 'bytes',
          },
        ],
        internalType: 'struct LimitOrderData',
        name: 'limit',
        type: 'tuple',
      },
    ],
    name: 'swapExactSyForPt',
    outputs: [
      {
        internalType: 'uint256',
        name: 'netPtOut',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'netSyFee',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'market',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'exactSyIn',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'minYtOut',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'guessMin',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'guessMax',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'guessOffchain',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'maxIteration',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'eps',
            type: 'uint256',
          },
        ],
        internalType: 'struct ApproxParams',
        name: 'guessYtOut',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'limitRouter',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'epsSkipMarket',
            type: 'uint256',
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: 'uint256',
                    name: 'salt',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'expiry',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'nonce',
                    type: 'uint256',
                  },
                  {
                    internalType: 'enum ILimitOrderType.OrderType',
                    name: 'orderType',
                    type: 'uint8',
                  },
                  {
                    internalType: 'address',
                    name: 'token',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'YT',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'maker',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'receiver',
                    type: 'address',
                  },
                  {
                    internalType: 'uint256',
                    name: 'makingAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'lnImpliedRate',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'failSafeRate',
                    type: 'uint256',
                  },
                  {
                    internalType: 'bytes',
                    name: 'permit',
                    type: 'bytes',
                  },
                ],
                internalType: 'struct Order',
                name: 'order',
                type: 'tuple',
              },
              {
                internalType: 'bytes',
                name: 'signature',
                type: 'bytes',
              },
              {
                internalType: 'uint256',
                name: 'makingAmount',
                type: 'uint256',
              },
            ],
            internalType: 'struct FillOrderParams[]',
            name: 'normalFills',
            type: 'tuple[]',
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: 'uint256',
                    name: 'salt',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'expiry',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'nonce',
                    type: 'uint256',
                  },
                  {
                    internalType: 'enum ILimitOrderType.OrderType',
                    name: 'orderType',
                    type: 'uint8',
                  },
                  {
                    internalType: 'address',
                    name: 'token',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'YT',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'maker',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'receiver',
                    type: 'address',
                  },
                  {
                    internalType: 'uint256',
                    name: 'makingAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'lnImpliedRate',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'failSafeRate',
                    type: 'uint256',
                  },
                  {
                    internalType: 'bytes',
                    name: 'permit',
                    type: 'bytes',
                  },
                ],
                internalType: 'struct Order',
                name: 'order',
                type: 'tuple',
              },
              {
                internalType: 'bytes',
                name: 'signature',
                type: 'bytes',
              },
              {
                internalType: 'uint256',
                name: 'makingAmount',
                type: 'uint256',
              },
            ],
            internalType: 'struct FillOrderParams[]',
            name: 'flashFills',
            type: 'tuple[]',
          },
          {
            internalType: 'bytes',
            name: 'optData',
            type: 'bytes',
          },
        ],
        internalType: 'struct LimitOrderData',
        name: 'limit',
        type: 'tuple',
      },
    ],
    name: 'swapExactSyForYt',
    outputs: [
      {
        internalType: 'uint256',
        name: 'netYtOut',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'netSyFee',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'market',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'minPtOut',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'guessMin',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'guessMax',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'guessOffchain',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'maxIteration',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'eps',
            type: 'uint256',
          },
        ],
        internalType: 'struct ApproxParams',
        name: 'guessPtOut',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'tokenIn',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'netTokenIn',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'tokenMintSy',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'swapAggregator',
            type: 'address',
          },
          {
            components: [
              {
                internalType: 'enum SwapType',
                name: 'swapType',
                type: 'uint8',
              },
              {
                internalType: 'address',
                name: 'extRouter',
                type: 'address',
              },
              {
                internalType: 'bytes',
                name: 'extCalldata',
                type: 'bytes',
              },
              {
                internalType: 'bool',
                name: 'needScale',
                type: 'bool',
              },
            ],
            internalType: 'struct SwapData',
            name: 'swapData',
            type: 'tuple',
          },
        ],
        internalType: 'struct TokenInput',
        name: 'input',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'limitRouter',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'epsSkipMarket',
            type: 'uint256',
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: 'uint256',
                    name: 'salt',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'expiry',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'nonce',
                    type: 'uint256',
                  },
                  {
                    internalType: 'enum ILimitOrderType.OrderType',
                    name: 'orderType',
                    type: 'uint8',
                  },
                  {
                    internalType: 'address',
                    name: 'token',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'YT',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'maker',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'receiver',
                    type: 'address',
                  },
                  {
                    internalType: 'uint256',
                    name: 'makingAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'lnImpliedRate',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'failSafeRate',
                    type: 'uint256',
                  },
                  {
                    internalType: 'bytes',
                    name: 'permit',
                    type: 'bytes',
                  },
                ],
                internalType: 'struct Order',
                name: 'order',
                type: 'tuple',
              },
              {
                internalType: 'bytes',
                name: 'signature',
                type: 'bytes',
              },
              {
                internalType: 'uint256',
                name: 'makingAmount',
                type: 'uint256',
              },
            ],
            internalType: 'struct FillOrderParams[]',
            name: 'normalFills',
            type: 'tuple[]',
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: 'uint256',
                    name: 'salt',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'expiry',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'nonce',
                    type: 'uint256',
                  },
                  {
                    internalType: 'enum ILimitOrderType.OrderType',
                    name: 'orderType',
                    type: 'uint8',
                  },
                  {
                    internalType: 'address',
                    name: 'token',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'YT',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'maker',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'receiver',
                    type: 'address',
                  },
                  {
                    internalType: 'uint256',
                    name: 'makingAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'lnImpliedRate',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'failSafeRate',
                    type: 'uint256',
                  },
                  {
                    internalType: 'bytes',
                    name: 'permit',
                    type: 'bytes',
                  },
                ],
                internalType: 'struct Order',
                name: 'order',
                type: 'tuple',
              },
              {
                internalType: 'bytes',
                name: 'signature',
                type: 'bytes',
              },
              {
                internalType: 'uint256',
                name: 'makingAmount',
                type: 'uint256',
              },
            ],
            internalType: 'struct FillOrderParams[]',
            name: 'flashFills',
            type: 'tuple[]',
          },
          {
            internalType: 'bytes',
            name: 'optData',
            type: 'bytes',
          },
        ],
        internalType: 'struct LimitOrderData',
        name: 'limit',
        type: 'tuple',
      },
    ],
    name: 'swapExactTokenForPt',
    outputs: [
      {
        internalType: 'uint256',
        name: 'netPtOut',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'netSyFee',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'netSyInterm',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'market',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'minYtOut',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'guessMin',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'guessMax',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'guessOffchain',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'maxIteration',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'eps',
            type: 'uint256',
          },
        ],
        internalType: 'struct ApproxParams',
        name: 'guessYtOut',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'tokenIn',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'netTokenIn',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'tokenMintSy',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'swapAggregator',
            type: 'address',
          },
          {
            components: [
              {
                internalType: 'enum SwapType',
                name: 'swapType',
                type: 'uint8',
              },
              {
                internalType: 'address',
                name: 'extRouter',
                type: 'address',
              },
              {
                internalType: 'bytes',
                name: 'extCalldata',
                type: 'bytes',
              },
              {
                internalType: 'bool',
                name: 'needScale',
                type: 'bool',
              },
            ],
            internalType: 'struct SwapData',
            name: 'swapData',
            type: 'tuple',
          },
        ],
        internalType: 'struct TokenInput',
        name: 'input',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'limitRouter',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'epsSkipMarket',
            type: 'uint256',
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: 'uint256',
                    name: 'salt',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'expiry',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'nonce',
                    type: 'uint256',
                  },
                  {
                    internalType: 'enum ILimitOrderType.OrderType',
                    name: 'orderType',
                    type: 'uint8',
                  },
                  {
                    internalType: 'address',
                    name: 'token',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'YT',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'maker',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'receiver',
                    type: 'address',
                  },
                  {
                    internalType: 'uint256',
                    name: 'makingAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'lnImpliedRate',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'failSafeRate',
                    type: 'uint256',
                  },
                  {
                    internalType: 'bytes',
                    name: 'permit',
                    type: 'bytes',
                  },
                ],
                internalType: 'struct Order',
                name: 'order',
                type: 'tuple',
              },
              {
                internalType: 'bytes',
                name: 'signature',
                type: 'bytes',
              },
              {
                internalType: 'uint256',
                name: 'makingAmount',
                type: 'uint256',
              },
            ],
            internalType: 'struct FillOrderParams[]',
            name: 'normalFills',
            type: 'tuple[]',
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: 'uint256',
                    name: 'salt',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'expiry',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'nonce',
                    type: 'uint256',
                  },
                  {
                    internalType: 'enum ILimitOrderType.OrderType',
                    name: 'orderType',
                    type: 'uint8',
                  },
                  {
                    internalType: 'address',
                    name: 'token',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'YT',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'maker',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'receiver',
                    type: 'address',
                  },
                  {
                    internalType: 'uint256',
                    name: 'makingAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'lnImpliedRate',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'failSafeRate',
                    type: 'uint256',
                  },
                  {
                    internalType: 'bytes',
                    name: 'permit',
                    type: 'bytes',
                  },
                ],
                internalType: 'struct Order',
                name: 'order',
                type: 'tuple',
              },
              {
                internalType: 'bytes',
                name: 'signature',
                type: 'bytes',
              },
              {
                internalType: 'uint256',
                name: 'makingAmount',
                type: 'uint256',
              },
            ],
            internalType: 'struct FillOrderParams[]',
            name: 'flashFills',
            type: 'tuple[]',
          },
          {
            internalType: 'bytes',
            name: 'optData',
            type: 'bytes',
          },
        ],
        internalType: 'struct LimitOrderData',
        name: 'limit',
        type: 'tuple',
      },
    ],
    name: 'swapExactTokenForYt',
    outputs: [
      {
        internalType: 'uint256',
        name: 'netYtOut',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'netSyFee',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'netSyInterm',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'market',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'exactYtIn',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'minPtOut',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'guessMin',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'guessMax',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'guessOffchain',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'maxIteration',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'eps',
            type: 'uint256',
          },
        ],
        internalType: 'struct ApproxParams',
        name: 'guessTotalPtFromSwap',
        type: 'tuple',
      },
    ],
    name: 'swapExactYtForPt',
    outputs: [
      {
        internalType: 'uint256',
        name: 'netPtOut',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'netSyFee',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'market',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'exactYtIn',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'minSyOut',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'limitRouter',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'epsSkipMarket',
            type: 'uint256',
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: 'uint256',
                    name: 'salt',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'expiry',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'nonce',
                    type: 'uint256',
                  },
                  {
                    internalType: 'enum ILimitOrderType.OrderType',
                    name: 'orderType',
                    type: 'uint8',
                  },
                  {
                    internalType: 'address',
                    name: 'token',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'YT',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'maker',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'receiver',
                    type: 'address',
                  },
                  {
                    internalType: 'uint256',
                    name: 'makingAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'lnImpliedRate',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'failSafeRate',
                    type: 'uint256',
                  },
                  {
                    internalType: 'bytes',
                    name: 'permit',
                    type: 'bytes',
                  },
                ],
                internalType: 'struct Order',
                name: 'order',
                type: 'tuple',
              },
              {
                internalType: 'bytes',
                name: 'signature',
                type: 'bytes',
              },
              {
                internalType: 'uint256',
                name: 'makingAmount',
                type: 'uint256',
              },
            ],
            internalType: 'struct FillOrderParams[]',
            name: 'normalFills',
            type: 'tuple[]',
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: 'uint256',
                    name: 'salt',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'expiry',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'nonce',
                    type: 'uint256',
                  },
                  {
                    internalType: 'enum ILimitOrderType.OrderType',
                    name: 'orderType',
                    type: 'uint8',
                  },
                  {
                    internalType: 'address',
                    name: 'token',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'YT',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'maker',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'receiver',
                    type: 'address',
                  },
                  {
                    internalType: 'uint256',
                    name: 'makingAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'lnImpliedRate',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'failSafeRate',
                    type: 'uint256',
                  },
                  {
                    internalType: 'bytes',
                    name: 'permit',
                    type: 'bytes',
                  },
                ],
                internalType: 'struct Order',
                name: 'order',
                type: 'tuple',
              },
              {
                internalType: 'bytes',
                name: 'signature',
                type: 'bytes',
              },
              {
                internalType: 'uint256',
                name: 'makingAmount',
                type: 'uint256',
              },
            ],
            internalType: 'struct FillOrderParams[]',
            name: 'flashFills',
            type: 'tuple[]',
          },
          {
            internalType: 'bytes',
            name: 'optData',
            type: 'bytes',
          },
        ],
        internalType: 'struct LimitOrderData',
        name: 'limit',
        type: 'tuple',
      },
    ],
    name: 'swapExactYtForSy',
    outputs: [
      {
        internalType: 'uint256',
        name: 'netSyOut',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'netSyFee',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'market',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'exactYtIn',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'tokenOut',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'minTokenOut',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'tokenRedeemSy',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'swapAggregator',
            type: 'address',
          },
          {
            components: [
              {
                internalType: 'enum SwapType',
                name: 'swapType',
                type: 'uint8',
              },
              {
                internalType: 'address',
                name: 'extRouter',
                type: 'address',
              },
              {
                internalType: 'bytes',
                name: 'extCalldata',
                type: 'bytes',
              },
              {
                internalType: 'bool',
                name: 'needScale',
                type: 'bool',
              },
            ],
            internalType: 'struct SwapData',
            name: 'swapData',
            type: 'tuple',
          },
        ],
        internalType: 'struct TokenOutput',
        name: 'output',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'limitRouter',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'epsSkipMarket',
            type: 'uint256',
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: 'uint256',
                    name: 'salt',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'expiry',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'nonce',
                    type: 'uint256',
                  },
                  {
                    internalType: 'enum ILimitOrderType.OrderType',
                    name: 'orderType',
                    type: 'uint8',
                  },
                  {
                    internalType: 'address',
                    name: 'token',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'YT',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'maker',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'receiver',
                    type: 'address',
                  },
                  {
                    internalType: 'uint256',
                    name: 'makingAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'lnImpliedRate',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'failSafeRate',
                    type: 'uint256',
                  },
                  {
                    internalType: 'bytes',
                    name: 'permit',
                    type: 'bytes',
                  },
                ],
                internalType: 'struct Order',
                name: 'order',
                type: 'tuple',
              },
              {
                internalType: 'bytes',
                name: 'signature',
                type: 'bytes',
              },
              {
                internalType: 'uint256',
                name: 'makingAmount',
                type: 'uint256',
              },
            ],
            internalType: 'struct FillOrderParams[]',
            name: 'normalFills',
            type: 'tuple[]',
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: 'uint256',
                    name: 'salt',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'expiry',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'nonce',
                    type: 'uint256',
                  },
                  {
                    internalType: 'enum ILimitOrderType.OrderType',
                    name: 'orderType',
                    type: 'uint8',
                  },
                  {
                    internalType: 'address',
                    name: 'token',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'YT',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'maker',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'receiver',
                    type: 'address',
                  },
                  {
                    internalType: 'uint256',
                    name: 'makingAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'lnImpliedRate',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'failSafeRate',
                    type: 'uint256',
                  },
                  {
                    internalType: 'bytes',
                    name: 'permit',
                    type: 'bytes',
                  },
                ],
                internalType: 'struct Order',
                name: 'order',
                type: 'tuple',
              },
              {
                internalType: 'bytes',
                name: 'signature',
                type: 'bytes',
              },
              {
                internalType: 'uint256',
                name: 'makingAmount',
                type: 'uint256',
              },
            ],
            internalType: 'struct FillOrderParams[]',
            name: 'flashFills',
            type: 'tuple[]',
          },
          {
            internalType: 'bytes',
            name: 'optData',
            type: 'bytes',
          },
        ],
        internalType: 'struct LimitOrderData',
        name: 'limit',
        type: 'tuple',
      },
    ],
    name: 'swapExactYtForToken',
    outputs: [
      {
        internalType: 'uint256',
        name: 'netTokenOut',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'netSyFee',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'netSyInterm',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'minTokenOut',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'tokenIn',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'netTokenIn',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'tokenMintSy',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'swapAggregator',
            type: 'address',
          },
          {
            components: [
              {
                internalType: 'enum SwapType',
                name: 'swapType',
                type: 'uint8',
              },
              {
                internalType: 'address',
                name: 'extRouter',
                type: 'address',
              },
              {
                internalType: 'bytes',
                name: 'extCalldata',
                type: 'bytes',
              },
              {
                internalType: 'bool',
                name: 'needScale',
                type: 'bool',
              },
            ],
            internalType: 'struct SwapData',
            name: 'swapData',
            type: 'tuple',
          },
        ],
        internalType: 'struct TokenInput',
        name: 'inp',
        type: 'tuple',
      },
    ],
    name: 'swapTokenToToken',
    outputs: [
      {
        internalType: 'uint256',
        name: 'netTokenOut',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'SY',
        type: 'address',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'tokenIn',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'netTokenIn',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'tokenMintSy',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'swapAggregator',
            type: 'address',
          },
          {
            components: [
              {
                internalType: 'enum SwapType',
                name: 'swapType',
                type: 'uint8',
              },
              {
                internalType: 'address',
                name: 'extRouter',
                type: 'address',
              },
              {
                internalType: 'bytes',
                name: 'extCalldata',
                type: 'bytes',
              },
              {
                internalType: 'bool',
                name: 'needScale',
                type: 'bool',
              },
            ],
            internalType: 'struct SwapData',
            name: 'swapData',
            type: 'tuple',
          },
        ],
        internalType: 'struct TokenInput',
        name: 'input',
        type: 'tuple',
      },
      {
        internalType: 'address',
        name: 'tokenRedeemSy',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'minTokenOut',
        type: 'uint256',
      },
    ],
    name: 'swapTokenToTokenViaSy',
    outputs: [
      {
        internalType: 'uint256',
        name: 'netTokenOut',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'netSyInterm',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: 'direct',
        type: 'bool',
      },
      {
        internalType: 'bool',
        name: 'renounce',
        type: 'bool',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;
