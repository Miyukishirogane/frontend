import { apiUrl } from 'src/services/apiUrl';
import { axiosClient } from 'src/services/axios';
import { TLeaderboardApiReturn, TLeaderboardItem } from 'src/views/Quest/type';

export const handleGetQuestLeaderboardData = async (page: number, pageSize: number) => {
  try {
    const leaderboardData = await axiosClient.get(apiUrl.getQuestLeaderBoard(page, pageSize));

    return leaderboardData.data as TLeaderboardApiReturn;
  } catch (error) {
    console.log('🚀 ~ handleGetLeaderboardData ~ error:', error);
    return {} as TLeaderboardApiReturn;
  }
};

export const handleGetUserQuestRank = async () => {
  try {
    const resp = await axiosClient.get(apiUrl.getUserQuestRank());

    return resp.data as TLeaderboardItem;
  } catch (error) {
    console.log('🚀 ~ handleGetLeaderboardData ~ error:', error);
    return {} as TLeaderboardItem;
  }
};
