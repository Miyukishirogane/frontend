import useAccount from 'src/hooks/useAccount';
import { encodeExecuteTrade } from '../../utils/utils';
import { useMutation } from '@tanstack/react-query';
import { readContract, waitForTransactionReceipt, writeContract } from 'wagmi/actions';
import { proxyAddressAbi } from 'src/jotai/wallet/abi/ProxyAddressAbi';
import useUserTradingAddress from '../../LiquidityLending/hooks/useUserTradingAddress';
import { configEvmChain } from 'src/jotai/wallet/config';
import { toast } from 'react-toastify';
import useSwitchToSelectedChain from 'src/jotai/wallet/hooks/useSwitchToSelectedChain';
import { BN } from 'src/utils';
import { erc20Abi } from 'viem';
import { positionContractAddress, vaultListInfo } from '../../LiquidityLending/constants';
import { toastTxSuccess } from 'src/utils/toast';
import usePortfolioPosition from './usePortfolioPosition';

interface ExecuteTradeParams {
  margin: string;
  size: string;
  isLong: boolean;
}

const useExecuteTrade = () => {
  const { address } = useAccount();
  const { data: proxyAddress } = useUserTradingAddress();
  const { chainIdSelected, switchToChainSelected } = useSwitchToSelectedChain();
  const { refetch: refetchPortfolioPosition } = usePortfolioPosition();

  const mutation = useMutation<`0x${string}` | undefined, Error, ExecuteTradeParams>({
    mutationKey: ['executeTrade'],
    mutationFn: async ({ margin, size, isLong }) => {
      if (!address || !proxyAddress) return;
      const tokenInfo = vaultListInfo[positionContractAddress]; //usdc;

      try {
        await switchToChainSelected();
        const amountToken = BN(margin).times(BN(10).pow(tokenInfo.decimal)).toString();

        //approve
        const allowance = await readContract(configEvmChain, {
          abi: erc20Abi,
          address: tokenInfo.addressToken,
          functionName: 'allowance',
          args: [address, positionContractAddress],
        });

        if (BigInt(allowance) < BigInt(amountToken)) {
          const approve = await writeContract(configEvmChain, {
            abi: erc20Abi,
            address: tokenInfo.addressToken,
            functionName: 'approve',
            args: [positionContractAddress, BigInt(amountToken)],
            chainId: chainIdSelected,
          });
          await waitForTransactionReceipt(configEvmChain, { hash: approve });
        }

        const data = await encodeExecuteTrade(margin, address, size, isLong ? 2 : 1);

        const tx = await writeContract(configEvmChain, {
          address: proxyAddress,
          abi: proxyAddressAbi,
          functionName: 'executeTrade',
          args: [BigInt(BN(margin).multipliedBy(BN(10).pow(tokenInfo.decimal)).toString()), data],
        });

        toastTxSuccess(tx);
        refetchPortfolioPosition();
        return tx;
      } catch (error) {
        console.log('🚀 ~ mutationFn: ~ error:', error);
        const errorMessage = error as unknown as { shortMessage: string };
        toast.error(errorMessage.shortMessage);
      }
    },
  });

  return mutation;
};

export default useExecuteTrade;
