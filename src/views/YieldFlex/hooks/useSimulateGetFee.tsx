import { useQuery } from '@tanstack/react-query';
import { add } from 'date-fns';
import { toast } from 'react-toastify';
import useGetTokenBalance from 'src/hooks/Liquidlity/useGetTokenBalance';
import useGetFarmingPrice from 'src/hooks/Projeet/useGetFarmingPrice';
import { ProjeetTradeAbi } from 'src/jotai/wallet/abi/ProjeetTradeAbi';
import { getFarmingStrategy } from 'src/services/api/yieldFlex/farmingStrategy';
import { BN } from 'src/utils';
import { projeetPortTokens } from 'src/views/YieldFlexDashboard/mapNameToken';
import { useAccount, useChainId, useFeeData, usePublicClient } from 'wagmi';
import { projeetTradeAbi, projeetTradeTokens } from '../mapNameToken';
import { useBuyInfoAtomState, useIsSwapAtom, usePairsAtomState } from '../state/hooks';
import { TStrategyItem } from '../type';
import { fixTickRange, priceToTick } from '../utils';

const useSimulateGetFee = () => {
  const { address } = useAccount();
  const client = usePublicClient();
  const chainId = useChainId();
  const [buyInfo] = useBuyInfoAtomState();
  const [pair] = usePairsAtomState();
  const { price } = useGetFarmingPrice(pair);
  const [isSwap] = useIsSwapAtom();

  const tokenListByChainId = projeetTradeTokens[chainId];
  const token = buyInfo.selectedToken;
  const tokenInfo = projeetPortTokens[chainId][token] || projeetPortTokens[42161]['ETH'];
  const { data: feeData } = useFeeData({});
  const { data: balanceInWallet } = useGetTokenBalance({
    addressToken: tokenInfo.address,
    decimal: tokenInfo.decimal,
    isNative: tokenInfo.tokenName === 'ETH',
  });

  const balance = BN(balanceInWallet).minus('0.00005');

  const query = useQuery({
    queryKey: ['fee', token],
    queryFn: async () => {
      if (!balance || !address || !feeData || !tokenListByChainId || !projeetTradeAbi[chainId]) {
        return BN(0);
      }

      //skip check if is not ETH
      if (tokenInfo.tokenName !== 'ETH') {
        return BN(0);
      }

      if (balance.isLessThanOrEqualTo(0)) {
        return BN(-1);
      }

      const resp = await getFarmingStrategy(0, Number((price || 0) + 1000), pair, buyInfo.expired, isSwap);
      const pairItem = pair.split('/');
      const tokenInInfo = tokenListByChainId?.[token || 'ETH'];
      const tokenOutInfo = tokenListByChainId[pairItem[1]];
      const decimalTokenIn = `1e${tokenInInfo.decimal}`;
      const timeExpired = (add(new Date(), { days: 1 }).getTime() / 1000).toFixed(0);
      let gasCostInEth = BigInt(0);

      const listSuggestion: TStrategyItem[] = resp.map(item => ({
        minPrice: item.minPrice.toFixed(2),
        maxPrice: item.maxPrice.toFixed(2),
        amount: (Number(item.ratio) * Number(balance)).toFixed(6),
        selectedToken: token,
      }));

      const totalAmount = listSuggestion.reduce(
        (total, item) => total + BN(item.amount).multipliedBy(decimalTokenIn).toNumber(),
        0,
      );

      try {
        const convertStrategyToMintParams = listSuggestion.map(item => {
          const { min, max } = fixTickRange(
            priceToTick(Number(item.minPrice), tokenInInfo.decimal, tokenOutInfo.decimal),
            priceToTick(Number(item.maxPrice), tokenInInfo.decimal, tokenOutInfo.decimal),
          );

          return {
            tickLower: min,
            tickUpper: max,
            amount0Desired: BigInt(BN(item.amount).multipliedBy(decimalTokenIn).toFixed(0)),
            amount1Desired: BigInt(0),
            amount0Min: BigInt(BN(item.amount).multipliedBy(decimalTokenIn).multipliedBy(0.95).toFixed(0)),
            amount1Min: BigInt(0),
            recipient: address,
            deadline: BigInt((add(new Date(), { hours: 1 }).getTime() / 1000).toFixed(0)),
          };
        });

        await client
          .estimateContractGas({
            abi: ProjeetTradeAbi,
            address: projeetTradeAbi[chainId].PROJEET_TRADE_ABI_ADDRESS, //Contract address
            functionName: 'mint',
            args: [
              tokenInInfo.address, //ETH address
              tokenOutInfo.address, //USDC address
              500,
              convertStrategyToMintParams,
              address,
              BigInt(timeExpired),
              priceToTick(Number(price), tokenInInfo.decimal, tokenOutInfo.decimal), //stopLoss
            ],
            value: BigInt(totalAmount.toFixed(0)),
            account: address,
          })
          .then(gas => {
            gasCostInEth = gas;
          });

        return BN(feeData?.maxFeePerGas.toString())
          .plus(Number(feeData?.maxPriorityFeePerGas))
          .multipliedBy(Number(gasCostInEth))
          .dividedBy(decimalTokenIn)
          .multipliedBy(1.5);
      } catch (error) {
        console.log('🚀 ~ queryFn: ~ error:', error);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        toast.error(error as any);
        return BN(0);
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    staleTime: Infinity,
    enabled: !!balance && !!feeData && !!price && !!pair,
  });

  return query;
};

export default useSimulateGetFee;
