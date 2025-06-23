import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import useAccount from 'src/hooks/useAccount';
import { abiVotingEscrow } from 'src/jotai/wallet/abi/governance/VotingEscrow';
import { configEvmChain, contractAddress } from 'src/jotai/wallet/config';
import { BN } from 'src/utils';
import { governanceTokenInfo } from 'src/views/Governance/const';
import { useChainId } from 'wagmi';
import { readContract } from 'wagmi/actions';

export default function useGetVotingPower() {
  const chainId = useChainId();
  const { address } = useAccount();
  const { decimal } = governanceTokenInfo['TCV'];

  const votingPower = useQuery({
    queryKey: ['useGetVoteData', address],
    queryFn: async () => {
      if (address) {
        const votingPowerOf = await readContract(configEvmChain, {
          abi: abiVotingEscrow,
          address: contractAddress[chainId].VOTING_ESCROW,
          functionName: 'votingPowerOf',
          args: [address, BigInt((Date.now() / 1000).toFixed(0))],
        });

        return BN(votingPowerOf).div(`1e${decimal}`).toString();
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

  return { ...votingPower, votingPower: votingPower.data };
}
