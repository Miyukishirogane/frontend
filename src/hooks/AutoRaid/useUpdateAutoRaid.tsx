import { useMutation } from '@tanstack/react-query';
import { setMissionDone } from 'src/services/api/autoRaid/raidTask';
import useAccount from '../useAccount';
import useGetUserTask from './useGetUserTask';

export default function useUpdateAutoRaid(missionId: number) {
  const { address } = useAccount();
  const { socialCategory, refetch } = useGetUserTask();

  const task = socialCategory?.find(item => item.id === missionId);

  const isMissionDone = task?.done || false;

  return useMutation({
    mutationKey: ['useUpdateAutoRaid', address, missionId, isMissionDone],
    mutationFn: async () => {
      if (address && !isMissionDone) {
        await setMissionDone(address, missionId);
        setTimeout(async () => {
          await refetch();
        }, 500);
      }
    },
  });
}
