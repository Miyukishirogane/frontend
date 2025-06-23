import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { abiGovernorDelegate } from 'src/jotai/wallet/abi/governance/GovernorDelegate';
import { configEvmChain, contractAddress } from 'src/jotai/wallet/config';
import { formatDate } from 'src/utils/format';
import { useChainId } from 'wagmi';
import { readContract } from 'wagmi/actions';

export default function useGetProposalTimeline(proposalId: string) {
  const chainId = useChainId();

  const timeline = useQuery({
    queryKey: ['useGetProposalTimeline', proposalId],
    queryFn: async () => {
      const timeline = await readContract(configEvmChain, {
        abi: abiGovernorDelegate,
        address: contractAddress[chainId].GOVERNOR,
        functionName: 'getProposalTimeline',
        args: [BigInt(proposalId)],
      });

      const [startTime, duration] = timeline || [0, 0];

      const start = Number(startTime) * 1000;
      const end = start + duration * 1000;
      return {
        start: formatDate(start, 'MMM d, yyyy - h:mm a'),
        end: formatDate(end, 'MMM d, yyyy - h:mm a'),
      };
    },
    throwOnError: err => {
      const errorMessage = err as unknown as { shortMessage: string };
      toast.error(errorMessage.shortMessage);
      return false;
    },
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
  });

  return { ...timeline, timeline: timeline.data };
}
