import { abiAirdrop } from 'src/jotai/wallet/abi/Airdrop';
import { configEvmChain, contractAddress } from 'src/jotai/wallet/config';
import { TAppChainId } from 'src/jotai/wallet/type';
import { Address } from 'viem';
import { readContracts } from 'wagmi/actions';

export const handleGetClaimedTCP = async (userAddress: Address, chainIdSelected: TAppChainId) => {
  const tcvAirdrop = contractAddress[chainIdSelected].TCV_AIRDROP;

  const claimedValue = await readContracts(configEvmChain, {
    contracts: [
      {
        abi: abiAirdrop,
        address: tcvAirdrop,
        functionName: 'claimed',
        args: [userAddress],
      },
    ],
  });

  return claimedValue;
};
