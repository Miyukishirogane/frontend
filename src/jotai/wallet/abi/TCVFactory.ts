export const abiTCVFactory = [
    {
        inputs: [
            {
                internalType: 'contract ITCVBeacon',
                name: 'TCVBeacon_',
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
                internalType: 'address',
                name: 'owner',
                type: 'address',
            },
        ],
        name: 'InitFactory',
        type: 'event',
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
                name: 'manager',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'vault',
                type: 'address',
            },
        ],
        name: 'VaultCreated',
        type: 'event',
    },
    {
        inputs: [],
        name: 'TCVBeacon',
        outputs: [
            {
                internalType: 'contract ITCVBeacon',
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
                        internalType: 'uint24[]',
                        name: 'feeTiers',
                        type: 'uint24[]',
                    },
                    {
                        internalType: 'address',
                        name: 'token0',
                        type: 'address',
                    },
                    {
                        internalType: 'address',
                        name: 'token1',
                        type: 'address',
                    },
                    {
                        internalType: 'address',
                        name: 'owner',
                        type: 'address',
                    },
                    {
                        internalType: 'uint256',
                        name: 'init0',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'init1',
                        type: 'uint256',
                    },
                    {
                        internalType: 'address',
                        name: 'manager',
                        type: 'address',
                    },
                    {
                        internalType: 'address[]',
                        name: 'routers',
                        type: 'address[]',
                    },
                ],
                internalType: 'struct InitializePayload',
                name: 'params_',
                type: 'tuple',
            },
            {
                internalType: 'bool',
                name: 'isBeacon_',
                type: 'bool',
            },
        ],
        name: 'deployVault',
        outputs: [
            {
                internalType: 'address',
                name: 'vault',
                type: 'address',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'proxy',
                type: 'address',
            },
        ],
        name: 'getProxyAdmin',
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
                name: 'proxy',
                type: 'address',
            },
        ],
        name: 'getProxyImplementation',
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
                name: 'token0_',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'token1_',
                type: 'address',
            },
        ],
        name: 'getTokenName',
        outputs: [
            {
                internalType: 'string',
                name: '',
                type: 'string',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_owner_',
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
                internalType: 'address[]',
                name: 'vaults_',
                type: 'address[]',
            },
        ],
        name: 'makeVaultsImmutable',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'numVaults',
        outputs: [
            {
                internalType: 'uint256',
                name: 'result',
                type: 'uint256',
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
        name: 'renounceOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
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
        inputs: [
            {
                internalType: 'address[]',
                name: 'vaults_',
                type: 'address[]',
            },
        ],
        name: 'upgradeVaults',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address[]',
                name: 'vaults_',
                type: 'address[]',
            },
            {
                internalType: 'bytes[]',
                name: 'datas_',
                type: 'bytes[]',
            },
        ],
        name: 'upgradeVaultsAndCall',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'startIndex_',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'endIndex_',
                type: 'uint256',
            },
        ],
        name: 'vaults',
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
] as const;
