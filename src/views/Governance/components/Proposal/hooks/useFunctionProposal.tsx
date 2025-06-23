import { toast } from 'react-toastify';
import { queryClient } from 'src/jotai/AppProvider';
import { abiGovernorDelegate } from 'src/jotai/wallet/abi/governance/GovernorDelegate';
import { configEvmChain, contractAddress } from 'src/jotai/wallet/config';
import { toastTxSuccess } from 'src/utils/toast';
import { useChainId } from 'wagmi';
import { waitForTransactionReceipt, writeContract } from 'wagmi/actions';

export default function useFunctionProposal() {
  const chainId = useChainId();

  const voteFor = async (proposalId: string) => {
    try {
      const tx = await writeContract(configEvmChain, {
        abi: abiGovernorDelegate,
        address: contractAddress[chainId].GOVERNOR,
        functionName: 'castVote',
        args: [BigInt(proposalId), 1],
      });

      await waitForTransactionReceipt(configEvmChain, { hash: tx });

      toastTxSuccess(tx);

      queryClient.invalidateQueries({ queryKey: ['useProposalDetail', proposalId] });
      queryClient.invalidateQueries({ queryKey: ['useGetProposals'] });
    } catch (err) {
      const errorMessage = err as unknown as { shortMessage: string };
      toast.error(errorMessage.shortMessage);
      console.log(errorMessage);
    }
  };

  const voteAgainst = async (proposalId: string) => {
    try {
      const tx = await writeContract(configEvmChain, {
        abi: abiGovernorDelegate,
        address: contractAddress[chainId].GOVERNOR,
        functionName: 'castVote',
        args: [BigInt(proposalId), 0],
      });

      await waitForTransactionReceipt(configEvmChain, { hash: tx });

      toastTxSuccess(tx);

      queryClient.invalidateQueries({ queryKey: ['useProposalDetail', proposalId] });
      queryClient.invalidateQueries({ queryKey: ['useGetProposals', chainId] });
    } catch (err) {
      const errorMessage = err as unknown as { shortMessage: string };
      toast.error(errorMessage.shortMessage);
      console.log(errorMessage);
    }
  };
  return { voteFor, voteAgainst };
}
