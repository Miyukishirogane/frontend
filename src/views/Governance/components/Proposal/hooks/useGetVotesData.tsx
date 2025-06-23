import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { TVoteData } from 'src/components/Table/Governance/ProposalVotes/type';
import { abiGovernorDelegate } from 'src/jotai/wallet/abi/governance/GovernorDelegate';
import { configEvmChain, contractAddress } from 'src/jotai/wallet/config';
import { BN } from 'src/utils';
import { governanceTokenInfo } from 'src/views/Governance/const';
import { useChainId } from 'wagmi';
import { readContract } from 'wagmi/actions';

export default function useGetVotesData(proposalId: string) {
  const chainId = useChainId();
  const { decimal } = governanceTokenInfo['TCV'];

  const votesData = useQuery({
    queryKey: ['useGetVoteData', proposalId],
    queryFn: async () => {
      const listAddressVotes = await readContract(configEvmChain, {
        abi: abiGovernorDelegate,
        address: contractAddress[chainId].GOVERNOR,
        functionName: 'getVotedAddresses',
        args: [BigInt(proposalId)],
      });

      const listVotesData = await Promise.all(
        listAddressVotes.map(async address => {
          const voteDetail = await readContract(configEvmChain, {
            abi: abiGovernorDelegate,
            address: contractAddress[chainId].GOVERNOR,
            functionName: 'getReceipt',
            args: [BigInt(proposalId), address],
          });

          const voteDetailFormat: TVoteData = {
            voter: address,
            date: voteDetail.timestamp * 1000,
            choice: voteDetail.support === 0 ? 'against' : 'for',
            votingPower: BN(voteDetail.votes).div(`1e${decimal}`).toString(),
          };

          return voteDetailFormat;
        }),
      );

      return listVotesData;
    },
    throwOnError: err => {
      const errorMessage = err as unknown as { shortMessage: string };
      toast.error(errorMessage.shortMessage);
      return false;
    },
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
  });

  return { ...votesData, votesData: votesData.data };
}
