import { atom, useAtomValue, useSetAtom } from 'jotai';
import { toast } from 'react-toastify';
import useAccount from 'src/hooks/useAccount';
import { queryClient } from 'src/jotai/AppProvider';
import { configEvmChain } from 'src/jotai/wallet/config';
import useSwitchToSelectedChain from 'src/jotai/wallet/hooks/useSwitchToSelectedChain';
import { BN } from 'src/utils';
import { Address, erc20Abi } from 'viem';
import { readContract, waitForTransactionReceipt, writeContract } from 'wagmi/actions';
import useUserTradingAddress from '../hooks/useUserTradingAddress';
import { lendingPositionAbi } from 'src/jotai/wallet/abi/LendingPositionAbi';

export type TLiquidityLendingDataState = {
  loading: boolean;
  error: Error | null;
  isTransacting: boolean;
};

export const liquidityLendingStateData = atom<TLiquidityLendingDataState>({
  loading: true,
  error: null,
  isTransacting: false,
} as TLiquidityLendingDataState);

export const useLiquidityLendingData = () => useAtomValue(liquidityLendingStateData);

export default function useLiquidityLendingFunction() {
  const setVaultsLendingData = useSetAtom(liquidityLendingStateData);
  const { chainIdSelected, switchToChainSelected } = useSwitchToSelectedChain();
  const { address } = useAccount();
  const { data: userTradingAddress } = useUserTradingAddress();

  async function deposit(addressContract: Address, addressToken: Address, decimal: number, amount: string) {
    setVaultsLendingData(prev => ({
      ...prev,
      isTransacting: true,
    }));
    if (address) {
      try {
        await switchToChainSelected();
        const amountToken = BN(amount).times(BN(10).pow(decimal)).toString();

        //approve
        const allowance = await readContract(configEvmChain, {
          abi: erc20Abi,
          address: addressToken,
          functionName: 'allowance',
          args: [address, addressContract],
        });

        if (BigInt(allowance) < BigInt(amountToken)) {
          const approve = await writeContract(configEvmChain, {
            abi: erc20Abi,
            address: addressToken,
            functionName: 'approve',
            args: [addressContract, BigInt(amountToken)],
            chainId: chainIdSelected,
          });
          await waitForTransactionReceipt(configEvmChain, { hash: approve });
        }

        await writeContract(configEvmChain, {
          abi: lendingPositionAbi,
          address: addressContract,
          functionName: 'deposit',
          args: [address, addressToken, BigInt(amountToken)],
        });

        await queryClient.invalidateQueries({ queryKey: ['useGetVaultInfo', addressContract, address] });
        await queryClient.invalidateQueries({ queryKey: ['useGetUserVaultInfo', addressContract, address] });
        await queryClient.invalidateQueries({ queryKey: ['useGetBalance', addressToken, address] });
        toast.success('Deposit successfully');
      } catch (err) {
        console.log(err);
        const errorMessage = err as unknown as { shortMessage: string };
        toast.error(errorMessage.shortMessage);
      }
    }
    setVaultsLendingData(prev => ({
      ...prev,
      isTransacting: false,
    }));
  }

  async function withdraw(addressContract: Address, decimal: number, amount: string) {
    setVaultsLendingData(prev => ({
      ...prev,
      isTransacting: true,
    }));
    if (address && userTradingAddress) {
      try {
        await switchToChainSelected();

        const amountToken = BN(amount).times(BN(10).pow(decimal)).toString();
        await writeContract(configEvmChain, {
          abi: lendingPositionAbi,
          address: addressContract,
          functionName: 'withdraw',
          args: [address, userTradingAddress, BigInt(amountToken), [], []],
        });

        await queryClient.invalidateQueries({ queryKey: ['useGetVaultInfo', addressContract, address] });
        await queryClient.invalidateQueries({ queryKey: ['useGetUserVaultInfo', addressContract, address] });
        toast.success('Withdraw successfully');
      } catch (err) {
        console.log(err);
        const errorMessage = err as unknown as { shortMessage: string };
        toast.error(errorMessage.shortMessage);
      }
    }
    setVaultsLendingData(prev => ({
      ...prev,
      isTransacting: false,
    }));
  }

  async function borrow(addressContract: Address, addressToken: Address, decimal: number, amount: string) {
    setVaultsLendingData(prev => ({
      ...prev,
      isTransacting: true,
    }));
    if (address && userTradingAddress) {
      try {
        await switchToChainSelected();
        const amountToken = BN(amount).times(BN(10).pow(decimal)).toString();
        await writeContract(configEvmChain, {
          abi: lendingPositionAbi,
          address: addressContract,
          functionName: 'borrow',
          args: [address, BigInt(amountToken)],
        });
        await queryClient.invalidateQueries({ queryKey: ['useGetVaultInfo', addressContract, address] });
        await queryClient.invalidateQueries({ queryKey: ['useGetUserVaultInfo', addressContract, address] });
        toast.success('Borrow successfully');
      } catch (err) {
        console.log(err);
        const errorMessage = err as unknown as { shortMessage: string };
        toast.error(errorMessage.shortMessage);
      } finally {
        setVaultsLendingData(prev => ({
          ...prev,
          isTransacting: false,
        }));
      }
    }
  }

  return {
    withdraw,
    deposit,
    borrow,
  };
}
