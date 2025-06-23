import { useQuery } from '@tanstack/react-query';
import { TAppChainId } from 'src/jotai/wallet/type';
import { getPriceInfoChainIdNow } from 'src/services/api/pendle/getPrice';
import { Address } from 'viem';

export default function useQueryPrice({ chainId, address }: { chainId: TAppChainId; address: Address }) {
  return useQuery({
    queryKey: ['priceToken', chainId, address],
    queryFn: () => getPriceInfoChainIdNow(chainId, address),
    staleTime: 60 * 1000 * 3, // 3 minutes
  });
}
