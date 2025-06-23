/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { abiGovernorDelegate } from 'src/jotai/wallet/abi/governance/GovernorDelegate';
import { configEvmChain, contractAddress } from 'src/jotai/wallet/config';
import { BN } from 'src/utils';
import { proposalList } from 'src/views/Governance/utils/decoder';
import { useChainId } from 'wagmi';
import { readContract } from 'wagmi/actions';
import { TVotingHistoryData } from '../type';
import { governanceTokenInfo } from 'src/views/Governance/const';

export default function useGetVotingHistory() {
  const chainId = useChainId();
  const { decimal } = governanceTokenInfo['TCV'];

  const getProposals = async () => {
    const count = await readContract(configEvmChain, {
      abi: abiGovernorDelegate,
      address: contractAddress[chainId].GOVERNOR,
      functionName: 'proposalCount',
      args: [],
    });

    const indexes = Array.from({ length: Number(count) }, (_, i) => BigInt(i));

    const encodedProposals = await readContract(configEvmChain, {
      abi: abiGovernorDelegate,
      address: contractAddress[chainId].GOVERNOR,
      functionName: 'proposalsInfo',
      args: [indexes],
    });

    const decodedProposals = proposalList(encodedProposals as unknown as string[][]);

    return decodedProposals;
  };

  const votingHistory = useQuery({
    queryKey: ['useGetVotingHistory'],
    queryFn: async () => {
      const decodedProposals = await getProposals();

      const listVotesHistory: TVotingHistoryData[] = [];

      await Promise.all(
        decodedProposals.map(async (proposal: any, index: number) => {
          const listAddressVotes = await readContract(configEvmChain, {
            abi: abiGovernorDelegate,
            address: contractAddress[chainId].GOVERNOR,
            functionName: 'getVotedAddresses',
            args: [BigInt(proposal.id)],
          });

          await Promise.all(
            listAddressVotes.map(async address => {
              const voteDetail = await readContract(configEvmChain, {
                abi: abiGovernorDelegate,
                address: contractAddress[chainId].GOVERNOR,
                functionName: 'getReceipt',
                args: [BigInt(proposal.id), address],
              });

              const voteDetailFormat = {
                voter: address,
                date: voteDetail.timestamp * 1000,
                vote: voteDetail.support === 0 ? 'Against' : 'For',
                votingPower: BN(voteDetail.votes).div(`1e${decimal}`).toString(),
                index: index,
                proposalId: proposal.id,
              };

              if (voteDetail.hasVoted) listVotesHistory.push(voteDetailFormat as TVotingHistoryData);
            }),
          );
        }),
      );

      return listVotesHistory;
    },
    throwOnError: err => {
      const errorMessage = err as unknown as { shortMessage: string };
      toast.error(errorMessage.shortMessage);
      console.log(errorMessage);
      return false;
    },
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
  });

  return { ...votingHistory, votingHistory: votingHistory.data };
}
