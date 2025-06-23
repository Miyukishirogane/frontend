import { useQuery } from '@tanstack/react-query';
import { handleGetInfoUserQuest } from 'src/services/api/quest/quest';
import useAccount from '../useAccount';
import { useAuthState } from 'src/jotai/auth/auth';

const useUserQuestInfo = () => {
  const { address } = useAccount();
  const { isLogin } = useAuthState();

  const { data: userQuestInfo, ...rest } = useQuery({
    queryKey: ['userQuestInfo', address],
    queryFn: async () => {
      return await handleGetInfoUserQuest();
    },
    enabled: isLogin,
  });

  return { userQuestInfo: userQuestInfo, ...rest };
};

export default useUserQuestInfo;
