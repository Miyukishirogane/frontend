export type TAutoRaidTask = {
  id: number;
  done: boolean;
  claimed: boolean;
  doneAt: number;
  title: string;
  description: string;
  category: string;
  point: number;
  link: string;
};

export type TAutoRaidTaskResponse = {
  userAddress: string;
  totalPoint: number;
  mission: TAutoRaidTask[];
};
