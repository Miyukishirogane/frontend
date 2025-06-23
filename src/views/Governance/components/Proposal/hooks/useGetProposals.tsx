/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { abiGovernorDelegate } from 'src/jotai/wallet/abi/governance/GovernorDelegate';
import { configEvmChain, contractAddress } from 'src/jotai/wallet/config';
import { useChainId } from 'wagmi';
import { readContract } from 'wagmi/actions';
import { proposalList } from '../../../utils/decoder';
import { TDecodedProposals, TProposalCardData } from '../type';

export default function useGetProposals() {
  const chainId = useChainId();

  const getProposals = async (): Promise<TDecodedProposals[]> => {
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

    return decodedProposals as TDecodedProposals[];
  };

  const listProposalsQuery = useQuery({
    queryKey: ['useGetProposals', chainId],
    queryFn: async () => {
      const decodedProposals = await getProposals();

      const listProposals = await Promise.all(
        decodedProposals.map(async (proposal, index: number) => {
          const proposalId = BigInt(proposal.id);
          const state = await readContract(configEvmChain, {
            abi: abiGovernorDelegate,
            address: contractAddress[chainId].GOVERNOR,
            functionName: 'state',
            args: [proposalId],
          });

          return { ...proposal, state: state, index };
        }),
      );
      return listProposals as TProposalCardData[];
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

  return { ...listProposalsQuery, listProposals: listProposalsQuery.data };
}
