import { useQuery } from '@tanstack/react-query';
import { handleGetTodayUserQuest } from 'src/services/api/quest/quest';
import useAccount from '../useAccount';

const useQuestList = () => {
  const { address } = useAccount();

  const { data: questList, ...rest } = useQuery({
    queryKey: ['listQuest', address],
    queryFn: async () => {
      return await handleGetTodayUserQuest();
    },
  });

  return { questList: questList, ...rest };
};

export default useQuestList;
