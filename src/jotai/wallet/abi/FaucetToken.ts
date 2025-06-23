export const abiFaucetToken = [
    {
        inputs: [
            {
                internalType: 'address',
                name: '_token0',
                type: 'address',
            },
            {
                internalType: 'address',
                name: '_token1',
                type: 'address',
            },
            {
                internalType: 'address',
                name: '_rewardVault',
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
                indexed: true,
                internalType: 'address',
                name: 'token',
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
                name: 'amount',
                type: 'uint256',
            },
        ],
        name: 'TokenWithdrawal',
        type: 'event',
    },
    {
        inputs: [],
        name: 'REWARDS_VAULT',
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
        name: 'token0',
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
        name: 'token1',
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
                name: 'token',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: '_amount',
                type: 'uint256',
            },
        ],
        name: 'withdrawTokens',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
] as const;
