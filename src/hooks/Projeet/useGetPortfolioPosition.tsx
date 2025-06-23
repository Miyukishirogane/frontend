import { useQuery } from '@tanstack/react-query';
import { getProjeetPosition } from 'src/services/api/yieldFlex/portfolioPostion';
import { useChainId } from 'wagmi';

const useGetPortfolioPosition = () => {
  const chainId = useChainId();
  const query = useQuery({
    queryKey: ['useGetPortfolioPosition', chainId],
    queryFn: async () => {
      const resp = await getProjeetPosition();

      return resp;
    },
  });

  return { ...query, positions: query.data };
};

export default useGetPortfolioPosition;
