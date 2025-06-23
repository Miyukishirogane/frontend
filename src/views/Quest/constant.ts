import { imagePath } from 'src/constants/imagePath';
import { TableHeaderItem } from '../LeaderBoard/type';

export const socialQuestList = [
  {
    image: imagePath.SocialQuestIcon1,
    title: 'Follow TCV on X',
    description: 'Use the "AI Explainer" feature to gain deeper insights into AI positions.',
    point: '10',
    keyword: 'Twitter',
  },
  {
    image: imagePath.SocialQuestIcon2,
    title: 'Join TCV Telegram Channel',
    description: 'Use the "AI Explainer" feature to gain deeper insights into AI positions.',
    point: '10',
    keyword: 'Telegram',
  },
  {
    image: imagePath.SocialQuestIcon3,
    title: 'Follow TCV Medium',
    description: 'Use the "AI Explainer" feature to gain deeper insights into AI positions.',
    point: '10',
    keyword: 'App',
  },
];

export const dailyRewardInfo = [
  { index: 1, reward: '10 TP', image: imagePath.QuestCoin },
  { index: 2, reward: '10 TP', image: imagePath.QuestCoin },
  { index: 3, reward: '10 TP', image: imagePath.DailyRewardStarCoin2 },
  { index: 4, reward: '20 TP', image: imagePath.DailyRewardStarCoin2 },
  { index: 5, reward: '20 TP', image: imagePath.DailyRewardStarCoin3 },
  { index: 6, reward: '30 TP', image: imagePath.DailyRewardStarCoin3 },
  { index: 7, reward: '50 TP', image: imagePath.DailyRewardStarCoin4 },
];

export const dailyKey = 'task-process-daily';
export const socialKey = 'task-process-social';
export const dailyBonus = 'daily-bonus';
export const socialBonus = 'social-bonus';
export const localStoreDate = 'local-store-date';
export const referralCode = 'referral_code';
export const prevAddress = 'prev-address';

export const dataTablePointHeader: TableHeaderItem[] = [
  {
    id: 0,
    title: 'Rank',
    width: '200px',
    align: 'center',
  },
  {
    id: 1,
    title: 'User',
  },
  // {
  //   id: 2,
  //   title: 'Address',
  //   width: '400px',
  // },
  {
    id: 3,
    title: 'Total Point',
  },
];
