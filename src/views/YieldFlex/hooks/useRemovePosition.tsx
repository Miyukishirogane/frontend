import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import useAccount from 'src/hooks/useAccount';
import { ProjeetTradeAbi } from 'src/jotai/wallet/abi/ProjeetTradeAbi';
import { configEvmChain } from 'src/jotai/wallet/config';
import { toastTxSuccess } from 'src/utils/toast';
import { waitForTransactionReceipt, writeContract } from 'wagmi/actions';
import { useChainId } from 'wagmi';
import { projeetTradeAbi } from '../mapNameToken';

const useRemovePosition = () => {
  const { address } = useAccount();
  const chainId = useChainId();

  const mutation = useMutation({
    mutationKey: ['useRemovePosition'],
    mutationFn: async (params: { tokenIds: number[]; onSuccess: () => void }) => {
      const { tokenIds, onSuccess } = params;
      if (!address || !projeetTradeAbi[chainId]) return;

      try {
        const listBigInt = tokenIds.map(id => BigInt(id));
        const tx = await writeContract(configEvmChain, {
          abi: ProjeetTradeAbi,
          address: projeetTradeAbi[chainId].PROJEET_TRADE_ABI_ADDRESS,
          functionName: 'decreaseLiquidity',
          args: [listBigInt, address],
          chainId: chainId,
        });
        await waitForTransactionReceipt(configEvmChain, { hash: tx });
        onSuccess();
        toastTxSuccess(tx);
      } catch (error) {
        console.log('🚀 ~ handleRemove ~ error:', error);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const err = error as any;
        toast.error(err.shortMessage || err.message);
      }
    },
  });

  return mutation;
};

export default useRemovePosition;
