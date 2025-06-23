import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import useAccount from 'src/hooks/useAccount';
import { queryClient } from 'src/jotai/AppProvider';
import { projeetPortfolioAbi } from 'src/jotai/wallet/abi/ProjeetPortfolio';
import { configEvmChain } from 'src/jotai/wallet/config';
import { TDcaHistory } from 'src/services/api/yieldFlex/dcaHistory';
import { sleep } from 'src/utils';
import { toastTxSuccess } from 'src/utils/toast';
import { projeetPortAbi } from 'src/views/YieldFlexDashboard/mapNameToken';
import { useChainId } from 'wagmi';
import { waitForTransactionReceipt, writeContract } from 'wagmi/actions';

const useCancelAutoDca = () => {
  const { address } = useAccount();
  const chainId = useChainId();

  const handleCancel = async (props: { data: TDcaHistory | undefined }) => {
    const { data } = props;
    if (!address || !data || !projeetPortAbi[chainId]) return;

    try {
      const tx = await writeContract(configEvmChain, {
        abi: projeetPortfolioAbi,
        address: projeetPortAbi[chainId].PROJEET_PORTFOLIO_ABI_ADDRESS, //Contract address
        functionName: 'cancelDCA',
        args: [BigInt(data.id)],
        chainId: chainId,
      });

      await waitForTransactionReceipt(configEvmChain, { hash: tx });
      await sleep(2000);
      await queryClient.invalidateQueries({ queryKey: ['useGetDcaHistory', address] });
      await queryClient.invalidateQueries({ queryKey: ['useGetUserPortfolioBalance', address] });

      toastTxSuccess(tx);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const err = error as any;
      toast.error(err.shortMessage || err.message);
      console.log('🚀 ~ handleCancel ~ error:', error);
    }
  };

  const mutation = useMutation({ mutationKey: ['useCancelAutoDca'], mutationFn: handleCancel });

  return mutation;
};

export default useCancelAutoDca;
