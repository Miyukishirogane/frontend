import { useQuery } from '@tanstack/react-query';
import useAccount from '../useAccount';
import { getTradePosition, TTradingPosition } from 'src/services/api/yieldFlex/tradePosition';
import { Address } from 'viem';
import { useChainId } from 'wagmi';
export default function useGetTradePosition(pair: string) {
  const chainId = useChainId();
  const { address } = useAccount();
  const query = useQuery({
    queryKey: ['getTradePosition', address, pair, chainId],
    queryFn: async () => {
      if (address) {
        return await getTradePosition(address as Address, pair);
      }
      return [] as TTradingPosition[];
    },
    staleTime: 1000 * 60 * 5,
  });

  return { ...query, tradePositions: query.data };
}
