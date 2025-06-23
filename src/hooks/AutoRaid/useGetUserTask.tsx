import { useQuery } from '@tanstack/react-query';
import { getRaidTask } from 'src/services/api/autoRaid/raidTask';
import useAccount from '../useAccount';

const useGetUserTask = () => {
  const { address } = useAccount();

  const query = useQuery({
    queryKey: ['useGetUserTask', address],
    queryFn: async () => {
      if (!address) return undefined;
      const resp = await getRaidTask(address);
      return resp;
    },
  });

  return {
    ...query,
    tcvCategory: query.data?.mission.filter(item => item.category === 'tcv'),
    socialCategory: query.data?.mission.filter(item => item.category === 'social'),
  };
};

export default useGetUserTask;
