import { useQuery } from '@tanstack/react-query';
import useAccount from 'src/hooks/useAccount';
import { lendingPositionAbi } from 'src/jotai/wallet/abi/LendingPositionAbi';
import { configEvmChain } from 'src/jotai/wallet/config';
import { zeroAddress } from 'viem';
import { readContract } from 'wagmi/actions';
import { positionContractAddress } from '../constants';

const useUserTradingAddress = () => {
  const { address } = useAccount();
  const query = useQuery({
    queryKey: ['useUserTradingAddress'],
    queryFn: async () => {
      if (!address) return zeroAddress;
      const result = await readContract(configEvmChain, {
        abi: lendingPositionAbi,
        address: positionContractAddress,
        functionName: 'userTradingAddress',
        args: [address],
      });

      return result || zeroAddress;
    },
    enabled: !!address,
  });

  return query;
};

export default useUserTradingAddress;
