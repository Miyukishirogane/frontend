import { useQuery } from '@tanstack/react-query';
import { getProjeetUserBalance } from 'src/services/api/yieldFlex/protfolioBalance';
import useAccount from '../useAccount';
import { useChainId } from 'wagmi';

const useGetUserPortfolioBalance = () => {
  const { address } = useAccount();
  const chainId = useChainId();
  const query = useQuery({
    queryKey: ['useGetUserPortfolioBalance', address, chainId],
    queryFn: async () => {
      if (!address) return [];
      const resp = await getProjeetUserBalance(address);

      return resp;
    },
  });

  return { ...query, userBalances: query.data };
};

export default useGetUserPortfolioBalance;
