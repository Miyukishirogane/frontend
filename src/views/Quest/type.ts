export type TQuizOption = {
  isCorrect: boolean;
  label: string;
  value: string;
};

export type TQuestParam = {
  continuousDays: number;
  referralCode: string;
  url: string;
  question: string;
  options: TQuizOption[];
};

export type TQuest = {
  description: string;
  point: number;
  category: string;
  conditions: null;
  name: string;
  recurrence: string;
  type: string;
  _id: string;
  claimed: boolean;
};

export type TBonusReward = TQuest;
export type TDailyConnect = TQuest & { params: Pick<TQuestParam, 'continuousDays'> };
export type TDailyTask = TQuest & { params: Pick<TQuestParam, 'options' | 'question' | 'url'> };
export type TSocialTask = TQuest & { params: Pick<TQuestParam, 'url'> };
export type TSpecialTask = TQuest & { params: Pick<TQuestParam, 'referralCode'> };

export type TQuestDataReturn = {
  bonusReward: TBonusReward[];
  dailyConnect: TDailyConnect[];
  dailyTasks: TDailyTask[];
  socialTasks: TSocialTask[];
  specialTasks: TSpecialTask[];
};

export type TUserQuestInfo = {
  avatar: null;
  clientIP: string;
  createdAt: number;
  invitePoints: number;
  invites: string[];
  name: string | null;
  numberInvites: number;
  referralCode: string;
  totalPoint: number;
  _id: string;
};

export type TLeaderboardItem = {
  avatar: string | null;
  name: string | null;
  rank: number;
  totalPoint: number;
  _id: string;
};

export type TLeaderboardApiReturn = {
  leaderboard: TLeaderboardItem[];
  totalUsers: number;
};
