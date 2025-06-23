import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { abiGovernorDelegate } from 'src/jotai/wallet/abi/governance/GovernorDelegate';
import { configEvmChain, contractAddress } from 'src/jotai/wallet/config';
import { Address } from 'viem';
import { useChainId } from 'wagmi';
import { readContract } from 'wagmi/actions';

export default function useGetVotingDetail(proposalId: string, address: Address) {
  const chainId = useChainId();
  const votingDetail = useQuery({
    queryKey: ['useGetVotingDetail', proposalId, address],
    queryFn: async () => {
      const voteDetail = await readContract(configEvmChain, {
        abi: abiGovernorDelegate,
        address: contractAddress[chainId].GOVERNOR,
        functionName: 'getReceipt',
        args: [BigInt(proposalId), address],
      });

      return voteDetail;
    },
    throwOnError: err => {
      const errorMessage = err as unknown as { shortMessage: string };
      toast.error(errorMessage.shortMessage);
      return false;
    },
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
  });

  return { ...votingDetail, votingDetail: votingDetail.data };
}
