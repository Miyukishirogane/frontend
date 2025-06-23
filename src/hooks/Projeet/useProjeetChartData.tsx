import { useQuery } from '@tanstack/react-query';
import { getProjeetChartData } from 'src/services/api/yieldFlex/chart';
import { useChainId } from 'wagmi';

export default function useProjeetChartData(type: string, pair: string) {
  const chainId = useChainId();
  const query = useQuery({
    queryKey: ['useProjeetChartData', type, pair, chainId],
    queryFn: async () => {
      return await getProjeetChartData(type, pair);
    },
    refetchInterval: 8 * 1000,
  });

  return { ...query, chartData: query.data };
}
