import { useQuery } from '@tanstack/react-query';
import { getAutoRaidLeaderboard } from 'src/services/api/autoRaid/leaderboard';
import useAccount from '../useAccount';

const useAutoRaidLeaderboard = (page: number, limit: number) => {
  const { address } = useAccount();

  const query = useQuery({
    queryKey: ['useAutoRaidLeaderboard', page, address],
    queryFn: async () => {
      const resp = await getAutoRaidLeaderboard(page, limit);
      return resp;
    },
    refetchInterval: 3 * 60 * 1000,
  });

  return query;
};

export default useAutoRaidLeaderboard;
