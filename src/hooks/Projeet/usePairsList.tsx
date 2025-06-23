import { useQuery } from '@tanstack/react-query';
import { getPairsList } from 'src/services/api/yieldFlex/pairList';
import { usePairsAtomState } from 'src/views/YieldFlex/state/hooks';
import { useChainId } from 'wagmi';

const usePairsList = () => {
  const chainId = useChainId();
  const [pairs, setPairs] = usePairsAtomState();

  const query = useQuery({
    queryKey: ['pairsList'],
    queryFn: async () => {
      const resp = await getPairsList(chainId);
      if (pairs.length === 0) {
        setPairs(resp[0].pair);
      }

      return resp;
    },
  });

  return query;
};

export default usePairsList;
