import { useQuery } from '@tanstack/react-query';
import { lendingPositionAbi } from 'src/jotai/wallet/abi/LendingPositionAbi';
import { configEvmChain } from 'src/jotai/wallet/config';
import { BN } from 'src/utils';
import { useAccount } from 'wagmi';
import { readContract } from 'wagmi/actions';
import { positionContractAddress } from '../constants';

const useGetMaxBorrow = (tokenDecimal: number) => {
  const { address } = useAccount();

  const query = useQuery({
    queryKey: ['useGetMaxBorrow', address],
    queryFn: async () => {
      if (!address) return '0';

      try {
        const result = await readContract(configEvmChain, {
          abi: lendingPositionAbi,
          address: positionContractAddress,
          functionName: 'maxBorrow',
          args: [address],
        });

        return BN(result).div(BN(10).pow(tokenDecimal)).toString();
      } catch (error) {
        console.log('🚀 ~ queryFn: ~ error:', error);
        return BN(0);
      }
    },
    enabled: !!address,
    refetchInterval: 5 * 1000,
  });

  return query;
};

export default useGetMaxBorrow;
