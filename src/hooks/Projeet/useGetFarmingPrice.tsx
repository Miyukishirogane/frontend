import { useQuery } from '@tanstack/react-query';
import { getFarmingPrice } from 'src/services/api/yieldFlex/farmingPrice';
import { useChainId } from 'wagmi';

export default function useGetFarmingPrice(pair: string) {
  const chainId = useChainId();
  const query = useQuery({
    queryKey: ['useGetFarmingPrice', pair, chainId],
    queryFn: async () => {
      return await getFarmingPrice(pair);
    },
    refetchInterval: 5 * 1000,
  });

  return { ...query, price: query.data };
}
