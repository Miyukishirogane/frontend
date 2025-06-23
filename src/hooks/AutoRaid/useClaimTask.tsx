import { useMutation } from '@tanstack/react-query';
import useAccount from '../useAccount';
import { claimRaidTask } from 'src/services/api/autoRaid/raidTask';
import { toast } from 'react-toastify';
import useGetUserTask from './useGetUserTask';
import { queryClient } from 'src/jotai/AppProvider';

export default function useClaimTask(taskId: number) {
  const { address } = useAccount();
  const { refetch: refetchUserTask } = useGetUserTask();

  return useMutation({
    mutationKey: ['RaidTaskItem', taskId, address],
    mutationFn: async () => {
      if (address) {
        try {
          await claimRaidTask(address, taskId);

          await refetchUserTask();
          toast.success('Claim successfully');
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
          toast.error(err.message);
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['useUserRaidRank', address] });
      queryClient.invalidateQueries({ queryKey: ['useAutoRaidLeaderboard'] });
    },
  });
}
