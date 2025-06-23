import { MutateOptions, useMutation } from '@tanstack/react-query';
import { add } from 'date-fns';
import { toast } from 'react-toastify';
import useGetTokenBalance from 'src/hooks/Liquidlity/useGetTokenBalance';
import useGetTradePosition from 'src/hooks/Projeet/useGetTradePosition';
import useAccount from 'src/hooks/useAccount';
import { ProjeetTradeAbi } from 'src/jotai/wallet/abi/ProjeetTradeAbi';
import { configEvmChain } from 'src/jotai/wallet/config';
import useSwitchToSelectedChain from 'src/jotai/wallet/hooks/useSwitchToSelectedChain';
import { BN } from 'src/utils';
import { toastTxSuccess } from 'src/utils/toast';
import { projeetPortTokens } from 'src/views/YieldFlexDashboard/mapNameToken';
import { erc20Abi } from 'viem';
import { useChainId, useFeeData } from 'wagmi';
import { readContract, waitForTransactionReceipt, writeContract } from 'wagmi/actions';
import { projeetTradeAbi, projeetTradeTokens } from '../mapNameToken';
import { useBuyInfoAtomState, useIsSwapAtom, usePairsAtomValue, useStrategyState } from '../state/hooks';
import { fixTickRange, priceToTick } from '../utils';

const useSubmitLiquidity = (props?: MutateOptions) => {
  const [buyInfo] = useBuyInfoAtomState();
  const [strategyItems] = useStrategyState();
  const { address } = useAccount();
  const pair = usePairsAtomValue();
  const { refetch: refetchTradePosition } = useGetTradePosition(pair);
  const { switchToChainSelected } = useSwitchToSelectedChain();
  const { data: feeData } = useFeeData({});
  const chainId = useChainId();
  const [isSwap] = useIsSwapAtom();

  const tokenListByChainId = projeetTradeTokens[chainId];
  const tokenInfo = projeetPortTokens[chainId][buyInfo.selectedToken] || projeetPortTokens[42161]['ETH'];
  const { refetch: refetchBalance } = useGetTokenBalance({
    addressToken: tokenInfo.address,
    decimal: tokenInfo.decimal,
    isNative: true,
  });

  const handleSubmit = async () => {
    if (!address || !feeData || !tokenListByChainId || !projeetTradeAbi[chainId]) return;
    switchToChainSelected();

    const tokenSelectInfo = tokenListByChainId[buyInfo.selectedToken];
    const tokenOutInfo = tokenListByChainId[buyInfo.tokenOut];
    const decimal = `1e${tokenSelectInfo.decimal}`;

    const timeExpired = (add(new Date(), { days: Number(buyInfo.expired) }).getTime() / 1000).toFixed(0);
    const totalAmount = strategyItems.reduce(
      (total, item) => total + BN(item.amount).multipliedBy(decimal).toNumber(),
      0,
    );

    const getDecimals = () => (isSwap ? [tokenOutInfo, tokenSelectInfo] : [tokenSelectInfo, tokenOutInfo]);
    const [tokenA, tokenB] = getDecimals();

    const convertStrategyToMintParams = strategyItems.map(item => {
      const { min, max } = fixTickRange(
        priceToTick(Number(item.minPrice), tokenA.decimal, tokenB.decimal),
        priceToTick(Number(item.maxPrice), tokenA.decimal, tokenB.decimal),
      );

      const amountRaw = BN(item.amount).multipliedBy(decimal);
      const amountRawFixed = BigInt(amountRaw.toFixed(0));
      const amountRawMinFixed = BigInt(amountRaw.multipliedBy(0.95).toFixed(0));

      const amount0Desired = isSwap ? BigInt(0) : amountRawFixed;
      const amount1Desired = isSwap ? amountRawFixed : BigInt(0);
      const amount0Min = isSwap ? BigInt(0) : amountRawMinFixed;
      const amount1Min = isSwap ? amountRawMinFixed : BigInt(0);

      return {
        tickLower: min,
        tickUpper: max,
        amount0Desired: amount0Desired,
        amount1Desired: amount1Desired,
        amount0Min: amount0Min,
        amount1Min: amount1Min,
        recipient: address,
        deadline: BigInt((add(new Date(), { hours: 1 }).getTime() / 1000).toFixed(0)),
      };
    });

    if (tokenSelectInfo.tokenName !== 'ETH') {
      const allowance = await readContract(configEvmChain, {
        abi: erc20Abi,
        address: tokenSelectInfo.address,
        functionName: 'allowance',
        args: [address, projeetTradeAbi[chainId].PROJEET_TRADE_ABI_ADDRESS],
        chainId: chainId,
      });

      if (Number(totalAmount) > Number(allowance)) {
        const approve = await writeContract(configEvmChain, {
          abi: erc20Abi,
          address: tokenSelectInfo.address,
          functionName: 'approve',
          args: [projeetTradeAbi[chainId].PROJEET_TRADE_ABI_ADDRESS, BigInt(totalAmount)],
          chainId: chainId,
        });

        await waitForTransactionReceipt(configEvmChain, { hash: approve });
      }
    }

    const tx = await writeContract(configEvmChain, {
      abi: ProjeetTradeAbi,
      address: projeetTradeAbi[chainId].PROJEET_TRADE_ABI_ADDRESS, //Contract address
      functionName: 'mint',
      args: [
        tokenA.address,
        tokenB.address,
        500,
        convertStrategyToMintParams,
        address,
        BigInt(timeExpired),
        priceToTick(Number(buyInfo.stopLoss || 0), tokenA.decimal, tokenB.decimal), //stopLoss
      ],
      value: tokenSelectInfo.tokenName === 'ETH' ? BigInt(totalAmount.toFixed(0)) : undefined,
      chainId: chainId,
    });

    await waitForTransactionReceipt(configEvmChain, { hash: tx });
    toastTxSuccess(tx);
    await refetchTradePosition();
    await refetchBalance();
  };

  const mutation = useMutation({
    mutationKey: ['useSubmitAutoDca'],
    mutationFn: handleSubmit,
    onError: error => {
      console.log('🚀 ~ handleSubmit ~ error:', error);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const err = error as any;
      toast.error(err.shortMessage || err.message);
      return;
    },
    ...props,
  });
  return mutation;
};

export default useSubmitLiquidity;
