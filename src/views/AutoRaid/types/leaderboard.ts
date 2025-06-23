export type TAutoRaidLeaderboard = {
  _id: string;
  userAddress: string;
  totalPoint: number;
  rank: number;
};

export type TAutoRaidLeaderboardResponse = {
  leaderboard: TAutoRaidLeaderboard[];
  totalPage: number;
};
