import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import useAccount from 'src/hooks/useAccount';
import { abiVotingEscrow } from 'src/jotai/wallet/abi/governance/VotingEscrow';
import { configEvmChain, contractAddress } from 'src/jotai/wallet/config';
import { useChainId } from 'wagmi';
import { readContract } from 'wagmi/actions';

export default function useGetNumDelegator() {
  const chainId = useChainId();
  const { address } = useAccount();

  const numDelegator = useQuery({
    queryKey: ['useGetNumDelegator', address],
    queryFn: async () => {
      if (address) {
        const num = await readContract(configEvmChain, {
          abi: abiVotingEscrow,
          address: contractAddress[chainId].VOTING_ESCROW,
          functionName: 'numDelagator',
          args: [address],
        });

        return num.toString();
      }
    },
    throwOnError: err => {
      const errorMessage = err as unknown as { shortMessage: string };
      toast.error(errorMessage.shortMessage);
      console.log(errorMessage.shortMessage);
      return false;
    },
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
  });

  return { ...numDelegator, numDelegator: numDelegator.data };
}
