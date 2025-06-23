import { TAppDenom } from 'src/constants/mapTokenToIcon';
import useAccount from 'src/hooks/useAccount';
import { projeetPortfolioAbi } from 'src/jotai/wallet/abi/ProjeetPortfolio';
import { configEvmChain } from 'src/jotai/wallet/config';
// import useSwitchToSelectedChain from 'src/jotai/wallet/hooks/useSwitchToSelectedChain';
import { useMutation } from '@tanstack/react-query';
import useGetUserPortfolioBalance from 'src/hooks/Projeet/useGetUserPortfolioBalance';
import { BN } from 'src/utils';
import { toastTxSuccess } from 'src/utils/toast';
import { erc20Abi } from 'viem';
import { readContract, waitForTransactionReceipt, writeContract } from 'wagmi/actions';
import useGetTokenBalance from 'src/hooks/Liquidlity/useGetTokenBalance';
import { toast } from 'react-toastify';
import { useChainId } from 'wagmi';
import { projeetPortTokens, projeetPortAbi } from '../../mapNameToken';

interface IProps {
  tokenName: TAppDenom;
}

interface IMutationFn {
  amount: string;
  onSuccess: () => void;
}

const useSupplyPortfolio = (props: IProps) => {
  const { tokenName } = props;
  const { address } = useAccount();
  const chainId = useChainId();
  const tokenInfo = projeetPortTokens[chainId][tokenName] || projeetPortTokens[42161]['ETH'];
  const { refetch: refetchPortfolioBalance } = useGetUserPortfolioBalance();
  const { refetch: refetchBalance } = useGetTokenBalance({
    addressToken: tokenInfo.address,
    decimal: tokenInfo.decimal,
    isNative: tokenName === 'ETH',
  });

  const mutation = useMutation({
    mutationKey: ['useSupplyPortfolio'],
    mutationFn: async (values: IMutationFn) => {
      const { amount, onSuccess } = values;
      if (!address || !projeetPortAbi[chainId]) return;

      const amountToken = BN(amount).times(BN(10).pow(tokenInfo.decimal)).toFixed(0);

      if (tokenName !== 'ETH') {
        const allowance = await readContract(configEvmChain, {
          abi: erc20Abi,
          address: tokenInfo.address,
          functionName: 'allowance',
          args: [address, projeetPortAbi[chainId].PROJEET_PORTFOLIO_ABI_ADDRESS],
          chainId: chainId,
        });

        if (BigInt(allowance) < BigInt(amountToken)) {
          const approve = await writeContract(configEvmChain, {
            abi: erc20Abi,
            address: tokenInfo.address,
            functionName: 'approve',
            args: [projeetPortAbi[chainId].PROJEET_PORTFOLIO_ABI_ADDRESS, BigInt(amountToken)],
            chainId: chainId,
          });
          await waitForTransactionReceipt(configEvmChain, { hash: approve });
        }
      }

      const tx = await writeContract(configEvmChain, {
        abi: projeetPortfolioAbi,
        address: projeetPortAbi[chainId].PROJEET_PORTFOLIO_ABI_ADDRESS,
        functionName: 'deposit',
        args: [address, tokenInfo.address, BigInt(amountToken)],
        value: BigInt(amountToken),
        chainId: chainId,
      });

      await waitForTransactionReceipt(configEvmChain, { hash: tx });
      await refetchPortfolioBalance();
      await refetchBalance();

      toastTxSuccess(tx);
      onSuccess();
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.shortMessage || error.message);
    },
  });

  return mutation;
};

export default useSupplyPortfolio;
