/**
 * @todo TUrl for check route is in Project or not
 * @example
 * value = 0 => route insite project
 * value = 1 => route outsite project
 */

export const urlPrivateSale = btoa('TCV - Maximize the Power of Liquidity with AI - public_sale');
export type TUrl = 1 | 0;
export type TTargetLink = '_blank' | '_parent' | '_self' | '_top' | undefined;
export type TMenu = {
  title: string;
  url: string;
  target: TTargetLink;
  children?: TMenu;
  type: TUrl;
  tag?: string;
  isInCanalixDropDown?: boolean;
  isInAirdropDropDown?: boolean;
  isInQuestDropDown?: boolean;
}[];

export const menu: TMenu = [
  // {
  //   title: 'AutoRaid',
  //   url: '/autoRaid',
  //   children: [],
  //   type: 0,
  //   target: undefined,
  //   tag: 'Event',
  // },
  // {
  //   title: 'YieldFlex',
  //   url: '/yieldFlex',
  //   children: [],
  //   type: 0,
  //   target: undefined,
  // },

  {
    title: 'Liquidity',
    url: '/liquidity',
    children: [],
    type: 0,
    target: undefined,
  },
  {
    title: 'Faucet',
    url: '/faucet',
    type: 0,
    target: undefined,
  },
  // {
  //   title: 'Dashboard',
  //   url: '/dashboard',
  //   type: 0,
  //   target: undefined,
  // },

  // Canalix
  // {
  //   title: 'Canalix',
  //   url: '/canalix',
  //   children: [
  //     {
  //       title: 'Market',
  //       url: '/market',
  //       type: 0,
  //       target: undefined,
  //     },
  //     {
  //       title: 'Pool',
  //       url: '/pool',
  //       type: 0,
  //       target: undefined,
  //     },
  //     {
  //       title: 'Portfolio',
  //       url: '/portfolio',
  //       type: 0,
  //       target: undefined,
  //     },
  //   ],
  //   type: 0,
  //   target: undefined,
  // },

  //Airdrop
  // {
  //   title: 'Airdrop',
  //   url: '/airdrop',
  //   children: [
  //     {
  //       title: 'Campaign',
  //       url: '/campaign',
  //       type: 0,
  //       target: undefined,
  //     },
  //     {
  //       title: 'Leaderboard',
  //       url: '/leader_board',
  //       type: 0,
  //       target: undefined,
  //     },
  //     {
  //       title: 'Convert TCP',
  //       url: '/convert_tcp',
  //       type: 0,
  //       target: undefined,
  //     },
  //   ],
  //   type: 0,
  //   target: undefined,
  // },

  //Quests
  // {
  //   title: 'Quest',
  //   url: '/quest',
  //   children: [
  //     {
  //       title: 'Daily Quest',
  //       url: 'quest/daily_quest',
  //       type: 0,
  //       target: undefined,
  //     },
  //     {
  //       title: 'Social Quest',
  //       url: 'quest/social_quest',
  //       type: 0,
  //       target: undefined,
  //     },
  //     {
  //       title: 'Special Quest',
  //       url: 'quest/special_quest',
  //       type: 0,
  //       target: undefined,
  //     },
  //     {
  //       title: 'Leaderboard',
  //       url: 'quest/leaderboard',
  //       type: 0,
  //       target: undefined,
  //     },
  //   ],
  //   type: 0,
  //   target: undefined,
  // },
  // {
  //   title: 'Governance',
  //   url: '/governance',
  //   type: 0,
  //   target: undefined,
  // },
];
