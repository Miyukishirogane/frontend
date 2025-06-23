import { abiConvertTCP } from 'src/jotai/wallet/abi/ConvertTCP';
import { configEvmChain, contractAddress } from 'src/jotai/wallet/config';
import { TAppChainId } from 'src/jotai/wallet/type';
import { Address } from 'viem';
import { readContracts } from 'wagmi/actions';

export const handleGetTotalVesting = async (chainIdSelected: TAppChainId) => {
  const CONVERT_TCP_ADDRESS = contractAddress[chainIdSelected].CONVERT_TCP_ADDRESS;

  const result = await readContracts(configEvmChain, {
    contracts: [
      {
        abi: abiConvertTCP,
        address: CONVERT_TCP_ADDRESS,
        functionName: 'totalVesting',
        args: [],
      },
    ],
  });

  return result;
};

export const handleGetVestingAmount = async (userAddress: Address, chainIdSelected: TAppChainId) => {
  const CONVERT_TCP_ADDRESS = contractAddress[chainIdSelected].CONVERT_TCP_ADDRESS;

  const result = await readContracts(configEvmChain, {
    contracts: [
      {
        abi: abiConvertTCP,
        address: CONVERT_TCP_ADDRESS,
        functionName: 'getVestingAmount',
        args: [userAddress],
      },
    ],
  });

  return result;
};

export const handleGetVestingMechanism = async (chainIdSelected: TAppChainId) => {
  const CONVERT_TCP_ADDRESS = contractAddress[chainIdSelected].CONVERT_TCP_ADDRESS;

  const term = await readContracts(configEvmChain, {
    contracts: [
      {
        abi: abiConvertTCP,
        address: CONVERT_TCP_ADDRESS,
        functionName: 'terms',
        args: [],
      },
    ],
  });

  const days = Number(term[0].result?.[1]) / 86400;

  return days;
};

export const handleGetReceivedAmount = async (userAddress: Address, chainIdSelected: TAppChainId) => {
  const CONVERT_TCP_ADDRESS = contractAddress[chainIdSelected].CONVERT_TCP_ADDRESS;

  const result = await readContracts(configEvmChain, {
    contracts: [
      {
        abi: abiConvertTCP,
        address: CONVERT_TCP_ADDRESS,
        functionName: 'getReceivedAmount',
        args: [userAddress],
      },
    ],
  });

  return result;
};

export const handleGetWithdrawableAmount = async (userAddress: Address, chainIdSelected: TAppChainId) => {
  const CONVERT_TCP_ADDRESS = contractAddress[chainIdSelected].CONVERT_TCP_ADDRESS;

  const result = await readContracts(configEvmChain, {
    contracts: [
      {
        abi: abiConvertTCP,
        address: CONVERT_TCP_ADDRESS,
        functionName: 'getWithdrawableAmount',
        args: [userAddress],
      },
    ],
  });

  return result;
};

export type WithdrawBoxFields = {
  tcpConverted: number;
  tcvReceived: number;
  withdrawable: number;
};
