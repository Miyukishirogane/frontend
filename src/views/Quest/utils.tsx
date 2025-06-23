import { imagePath } from 'src/constants/imagePath';
import { TBonusReward } from './type';

export const findQuestByType = (isSocial: boolean, quest: TBonusReward[] = []) => {
  if (isSocial) {
    return quest.find(item => item.type.toLowerCase().includes('social'));
  }

  return quest.find(item => item.type.toLowerCase().includes('daily'));
};

export const displayRankQuestTableCell = (rank: number) => {
  if (rank === 1) return <img src={imagePath.QuestRank1} alt="rank_1" />;
  if (rank === 2) return <img src={imagePath.QuestRank2} alt="rank_2" />;
  if (rank === 3) return <img src={imagePath.QuestRank3} alt="rank_3" />;

  return rank;
};
