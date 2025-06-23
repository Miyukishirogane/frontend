import { toast } from 'react-toastify';
import useAccount from 'src/hooks/useAccount';
import { abiERC20DAOToken } from 'src/jotai/wallet/abi/governance/ERC20DAOToken';
import { abiVotingEscrow } from 'src/jotai/wallet/abi/governance/VotingEscrow';
import { configEvmChain, contractAddress } from 'src/jotai/wallet/config';
import { toastTxSuccess } from 'src/utils/toast';
import { useChainId } from 'wagmi';
import { readContract, waitForTransactionReceipt, writeContract } from 'wagmi/actions';
import { BN } from 'src/utils';
import useGetTokenBalance from 'src/hooks/Liquidlity/useGetTokenBalance';
import useGetVotingPower from './useGetVotingPower';
import useGetUnlockTCV from './useGetUnlockTCV';
import { governanceTokenInfo } from 'src/views/Governance/const';

export default function useFunctionVoting() {
  const chainId = useChainId();
  const { address: addressUser } = useAccount();
  const { address, decimal } = governanceTokenInfo['TCV'];
  const { refetch: refetchBalance } = useGetTokenBalance({ addressToken: address, decimal: decimal });
  const { refetch: refetchVotingPower } = useGetVotingPower();
  const { refetch: refetchUnlockTCV } = useGetUnlockTCV();

  const createLock = async (amount: string, unlockTime: number) => {
    try {
      if (addressUser && amount !== '' && amount !== '0') {
        const amountToken = BN(amount).times(`1e${decimal}`).toNumber();

        const allowance = await readContract(configEvmChain, {
          abi: abiERC20DAOToken,
          address: address,
          functionName: 'allowance',
          args: [addressUser, contractAddress[chainId].VOTING_ESCROW],
          chainId: chainId,
        });

        if (Number(amountToken) > Number(allowance)) {
          const approve = await writeContract(configEvmChain, {
            abi: abiERC20DAOToken,
            address: address,
            functionName: 'approve',
            args: [contractAddress[chainId].VOTING_ESCROW, BigInt(Number(amountToken))],
            chainId: chainId,
          });
          await waitForTransactionReceipt(configEvmChain, { hash: approve });
        }

        const tx = await writeContract(configEvmChain, {
          abi: abiVotingEscrow,
          address: contractAddress[chainId].VOTING_ESCROW,
          functionName: 'create_lock',
          args: [
            BigInt(Number(amountToken)),
            BigInt(Math.floor(Date.now() / 1000)) + BigInt(Math.floor(unlockTime / 1000)),
          ],
        });

        await waitForTransactionReceipt(configEvmChain, { hash: tx });

        await refetchBalance();
        await refetchUnlockTCV();
        await refetchVotingPower();

        toastTxSuccess(tx);
      }
    } catch (err) {
      const errorMessage = err as unknown as { shortMessage: string };
      toast.error(errorMessage.shortMessage);
      console.log(errorMessage);
    }
  };

  const withdraw = async () => {
    try {
      if (addressUser) {
        const tx = await writeContract(configEvmChain, {
          abi: abiVotingEscrow,
          address: contractAddress[chainId].VOTING_ESCROW,
          functionName: 'withdraw',
          args: [],
        });

        await waitForTransactionReceipt(configEvmChain, { hash: tx });

        await refetchBalance();
        await refetchUnlockTCV();
        await refetchVotingPower();

        toastTxSuccess(tx);
      }
    } catch (err) {
      const errorMessage = err as unknown as { shortMessage: string };
      toast.error(errorMessage.shortMessage);
      console.log(errorMessage);
    }
  };

  const increaseAmount = async (amount: string) => {
    try {
      if (addressUser && amount !== '' && amount !== '0') {
        const amountToken = BN(amount).times(`1e${decimal}`).toNumber();

        const allowance = await readContract(configEvmChain, {
          abi: abiERC20DAOToken,
          address: address,
          functionName: 'allowance',
          args: [addressUser, contractAddress[chainId].VOTING_ESCROW],
          chainId: chainId,
        });

        if (Number(amountToken) > Number(allowance)) {
          const approve = await writeContract(configEvmChain, {
            abi: abiERC20DAOToken,
            address: address,
            functionName: 'approve',
            args: [contractAddress[chainId].VOTING_ESCROW, BigInt(Number(amountToken))],
            chainId: chainId,
          });
          await waitForTransactionReceipt(configEvmChain, { hash: approve });
        }

        const tx = await writeContract(configEvmChain, {
          abi: abiVotingEscrow,
          address: contractAddress[chainId].VOTING_ESCROW,
          functionName: 'increase_amount',
          args: [BigInt(amountToken)],
        });

        await waitForTransactionReceipt(configEvmChain, { hash: tx });

        await refetchBalance();
        await refetchUnlockTCV();
        await refetchVotingPower();

        toastTxSuccess(tx);
      }
    } catch (err) {
      const errorMessage = err as unknown as { shortMessage: string };
      toast.error(errorMessage.shortMessage);
      console.log(errorMessage);
    }
  };

  const increaseUnlockTime = async (unlockTime: number) => {
    try {
      if (addressUser) {
        const tx = await writeContract(configEvmChain, {
          abi: abiVotingEscrow,
          address: contractAddress[chainId].VOTING_ESCROW,
          functionName: 'increase_unlock_time',
          args: [BigInt(Math.floor(Date.now() / 1000)) + BigInt(Math.floor(unlockTime / 1000))],
        });

        await waitForTransactionReceipt(configEvmChain, { hash: tx });

        await refetchBalance();
        await refetchUnlockTCV();
        await refetchVotingPower();

        toastTxSuccess(tx);
      }
    } catch (err) {
      const errorMessage = err as unknown as { shortMessage: string };
      toast.error(errorMessage.shortMessage);
      console.log(errorMessage);
    }
  };
  return {
    createLock,
    withdraw,
    increaseAmount,
    increaseUnlockTime,
  };
}
