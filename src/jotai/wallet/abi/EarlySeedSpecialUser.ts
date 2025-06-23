export const abiEarlySeedSpecialUser = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_usdt",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "payout",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "depositor",
          "type": "address"
        }
      ],
      "name": "PrivateSaleBuy",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "remainning",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "depositor",
          "type": "address"
        }
      ],
      "name": "PrivateSaleRedeem",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "token",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "WithdrawalStuckAmount",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "TCV",
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
      "name": "USDT",
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
          "name": "",
          "type": "address"
        }
      ],
      "name": "bondInfo",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "userLimit",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "totalBought",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountClaim",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "payout",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "vesting",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "lastBlock",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "pricePaid",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "bondPrice",
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
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_depositor",
          "type": "address"
        }
      ],
      "name": "deposit",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_depositer",
          "type": "address"
        }
      ],
      "name": "getBondInfo",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "userLimit",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "totalBought",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amountClaim",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "payout",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "vesting",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "lastBlock",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "pricePaid",
              "type": "uint256"
            }
          ],
          "internalType": "struct EarlySeedSpecialUser.PriSale",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_depositor",
          "type": "address"
        }
      ],
      "name": "getClaimedAmount",
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
          "name": "_depositor",
          "type": "address"
        }
      ],
      "name": "getMaxPayout",
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
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "getPayout",
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
      "name": "getPayoutRate",
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
      "name": "getTCVPrice",
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
          "name": "_depositor",
          "type": "address"
        }
      ],
      "name": "getTotalReceived",
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
          "name": "_depositor",
          "type": "address"
        }
      ],
      "name": "getWithdrawableAmount",
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
          "internalType": "uint256",
          "name": "_buyingTimeStart",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_buyingTime",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_cliffingTimeStart",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_cliffingTerm",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_vestingTimeStart",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_vestingTerm",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_discountRatio",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_maxDebt",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_maxPayout",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_TGE",
          "type": "uint256"
        }
      ],
      "name": "initializePrivateSaleRound",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_depositor",
          "type": "address"
        }
      ],
      "name": "percentVestedFor",
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
      "name": "policy",
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
      "name": "pullPolicy",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newPolicy_",
          "type": "address"
        }
      ],
      "name": "pushPolicy",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_recipient",
          "type": "address"
        }
      ],
      "name": "redeem",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renouncePolicy",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "enum EarlySeedSpecialUser.PARAMETER",
          "name": "_parameter",
          "type": "uint8"
        },
        {
          "internalType": "uint256",
          "name": "_input",
          "type": "uint256"
        }
      ],
      "name": "setPrivateSale",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_depositor",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_userLimit",
          "type": "uint256"
        }
      ],
      "name": "setSpecialUser",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_TCV",
          "type": "address"
        }
      ],
      "name": "setTCVAddress",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_TCVPrice",
          "type": "uint256"
        }
      ],
      "name": "setTCVPrice",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_usdt",
          "type": "address"
        }
      ],
      "name": "setUsdtAddress",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "terms",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "buyingTimeStart",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "buyingTime",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "cliffingTimeStart",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "cliffingTerm",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "vestingTimeStart",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "vestingTerm",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "discountRatio",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "maxDebt",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "maxPayout",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "TGE",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalDebt",
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
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_token",
          "type": "address"
        }
      ],
      "name": "withdrawStuckAmount",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ] as const