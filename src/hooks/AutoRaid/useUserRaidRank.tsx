import { useQuery } from '@tanstack/react-query';
import { getUserAutoRaidRank } from 'src/services/api/autoRaid/leaderboard';
import useAccount from '../useAccount';

const useUserRaidRank = () => {
  const { address } = useAccount();

  const query = useQuery({
    queryKey: ['useUserRaidRank', address],
    queryFn: async () => {
      if (!address) return undefined;
      const resp = await getUserAutoRaidRank(address);
      return resp;
    },
  });

  return query;
};

export default useUserRaidRank;
