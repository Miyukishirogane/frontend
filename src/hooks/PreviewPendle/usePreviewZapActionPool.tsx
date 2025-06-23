import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { getAddr } from 'pendle-fork-sdk/src/addresses';
import { Router } from 'pendle-fork-sdk/src/Router';
import { toast } from 'react-toastify';
import ErrorExeTransaction from 'src/components/ErrorExeTransaction/ErrorExeTransaction';
import { listAddr } from 'src/constants';
import { tokenList } from 'src/constants/tokenMap';
import { guessPtReceivedFromSy } from 'src/jotai/pendle/constant';
import { PendleStateData } from 'src/jotai/pendle/pendle';
import { TPendleDetailState } from 'src/jotai/pendle/type';
import { abiIAllAction } from 'src/jotai/wallet/abi/IAllAction';
import { abiSy } from 'src/jotai/wallet/abi/Sy';
import { configEvmChain } from 'src/jotai/wallet/config';
import { getListMarketPriceInfoChainIdNow } from 'src/services/api/pendle/getPrice';
import { BN } from 'src/utils';
import { Address } from 'viem';
import { useChainId } from 'wagmi';
import { readContract } from 'wagmi/actions';

interface IZapInMutation {
  marketInfo: TPendleDetailState;
  input: string;
  tokenName: string;
}

const usePreviewZapInPool = () => {
  const setPendleStateData = useSetAtom(PendleStateData);
  const chainIdSelected = useChainId();
  const mutateState = useMutation({
    mutationKey: ['usePreviewZapInPool'],
    mutationFn: async ({ marketInfo, input, tokenName }: IZapInMutation) => {
      if (Number(input) === 0 || isNaN(Number(input))) return input;

      const { tokenMintSy, SY, marketAddress, YT, ptBalance } = marketInfo;
      const router = getAddr('ROUTER_ADDRESS', chainIdSelected);
      const routerClass = new Router(marketInfo, listAddr[chainIdSelected].URL, chainIdSelected);
      const { address: token, decimal: tokenDecimal, price } = tokenList[chainIdSelected][tokenName];

      try {
        let tokenAmount: string | bigint = input;
        if (token !== SY) {
          if (token !== tokenMintSy) {
            tokenAmount = await routerClass.calculateTokenAmount(input, 0, false, token, tokenMintSy, '3000');
          }

          tokenAmount = await readContract(configEvmChain, {
            abi: abiSy,
            address: SY,
            functionName: 'previewDeposit',
            args: [tokenMintSy, BigInt(BN(tokenAmount).multipliedBy(`1e${tokenDecimal}`).toString())],
          });
        }

        const previewSwapSyToAddLiquidity = await readContract(configEvmChain, {
          abi: abiIAllAction,
          address: router as Address,
          functionName: 'previewSwapSyToAddLiquidity',
          args: [marketAddress, YT, BigInt(tokenAmount), BigInt(ptBalance), guessPtReceivedFromSy],
        });

        const priceToken = await getListMarketPriceInfoChainIdNow(chainIdSelected, price as Address);
        const zapInAmount = previewSwapSyToAddLiquidity[1] ? BN(previewSwapSyToAddLiquidity[1]).multipliedBy(`1e${tokenDecimal}`).toString() : '0';

        setPendleStateData(prev => ({
          ...prev,
          MintData: {
            ...prev.MintData,
            MintPriceToken: priceToken.toString(),
          },
        }));

        return zapInAmount;
      } catch (error) {
        console.log(error);
        toast.error(<ErrorExeTransaction error={error} />, {
          type: 'error',
          isLoading: false,
          autoClose: 4000,
          closeButton: true,
        });
        return '0';
      }
    },
  });

  return mutateState;
};

export default usePreviewZapInPool;
