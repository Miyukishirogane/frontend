import axios from 'axios';
import { apiUrl } from 'src/services/apiUrl';
import { TAutoRaidLeaderboard, TAutoRaidLeaderboardResponse } from 'src/views/AutoRaid/types/leaderboard';

export const getAutoRaidLeaderboard = async (page: number, limit: number) => {
  const resp = await axios.get(apiUrl.getAutoRaidLeaderboard(page, limit));
  return resp.data as TAutoRaidLeaderboardResponse;
};

export const getUserAutoRaidRank = async (address: string) => {
  const resp = await axios.get(apiUrl.getUserAutoRaidRank(address));
  return resp.data as TAutoRaidLeaderboard;
};
