import { useMutation, MutateOptions } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import useAccount from 'src/hooks/useAccount';
import { projeetPortfolioAbi } from 'src/jotai/wallet/abi/ProjeetPortfolio';
import { configEvmChain } from 'src/jotai/wallet/config';
import { BN } from 'src/utils';
import { writeContract, readContract, waitForTransactionReceipt } from 'wagmi/actions';
import { timeBySec } from '../constants';
import { TAutoDCA } from '../type';
import { toastTxSuccess } from 'src/utils/toast';
import { queryClient } from 'src/jotai/AppProvider';
import useSwitchToSelectedChain from 'src/jotai/wallet/hooks/useSwitchToSelectedChain';
import { erc20Abi } from 'viem';
import { useChainId } from 'wagmi';
import { projeetTradeTokens } from '../mapNameToken';
import { projeetPortAbi } from 'src/views/YieldFlexDashboard/mapNameToken';

interface IMutationValues {
  autoDCA: TAutoDCA;
  yieldFlexDeposited: number;
}

const useSubmitAutoDca = (props?: MutateOptions<unknown, Error, IMutationValues>) => {
  const { address } = useAccount();
  const chainId = useChainId();
  const { switchToChainSelected } = useSwitchToSelectedChain();
  const tokenListByChainId = projeetTradeTokens[chainId];

  const handleSubmit = async (props: IMutationValues) => {
    if (!address || !tokenListByChainId || !projeetPortAbi[chainId]) return;

    switchToChainSelected();
    const { autoDCA, yieldFlexDeposited } = props;
    const tokenInInfo = tokenListByChainId[autoDCA.tokenInSelect]; //USDC
    const tokenOutInfo = tokenListByChainId[autoDCA.tokenOutSelect]; //ETH
    const amount = BN(autoDCA.amount).multipliedBy(Number(autoDCA.totalRound)).multipliedBy(`1e${tokenInInfo.decimal}`);

    const startTime = new Date(autoDCA.timeStart || 0).getTime() / 1000;
    const timeInterval = timeBySec[autoDCA.recurringCycle];

    if (autoDCA.tokenInSelect !== 'ETH') {
      const allowance = await readContract(configEvmChain, {
        abi: erc20Abi,
        address: tokenInInfo.address,
        functionName: 'allowance',
        args: [address, projeetPortAbi[chainId].PROJEET_PORTFOLIO_ABI_ADDRESS],
        chainId: chainId,
      });
      const amountApprove = BN(amount).minus(BN(yieldFlexDeposited).multipliedBy(`1e${tokenInInfo.decimal}`));

      if (Number(amountApprove) > Number(allowance)) {
        const approve = await writeContract(configEvmChain, {
          abi: erc20Abi,
          address: tokenInInfo.address,
          functionName: 'approve',
          args: [projeetPortAbi[chainId].PROJEET_PORTFOLIO_ABI_ADDRESS, BigInt(amountApprove.toString())],
          chainId: chainId,
        });
        await waitForTransactionReceipt(configEvmChain, { hash: approve });
      }
    }

    const tx = await writeContract(configEvmChain, {
      abi: projeetPortfolioAbi,
      address: projeetPortAbi[chainId].PROJEET_PORTFOLIO_ABI_ADDRESS, //Contract address
      functionName: 'createDca',
      args: [
        address,
        tokenInInfo.address,
        tokenOutInfo.address,
        BigInt(amount.toFixed(0)),
        BigInt(startTime),
        BigInt(timeInterval),
        BigInt(autoDCA.totalRound),
      ],
      value: tokenInInfo.tokenName === 'ETH' ? BigInt(amount.toFixed(0)) : undefined,
      chainId: chainId,
    });

    await waitForTransactionReceipt(configEvmChain, { hash: tx });
    toastTxSuccess(tx);
    await queryClient.invalidateQueries({ queryKey: ['useGetUserPortfolioBalance', address] });

    //delay 5s wait for be update
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ['useGetDcaHistory', address] });
    }, 2000);
  };

  const mutation = useMutation({
    mutationKey: ['useSubmitAutoDca'],
    mutationFn: handleSubmit,
    onError: error => {
      console.log('🚀 ~ handleSubmit ~ error:', error);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const err = error as any;
      toast.error(err.shortMessage || err.message);
    },
    ...props,
  });

  return mutation;
};

export default useSubmitAutoDca;
