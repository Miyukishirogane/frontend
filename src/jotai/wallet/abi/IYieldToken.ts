export const abiIYieldToken = [
    {
    "inputs": [
        {
        "internalType": "address",
        "name": "_SY",
        "type": "address"
        },
        {
        "internalType": "address",
        "name": "_PT",
        "type": "address"
        },
        {
        "internalType": "string",
        "name": "_name",
        "type": "string"
        },
        {
        "internalType": "string",
        "name": "_symbol",
        "type": "string"
        },
        {
        "internalType": "uint8",
        "name": "__decimals",
        "type": "uint8"
        },
        {
        "internalType": "uint256",
        "name": "_expiry",
        "type": "uint256"
        },
        {
        "internalType": "bool",
        "name": "_doCacheIndexSameBlock",
        "type": "bool"
        }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
    },
    {
    "inputs": [],
    "name": "ArrayEmpty",
    "type": "error"
    },
    {
    "inputs": [],
    "name": "ArrayLengthMismatch",
    "type": "error"
    },
    {
    "inputs": [],
    "name": "YCExpired",
    "type": "error"
    },
    {
    "inputs": [],
    "name": "YCNoFloatingSy",
    "type": "error"
    },
    {
    "inputs": [],
    "name": "YCNotExpired",
    "type": "error"
    },
    {
    "inputs": [],
    "name": "YCNothingToRedeem",
    "type": "error"
    },
    {
    "inputs": [],
    "name": "YCPostExpiryDataNotSet",
    "type": "error"
    },
    {
    "inputs": [
        {
        "internalType": "uint256",
        "name": "actualSy",
        "type": "uint256"
        },
        {
        "internalType": "uint256",
        "name": "requiredSy",
        "type": "uint256"
        }
    ],
    "name": "YieldContractInsufficientSy",
    "type": "error"
    },
    {
    "anonymous": false,
    "inputs": [
        {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
        },
        {
        "indexed": true,
        "internalType": "address",
        "name": "spender",
        "type": "address"
        },
        {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
        }
    ],
    "name": "Approval",
    "type": "event"
    },
    {
    "anonymous": false,
    "inputs": [
        {
        "indexed": true,
        "internalType": "address",
        "name": "caller",
        "type": "address"
        },
        {
        "indexed": true,
        "internalType": "address",
        "name": "receiver",
        "type": "address"
        },
        {
        "indexed": false,
        "internalType": "uint256",
        "name": "amountPYToRedeem",
        "type": "uint256"
        },
        {
        "indexed": false,
        "internalType": "uint256",
        "name": "amountSyOut",
        "type": "uint256"
        }
    ],
    "name": "Burn",
    "type": "event"
    },
    {
    "anonymous": false,
    "inputs": [
        {
        "indexed": false,
        "internalType": "uint256",
        "name": "amountInterestFee",
        "type": "uint256"
        }
    ],
    "name": "CollectInterestFee",
    "type": "event"
    },
    {
    "anonymous": false,
    "inputs": [
        {
        "indexed": true,
        "internalType": "address",
        "name": "rewardToken",
        "type": "address"
        },
        {
        "indexed": false,
        "internalType": "uint256",
        "name": "amountRewardFee",
        "type": "uint256"
        }
    ],
    "name": "CollectRewardFee",
    "type": "event"
    },
    {
    "anonymous": false,
    "inputs": [
        {
        "indexed": true,
        "internalType": "address",
        "name": "caller",
        "type": "address"
        },
        {
        "indexed": true,
        "internalType": "address",
        "name": "receiverPT",
        "type": "address"
        },
        {
        "indexed": true,
        "internalType": "address",
        "name": "receiverYT",
        "type": "address"
        },
        {
        "indexed": false,
        "internalType": "uint256",
        "name": "amountSyToMint",
        "type": "uint256"
        },
        {
        "indexed": false,
        "internalType": "uint256",
        "name": "amountPYOut",
        "type": "uint256"
        }
    ],
    "name": "Mint",
    "type": "event"
    },
    {
    "anonymous": false,
    "inputs": [
        {
        "indexed": true,
        "internalType": "uint256",
        "name": "newIndex",
        "type": "uint256"
        }
    ],
    "name": "NewInterestIndex",
    "type": "event"
    },
    {
    "anonymous": false,
    "inputs": [
        {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
        },
        {
        "indexed": false,
        "internalType": "uint256",
        "name": "interestOut",
        "type": "uint256"
        }
    ],
    "name": "RedeemInterest",
    "type": "event"
    },
    {
    "anonymous": false,
    "inputs": [
        {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
        },
        {
        "indexed": false,
        "internalType": "uint256[]",
        "name": "amountRewardsOut",
        "type": "uint256[]"
        }
    ],
    "name": "RedeemRewards",
    "type": "event"
    },
    {
    "anonymous": false,
    "inputs": [
        {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
        },
        {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
        },
        {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
        }
    ],
    "name": "Transfer",
    "type": "event"
    },
    {
    "inputs": [],
    "name": "PT",
    "outputs": [
        {
        "internalType": "address",
        "name": "",
        "type": "address"
        }
    ],
    "stateMutability": "view",
    "type": "function"
    },
    {
    "inputs": [],
    "name": "SY",
    "outputs": [
        {
        "internalType": "address",
        "name": "",
        "type": "address"
        }
    ],
    "stateMutability": "view",
    "type": "function"
    },
    {
    "inputs": [
        {
        "internalType": "address",
        "name": "owner",
        "type": "address"
        },
        {
        "internalType": "address",
        "name": "spender",
        "type": "address"
        }
    ],
    "name": "allowance",
    "outputs": [
        {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function"
    },
    {
    "inputs": [
        {
        "internalType": "address",
        "name": "spender",
        "type": "address"
        },
        {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
        }
    ],
    "name": "approve",
    "outputs": [
        {
        "internalType": "bool",
        "name": "",
        "type": "bool"
        }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [
        {
        "internalType": "address",
        "name": "account",
        "type": "address"
        }
    ],
    "name": "balanceOf",
    "outputs": [
        {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function"
    },
    {
    "inputs": [],
    "name": "decimals",
    "outputs": [
        {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
        }
    ],
    "stateMutability": "view",
    "type": "function"
    },
    {
    "inputs": [],
    "name": "doCacheIndexSameBlock",
    "outputs": [
        {
        "internalType": "bool",
        "name": "",
        "type": "bool"
        }
    ],
    "stateMutability": "view",
    "type": "function"
    },
    {
    "inputs": [],
    "name": "expiry",
    "outputs": [
        {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function"
    },
    {
    "inputs": [],
    "name": "factory",
    "outputs": [
        {
        "internalType": "address",
        "name": "",
        "type": "address"
        }
    ],
    "stateMutability": "view",
    "type": "function"
    },
    {
    "inputs": [],
    "name": "getPostExpiryData",
    "outputs": [
        {
        "internalType": "uint256",
        "name": "firstPYIndex",
        "type": "uint256"
        },
        {
        "internalType": "uint256",
        "name": "totalSyInterestForTreasury",
        "type": "uint256"
        },
        {
        "internalType": "uint256[]",
        "name": "firstRewardIndexes",
        "type": "uint256[]"
        },
        {
        "internalType": "uint256[]",
        "name": "userRewardOwed",
        "type": "uint256[]"
        }
    ],
    "stateMutability": "view",
    "type": "function"
    },
    {
    "inputs": [],
    "name": "getRewardTokens",
    "outputs": [
        {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
        }
    ],
    "stateMutability": "view",
    "type": "function"
    },
    {
    "inputs": [],
    "name": "isExpired",
    "outputs": [
        {
        "internalType": "bool",
        "name": "",
        "type": "bool"
        }
    ],
    "stateMutability": "view",
    "type": "function"
    },
    {
    "inputs": [
        {
        "internalType": "address",
        "name": "receiverPT",
        "type": "address"
        },
        {
        "internalType": "address",
        "name": "receiverYT",
        "type": "address"
        }
    ],
    "name": "mintPY",
    "outputs": [
        {
        "internalType": "uint256",
        "name": "amountPYOut",
        "type": "uint256"
        }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [
        {
        "internalType": "address[]",
        "name": "receiverPTs",
        "type": "address[]"
        },
        {
        "internalType": "address[]",
        "name": "receiverYTs",
        "type": "address[]"
        },
        {
        "internalType": "uint256[]",
        "name": "amountSyToMints",
        "type": "uint256[]"
        }
    ],
    "name": "mintPYMulti",
    "outputs": [
        {
        "internalType": "uint256[]",
        "name": "amountPYOuts",
        "type": "uint256[]"
        }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [],
    "name": "name",
    "outputs": [
        {
        "internalType": "string",
        "name": "",
        "type": "string"
        }
    ],
    "stateMutability": "view",
    "type": "function"
    },
    {
    "inputs": [],
    "name": "postExpiry",
    "outputs": [
        {
        "internalType": "uint128",
        "name": "firstPYIndex",
        "type": "uint128"
        },
        {
        "internalType": "uint128",
        "name": "totalSyInterestForTreasury",
        "type": "uint128"
        }
    ],
    "stateMutability": "view",
    "type": "function"
    },
    {
    "inputs": [],
    "name": "pyIndexCurrent",
    "outputs": [
        {
        "internalType": "uint256",
        "name": "currentIndex",
        "type": "uint256"
        }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [],
    "name": "pyIndexLastUpdatedBlock",
    "outputs": [
        {
        "internalType": "uint128",
        "name": "",
        "type": "uint128"
        }
    ],
    "stateMutability": "view",
    "type": "function"
    },
    {
    "inputs": [],
    "name": "pyIndexStored",
    "outputs": [
        {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function"
    },
    {
    "inputs": [
        {
        "internalType": "address",
        "name": "user",
        "type": "address"
        },
        {
        "internalType": "bool",
        "name": "redeemInterest",
        "type": "bool"
        },
        {
        "internalType": "bool",
        "name": "redeemRewards",
        "type": "bool"
        }
    ],
    "name": "redeemDueInterestAndRewards",
    "outputs": [
        {
        "internalType": "uint256",
        "name": "interestOut",
        "type": "uint256"
        },
        {
        "internalType": "uint256[]",
        "name": "rewardsOut",
        "type": "uint256[]"
        }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [],
    "name": "redeemInterestAndRewardsPostExpiryForTreasury",
    "outputs": [
        {
        "internalType": "uint256",
        "name": "interestOut",
        "type": "uint256"
        },
        {
        "internalType": "uint256[]",
        "name": "rewardsOut",
        "type": "uint256[]"
        }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [
        {
        "internalType": "address",
        "name": "receiver",
        "type": "address"
        }
    ],
    "name": "redeemPY",
    "outputs": [
        {
        "internalType": "uint256",
        "name": "amountSyOut",
        "type": "uint256"
        }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [
        {
        "internalType": "address[]",
        "name": "receivers",
        "type": "address[]"
        },
        {
        "internalType": "uint256[]",
        "name": "amountPYToRedeems",
        "type": "uint256[]"
        }
    ],
    "name": "redeemPYMulti",
    "outputs": [
        {
        "internalType": "uint256[]",
        "name": "amountSyOuts",
        "type": "uint256[]"
        }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [],
    "name": "rewardIndexesCurrent",
    "outputs": [
        {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
        }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [],
    "name": "setPostExpiryData",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [],
    "name": "syReserve",
    "outputs": [
        {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function"
    },
    {
    "inputs": [],
    "name": "symbol",
    "outputs": [
        {
        "internalType": "string",
        "name": "",
        "type": "string"
        }
    ],
    "stateMutability": "view",
    "type": "function"
    },
    {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
        {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function"
    },
    {
    "inputs": [
        {
        "internalType": "address",
        "name": "to",
        "type": "address"
        },
        {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
        }
    ],
    "name": "transfer",
    "outputs": [
        {
        "internalType": "bool",
        "name": "",
        "type": "bool"
        }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [
        {
        "internalType": "address",
        "name": "from",
        "type": "address"
        },
        {
        "internalType": "address",
        "name": "to",
        "type": "address"
        },
        {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
        }
    ],
    "name": "transferFrom",
    "outputs": [
        {
        "internalType": "bool",
        "name": "",
        "type": "bool"
        }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [
        {
        "internalType": "address",
        "name": "",
        "type": "address"
        }
    ],
    "name": "userInterest",
    "outputs": [
        {
        "internalType": "uint128",
        "name": "index",
        "type": "uint128"
        },
        {
        "internalType": "uint128",
        "name": "accrued",
        "type": "uint128"
        }
    ],
    "stateMutability": "view",
    "type": "function"
    },
    {
    "inputs": [
        {
        "internalType": "address",
        "name": "",
        "type": "address"
        },
        {
        "internalType": "address",
        "name": "",
        "type": "address"
        }
    ],
    "name": "userReward",
    "outputs": [
        {
        "internalType": "uint128",
        "name": "index",
        "type": "uint128"
        },
        {
        "internalType": "uint128",
        "name": "accrued",
        "type": "uint128"
        }
    ],
    "stateMutability": "view",
    "type": "function"
    }
] as const