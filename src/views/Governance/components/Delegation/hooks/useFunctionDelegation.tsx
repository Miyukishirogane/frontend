import { toast } from 'react-toastify';
import useGetDelegations from 'src/components/Table/Governance/Delegation/hooks/useGetDelegations';
import useAccount from 'src/hooks/useAccount';
import { abiVotingEscrow } from 'src/jotai/wallet/abi/governance/VotingEscrow';
import { configEvmChain, contractAddress } from 'src/jotai/wallet/config';
import { toastTxSuccess } from 'src/utils/toast';
import useGetDelegated from 'src/views/Governance/components/Delegation/hooks/useGetDelegated';
import { Address } from 'viem';
import { useChainId } from 'wagmi';
import { waitForTransactionReceipt, writeContract } from 'wagmi/actions';

export default function useFunctionDelegation() {
  const chainId = useChainId();
  const { address: addressUser } = useAccount();
  const { refetch } = useGetDelegations();
  const { refetch: refetchDelegated } = useGetDelegated();

  const delegate = async (address: Address) => {
    try {
      if (addressUser) {
        const tx = await writeContract(configEvmChain, {
          abi: abiVotingEscrow,
          address: contractAddress[chainId].VOTING_ESCROW,
          functionName: 'delegate',
          args: [address],
        });

        await waitForTransactionReceipt(configEvmChain, { hash: tx });

        refetchDelegated();
        refetch();
        toastTxSuccess(tx);
      }
    } catch (err) {
      const errorMessage = err as unknown as { shortMessage: string };
      toast.error(errorMessage.shortMessage);
      console.log(errorMessage);
    }
  };

  const undelegate = async () => {
    try {
      if (addressUser) {
        const tx = await writeContract(configEvmChain, {
          abi: abiVotingEscrow,
          address: contractAddress[chainId].VOTING_ESCROW,
          functionName: 'undelegate',
          args: [],
        });

        await waitForTransactionReceipt(configEvmChain, { hash: tx });

        refetchDelegated();
        refetch();
        toastTxSuccess(tx);
      }
    } catch (err) {
      const errorMessage = err as unknown as { shortMessage: string };
      toast.error(errorMessage.shortMessage);
      console.log(errorMessage);
    }
  };

  return {
    delegate,
    undelegate,
  };
}
