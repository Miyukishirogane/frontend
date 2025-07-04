export const abiTCVRouter = [
    {
        inputs: [
            {
                internalType: 'address',
                name: 'weth_',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'resolver_',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'permit2_',
                type: 'address',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'constructor',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'uint8',
                name: 'version',
                type: 'uint8',
            },
        ],
        name: 'Initialized',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'address',
                name: 'vault',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'address[]',
                name: 'blacklisted',
                type: 'address[]',
            },
        ],
        name: 'LogBlacklist',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'address',
                name: 'vault',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'supplyCap',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'bool',
                name: 'hasWhitelist',
                type: 'bool',
            },
        ],
        name: 'LogSetVault',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'address',
                name: 'vault',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'address[]',
                name: 'whitelisted',
                type: 'address[]',
            },
        ],
        name: 'LogWhitelist',
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
                indexed: false,
                internalType: 'address',
                name: 'account',
                type: 'address',
            },
        ],
        name: 'Paused',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'bool',
                name: 'zeroForOne',
                type: 'bool',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'amount0Diff',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'amount1Diff',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'amountOutSwap',
                type: 'uint256',
            },
        ],
        name: 'Swapped',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'address',
                name: 'account',
                type: 'address',
            },
        ],
        name: 'Unpaused',
        type: 'event',
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: 'uint256',
                        name: 'amount0Max',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'amount1Max',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'amount0Min',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'amount1Min',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'amountSharesMin',
                        type: 'uint256',
                    },
                    {
                        internalType: 'address',
                        name: 'vault',
                        type: 'address',
                    },
                    {
                        internalType: 'address',
                        name: 'receiver',
                        type: 'address',
                    },
                    {
                        internalType: 'address',
                        name: 'gauge',
                        type: 'address',
                    },
                ],
                internalType: 'struct AddLiquidityData',
                name: 'params_',
                type: 'tuple',
            },
        ],
        name: 'addLiquidity',
        outputs: [
            {
                internalType: 'uint256',
                name: 'amount0',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'amount1',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'sharesReceived',
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
                        components: [
                            {
                                internalType: 'uint256',
                                name: 'amount0Max',
                                type: 'uint256',
                            },
                            {
                                internalType: 'uint256',
                                name: 'amount1Max',
                                type: 'uint256',
                            },
                            {
                                internalType: 'uint256',
                                name: 'amount0Min',
                                type: 'uint256',
                            },
                            {
                                internalType: 'uint256',
                                name: 'amount1Min',
                                type: 'uint256',
                            },
                            {
                                internalType: 'uint256',
                                name: 'amountSharesMin',
                                type: 'uint256',
                            },
                            {
                                internalType: 'address',
                                name: 'vault',
                                type: 'address',
                            },
                            {
                                internalType: 'address',
                                name: 'receiver',
                                type: 'address',
                            },
                            {
                                internalType: 'address',
                                name: 'gauge',
                                type: 'address',
                            },
                        ],
                        internalType: 'struct AddLiquidityData',
                        name: 'addData',
                        type: 'tuple',
                    },
                    {
                        components: [
                            {
                                components: [
                                    {
                                        internalType: 'address',
                                        name: 'token',
                                        type: 'address',
                                    },
                                    {
                                        internalType: 'uint256',
                                        name: 'amount',
                                        type: 'uint256',
                                    },
                                ],
                                internalType: 'struct TokenPermissions[]',
                                name: 'permitted',
                                type: 'tuple[]',
                            },
                            {
                                internalType: 'uint256',
                                name: 'nonce',
                                type: 'uint256',
                            },
                            {
                                internalType: 'uint256',
                                name: 'deadline',
                                type: 'uint256',
                            },
                        ],
                        internalType: 'struct PermitBatchTransferFrom',
                        name: 'permit',
                        type: 'tuple',
                    },
                    {
                        internalType: 'bytes',
                        name: 'signature',
                        type: 'bytes',
                    },
                ],
                internalType: 'struct AddLiquidityPermit2Data',
                name: 'params_',
                type: 'tuple',
            },
        ],
        name: 'addLiquidityPermit2',
        outputs: [
            {
                internalType: 'uint256',
                name: 'amount0',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'amount1',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'sharesReceived',
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
                name: 'vault_',
                type: 'address',
            },
            {
                internalType: 'address[]',
                name: 'toBlacklist_',
                type: 'address[]',
            },
        ],
        name: 'blacklist',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'vault_',
                type: 'address',
            },
        ],
        name: 'getWhitelist',
        outputs: [
            {
                internalType: 'address[]',
                name: '',
                type: 'address[]',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'owner_',
                type: 'address',
            },
        ],
        name: 'initialize',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        name: 'mintRestrictedVaults',
        outputs: [
            {
                internalType: 'uint256',
                name: 'supplyCap',
                type: 'uint256',
            },
            {
                internalType: 'bool',
                name: 'hasWhitelist',
                type: 'bool',
            },
        ],
        stateMutability: 'view',
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
        name: 'pause',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'paused',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'permit2',
        outputs: [
            {
                internalType: 'contract IPermit2',
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
                        internalType: 'uint256',
                        name: 'burnAmount',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'amount0Min',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'amount1Min',
                        type: 'uint256',
                    },
                    {
                        internalType: 'address',
                        name: 'vault',
                        type: 'address',
                    },
                    {
                        internalType: 'address payable',
                        name: 'receiver',
                        type: 'address',
                    },
                    {
                        internalType: 'address',
                        name: 'gauge',
                        type: 'address',
                    },
                    {
                        internalType: 'bool',
                        name: 'receiveETH',
                        type: 'bool',
                    },
                ],
                internalType: 'struct RemoveLiquidityData',
                name: 'params_',
                type: 'tuple',
            },
        ],
        name: 'removeLiquidity',
        outputs: [
            {
                internalType: 'uint256',
                name: 'amount0',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'amount1',
                type: 'uint256',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                components: [
                    {
                        components: [
                            {
                                internalType: 'uint256',
                                name: 'burnAmount',
                                type: 'uint256',
                            },
                            {
                                internalType: 'uint256',
                                name: 'amount0Min',
                                type: 'uint256',
                            },
                            {
                                internalType: 'uint256',
                                name: 'amount1Min',
                                type: 'uint256',
                            },
                            {
                                internalType: 'address',
                                name: 'vault',
                                type: 'address',
                            },
                            {
                                internalType: 'address payable',
                                name: 'receiver',
                                type: 'address',
                            },
                            {
                                internalType: 'address',
                                name: 'gauge',
                                type: 'address',
                            },
                            {
                                internalType: 'bool',
                                name: 'receiveETH',
                                type: 'bool',
                            },
                        ],
                        internalType: 'struct RemoveLiquidityData',
                        name: 'removeData',
                        type: 'tuple',
                    },
                    {
                        components: [
                            {
                                components: [
                                    {
                                        internalType: 'address',
                                        name: 'token',
                                        type: 'address',
                                    },
                                    {
                                        internalType: 'uint256',
                                        name: 'amount',
                                        type: 'uint256',
                                    },
                                ],
                                internalType: 'struct TokenPermissions',
                                name: 'permitted',
                                type: 'tuple',
                            },
                            {
                                internalType: 'uint256',
                                name: 'nonce',
                                type: 'uint256',
                            },
                            {
                                internalType: 'uint256',
                                name: 'deadline',
                                type: 'uint256',
                            },
                        ],
                        internalType: 'struct PermitTransferFrom',
                        name: 'permit',
                        type: 'tuple',
                    },
                    {
                        internalType: 'bytes',
                        name: 'signature',
                        type: 'bytes',
                    },
                ],
                internalType: 'struct RemoveLiquidityPermit2Data',
                name: 'params_',
                type: 'tuple',
            },
        ],
        name: 'removeLiquidityPermit2',
        outputs: [
            {
                internalType: 'uint256',
                name: 'amount0',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'amount1',
                type: 'uint256',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'renounceOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'resolver',
        outputs: [
            {
                internalType: 'contract ITCVResolver',
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
                name: 'vault_',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'supplyCap_',
                type: 'uint256',
            },
            {
                internalType: 'bool',
                name: 'hasWhitelist_',
                type: 'bool',
            },
        ],
        name: 'setMintRules',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                components: [
                    {
                        components: [
                            {
                                internalType: 'bytes',
                                name: 'swapPayload',
                                type: 'bytes',
                            },
                            {
                                internalType: 'uint256',
                                name: 'amountInSwap',
                                type: 'uint256',
                            },
                            {
                                internalType: 'uint256',
                                name: 'amountOutSwap',
                                type: 'uint256',
                            },
                            {
                                internalType: 'address',
                                name: 'swapRouter',
                                type: 'address',
                            },
                            {
                                internalType: 'bool',
                                name: 'zeroForOne',
                                type: 'bool',
                            },
                        ],
                        internalType: 'struct SwapData',
                        name: 'swapData',
                        type: 'tuple',
                    },
                    {
                        components: [
                            {
                                internalType: 'uint256',
                                name: 'amount0Max',
                                type: 'uint256',
                            },
                            {
                                internalType: 'uint256',
                                name: 'amount1Max',
                                type: 'uint256',
                            },
                            {
                                internalType: 'uint256',
                                name: 'amount0Min',
                                type: 'uint256',
                            },
                            {
                                internalType: 'uint256',
                                name: 'amount1Min',
                                type: 'uint256',
                            },
                            {
                                internalType: 'uint256',
                                name: 'amountSharesMin',
                                type: 'uint256',
                            },
                            {
                                internalType: 'address',
                                name: 'vault',
                                type: 'address',
                            },
                            {
                                internalType: 'address',
                                name: 'receiver',
                                type: 'address',
                            },
                            {
                                internalType: 'address',
                                name: 'gauge',
                                type: 'address',
                            },
                        ],
                        internalType: 'struct AddLiquidityData',
                        name: 'addData',
                        type: 'tuple',
                    },
                ],
                internalType: 'struct SwapAndAddData',
                name: 'params_',
                type: 'tuple',
            },
        ],
        name: 'swapAndAddLiquidity',
        outputs: [
            {
                internalType: 'uint256',
                name: 'amount0',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'amount1',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'sharesReceived',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'amount0Diff',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'amount1Diff',
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
                        components: [
                            {
                                components: [
                                    {
                                        internalType: 'bytes',
                                        name: 'swapPayload',
                                        type: 'bytes',
                                    },
                                    {
                                        internalType: 'uint256',
                                        name: 'amountInSwap',
                                        type: 'uint256',
                                    },
                                    {
                                        internalType: 'uint256',
                                        name: 'amountOutSwap',
                                        type: 'uint256',
                                    },
                                    {
                                        internalType: 'address',
                                        name: 'swapRouter',
                                        type: 'address',
                                    },
                                    {
                                        internalType: 'bool',
                                        name: 'zeroForOne',
                                        type: 'bool',
                                    },
                                ],
                                internalType: 'struct SwapData',
                                name: 'swapData',
                                type: 'tuple',
                            },
                            {
                                components: [
                                    {
                                        internalType: 'uint256',
                                        name: 'amount0Max',
                                        type: 'uint256',
                                    },
                                    {
                                        internalType: 'uint256',
                                        name: 'amount1Max',
                                        type: 'uint256',
                                    },
                                    {
                                        internalType: 'uint256',
                                        name: 'amount0Min',
                                        type: 'uint256',
                                    },
                                    {
                                        internalType: 'uint256',
                                        name: 'amount1Min',
                                        type: 'uint256',
                                    },
                                    {
                                        internalType: 'uint256',
                                        name: 'amountSharesMin',
                                        type: 'uint256',
                                    },
                                    {
                                        internalType: 'address',
                                        name: 'vault',
                                        type: 'address',
                                    },
                                    {
                                        internalType: 'address',
                                        name: 'receiver',
                                        type: 'address',
                                    },
                                    {
                                        internalType: 'address',
                                        name: 'gauge',
                                        type: 'address',
                                    },
                                ],
                                internalType: 'struct AddLiquidityData',
                                name: 'addData',
                                type: 'tuple',
                            },
                        ],
                        internalType: 'struct SwapAndAddData',
                        name: 'swapAndAddData',
                        type: 'tuple',
                    },
                    {
                        components: [
                            {
                                components: [
                                    {
                                        internalType: 'address',
                                        name: 'token',
                                        type: 'address',
                                    },
                                    {
                                        internalType: 'uint256',
                                        name: 'amount',
                                        type: 'uint256',
                                    },
                                ],
                                internalType: 'struct TokenPermissions[]',
                                name: 'permitted',
                                type: 'tuple[]',
                            },
                            {
                                internalType: 'uint256',
                                name: 'nonce',
                                type: 'uint256',
                            },
                            {
                                internalType: 'uint256',
                                name: 'deadline',
                                type: 'uint256',
                            },
                        ],
                        internalType: 'struct PermitBatchTransferFrom',
                        name: 'permit',
                        type: 'tuple',
                    },
                    {
                        internalType: 'bytes',
                        name: 'signature',
                        type: 'bytes',
                    },
                ],
                internalType: 'struct SwapAndAddPermit2Data',
                name: 'params_',
                type: 'tuple',
            },
        ],
        name: 'swapAndAddLiquidityPermit2',
        outputs: [
            {
                internalType: 'uint256',
                name: 'amount0',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'amount1',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'sharesReceived',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'amount0Diff',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'amount1Diff',
                type: 'uint256',
            },
        ],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'swapper',
        outputs: [
            {
                internalType: 'contract IRouterSwapExecutor',
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
                name: 'newOwner',
                type: 'address',
            },
        ],
        name: 'transferOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'unpause',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'swapper_',
                type: 'address',
            },
        ],
        name: 'updateSwapExecutor',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'weth',
        outputs: [
            {
                internalType: 'contract IWETH',
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
                name: 'vault_',
                type: 'address',
            },
            {
                internalType: 'address[]',
                name: 'toWhitelist_',
                type: 'address[]',
            },
        ],
        name: 'whitelist',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        stateMutability: 'payable',
        type: 'receive',
    },
] as const;
