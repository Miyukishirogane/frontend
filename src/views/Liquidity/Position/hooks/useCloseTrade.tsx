import { useMutation } from '@tanstack/react-query';
import useAccount from 'src/hooks/useAccount';
import { encodeCloseTrade, encodeDataTrade } from '../../utils/utils';
import { toast } from 'react-toastify';
import { writeContract } from 'wagmi/actions';
import { configEvmChain } from 'src/jotai/wallet/config';
import useUserTradingAddress from '../../LiquidityLending/hooks/useUserTradingAddress';
import { proxyAddressAbi } from 'src/jotai/wallet/abi/ProxyAddressAbi';
import { toastTxSuccess } from 'src/utils/toast';

const useCloseTrade = () => {
  const { address } = useAccount();
  const { data: proxyAddress } = useUserTradingAddress();

  const mutate = useMutation({
    mutationKey: ['useCloseTrade', address],
    mutationFn: async () => {
      if (!address || !proxyAddress) return;
      try {
        const encodeClose = await encodeCloseTrade(proxyAddress);
        const encodeTrade = await encodeDataTrade(proxyAddress);

        const tx = await writeContract(configEvmChain, {
          address: proxyAddress,
          abi: proxyAddressAbi,
          functionName: 'closeTrade',
          args: [encodeClose, encodeTrade],
          gasPrice: BigInt(1e7),
        });
        toastTxSuccess(tx);

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
