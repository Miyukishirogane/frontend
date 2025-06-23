import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import useGetUserPortfolioBalance from 'src/hooks/Projeet/useGetUserPortfolioBalance';
import useAccount from 'src/hooks/useAccount';
import { projeetPortfolioAbi } from 'src/jotai/wallet/abi/ProjeetPortfolio';
import { configEvmChain } from 'src/jotai/wallet/config';
import { getWithdrawPath } from 'src/services/api/yieldFlex/withdrawpath';
import { BN } from 'src/utils';
import { toastTxSuccess } from 'src/utils/toast';
import { waitForTransactionReceipt, writeContract } from 'wagmi/actions';
import useGetTokenBalance from 'src/hooks/Liquidlity/useGetTokenBalance';
import { useChainId } from 'wagmi';
import { projeetPortTokens, projeetPortAbi } from '../../mapNameToken';
import { Address } from 'viem';

type TProps = { tokenName: string };
const useWithdrawPortfolio = (props: TProps) => {
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
    mutationKey: ['useWithdrawPortfolio'],
    mutationFn: async (values: { amount: string; onSuccess: () => void }) => {
      if (!address || !projeetPortAbi[chainId]) return;
      const { amount, onSuccess } = values;
      const tokenAddress = tokenInfo.address;
      const decimal = `1e${tokenInfo.decimal}`;

      const withdrawPath = await getWithdrawPath(tokenAddress, BN(amount).multipliedBy(decimal).toString());
      if (withdrawPath) {
        const withdrawAmount = withdrawPath.amount.map(item => BigInt(item));
        let tx: Address;
        if (tokenName === 'ETH') {
          tx = await writeContract(configEvmChain, {
            abi: projeetPortfolioAbi,
            address: projeetPortAbi[chainId].PROJEET_PORTFOLIO_ABI_ADDRESS,
            functionName: 'withdrawETH',
            args: [address, BigInt(withdrawPath.withdrawAmount), withdrawPath.pool, withdrawAmount],
            chainId: chainId,
          });
        } else {
          tx = await writeContract(configEvmChain, {
            abi: projeetPortfolioAbi,
            address: projeetPortAbi[chainId].PROJEET_PORTFOLIO_ABI_ADDRESS,
            functionName: 'withdraw',
            args: [address, tokenAddress, BigInt(withdrawPath.withdrawAmount), withdrawPath.pool, withdrawAmount],
            chainId: chainId,
          });
        }

        await waitForTransactionReceipt(configEvmChain, { hash: tx });
        refetchPortfolioBalance();
        refetchBalance();

        toastTxSuccess(tx);
        onSuccess();
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.shortMessage || error.message);
    },
  });

  return mutation;
};

export default useWithdrawPortfolio;
