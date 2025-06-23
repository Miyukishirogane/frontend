import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { abiGovernorDelegate } from 'src/jotai/wallet/abi/governance/GovernorDelegate';
import { abiVotingEscrow } from 'src/jotai/wallet/abi/governance/VotingEscrow';
import { configEvmChain, contractAddress } from 'src/jotai/wallet/config';
import { BN } from 'src/utils';
import { formatNumber } from 'src/utils/format';
import { governanceTokenInfo } from 'src/views/Governance/const';
import { useChainId } from 'wagmi';
import { readContracts } from 'wagmi/actions';

export default function useProposalDetail(proposalId: string) {
  const chainId = useChainId();
  const { decimal } = governanceTokenInfo['TCV'];

  const proposalDetail = useQuery({
    queryKey: ['useProposalDetail', proposalId],
    queryFn: async () => {
      const [state, totalSupply, votes] = await readContracts(configEvmChain, {
        contracts: [
          {
            abi: abiGovernorDelegate,
            address: contractAddress[chainId].GOVERNOR,
            functionName: 'state',
            args: [BigInt(proposalId)],
          },
          {
            abi: abiVotingEscrow,
            address: contractAddress[chainId].VOTING_ESCROW,
            functionName: 'totalSupply',
            args: [BigInt((Date.now() / 1000).toFixed(0))],
          },
          {
            abi: abiGovernorDelegate,
            address: contractAddress[chainId].GOVERNOR,
            functionName: 'proposals',
            args: [BigInt(proposalId)],
          },
        ],
      });

      const forVotes = Number(BN(votes?.result?.[1] || 0).div(`1e${decimal}`));
      const againstVotes = Number(BN(votes?.result?.[2] || 0).div(`1e${decimal}`));
      const totalSupplyResult = Number(BN(totalSupply.result).div(`1e${decimal}`));

      const sumVotes = forVotes + againstVotes;
      const quorum = sumVotes / totalSupplyResult;

      return {
        forVotes,
        againstVotes,
        sumVotes,
        quorum,
        state: state?.result,
        totalSupply: totalSupplyResult,
      };
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

  return { ...proposalDetail, proposalDetail: proposalDetail.data };
}
