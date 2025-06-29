import { useMutation } from '@tanstack/react-query';
import useAccount from 'src/hooks/useAccount';
import { encodeCloseTrade } from '../../utils/utils';
import { toast } from 'react-toastify';
import { writeContract } from 'wagmi/actions';
import { configEvmChain } from 'src/jotai/wallet/config';
import { proxyAddressAbi } from 'src/jotai/wallet/abi/ProxyAddressAbi';
import { toastTxSuccess } from 'src/utils/toast';
import useUserTradingAddress from '../../LiquidityLending/hooks/useUserTradingAddress';
import usePortfolioPosition from './usePortfolioPosition';

export const proxyAddress = '0xAb6dC637728f89C4b6949F3e68AB22A74dC0F9BE';

const useCloseTrade = () => {
  const { address } = useAccount();
  const { data: userTradingAddress } = useUserTradingAddress();
  const { refetch: refetchPortfolioPosition } = usePortfolioPosition();

  const mutate = useMutation({
    mutationKey: ['useCloseTrade', address],
    mutationFn: async () => {
      if (!address || !userTradingAddress) return;
      try {
        const { data, dataWithdraw } = await encodeCloseTrade(userTradingAddress);
        console.log('🚀 ~ mutationFn: ~ data:', { data, dataWithdraw });
        // const encodeTrade = await encodeDataTrade(userTradingAddress);

        const tx = await writeContract(configEvmChain, {
          address: userTradingAddress,
          abi: proxyAddressAbi,
          functionName: 'closeTrade',
          args: [data, dataWithdraw],
          gasPrice: BigInt(1e7),
        });

        toastTxSuccess(tx);
        refetchPortfolioPosition();

        return tx;
      } catch (error) {
        console.log('🚀 ~ useCloseTrade: ~ error:', error);
        toast.error('Failed to close trade');
      }
    },
  });

  return mutate;
};

export default useCloseTrade;
