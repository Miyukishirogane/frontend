import { atom, useAtomValue, useSetAtom } from 'jotai';
import { dailyBonus, dailyKey, localStoreDate, socialBonus, socialKey } from 'src/views/Quest/constant';
import { queryClient } from '../AppProvider';

export type TQuestState = {
  questDailyCompleted: Record<string, boolean>;
  questSocialCompleted: Record<string, boolean>;
  isClaimedDailyBonus: boolean;
  isClaimedSocialBonus: boolean;
};

const initData: TQuestState = {
  questDailyCompleted: {},
  questSocialCompleted: {},
  isClaimedDailyBonus: false,
  isClaimedSocialBonus: false,
};

export const handleClearStore = () => {
  localStorage.setItem(localStoreDate, new Date().toString());
  localStorage.removeItem(dailyKey);
  localStorage.removeItem(socialKey);
  localStorage.removeItem(dailyBonus);
  localStorage.removeItem(socialBonus);
};

const questState = atom(initData);
questState.onMount = setAtom => {
  const currDate = localStorage.getItem(localStoreDate);
  const isClaimedDailyBonus = localStorage.getItem(dailyBonus);
  const isClaimedSocialBonus = localStorage.getItem(socialBonus);
  const questDailyCompleted =
    localStorage.getItem(dailyKey) != null ? JSON.parse(localStorage.getItem(dailyKey) || '') : {};
  const questSocialCompleted =
    localStorage.getItem(socialKey) != null ? JSON.parse(localStorage.getItem(socialKey) || '') : {};

  if (!currDate || new Date(currDate || '').getDay() !== new Date().getDay()) {
    handleClearStore();
  } else {
    setAtom({
      isClaimedDailyBonus: Boolean(isClaimedDailyBonus),
      isClaimedSocialBonus: Boolean(isClaimedSocialBonus),
      questDailyCompleted: questDailyCompleted,
      questSocialCompleted: questSocialCompleted,
    });
  }
};

export const useQuestState = () => useAtomValue(questState);
export const useQuestFunction = () => {
  const setQuestState = useSetAtom(questState);

  const updateQuestCompleted = (value: Record<string, boolean>, isSocialTask?: boolean) => {
    setQuestState(prev => {
      const prevValue = isSocialTask ? prev.questSocialCompleted : prev.questDailyCompleted;
      const localStoreKey = isSocialTask ? socialKey : dailyKey;
      const objKey = isSocialTask ? 'questSocialCompleted' : 'questDailyCompleted';

      localStorage.setItem(localStoreKey, JSON.stringify({ ...prevValue, ...value }));
      queryClient.invalidateQueries({ queryKey: ['userQuestInfo'] });

      return {
        ...prev,
        [objKey]: { ...prevValue, ...value },
      };
    });
  };

  const updateStatusBonus = (value: boolean, isSocial?: boolean) => {
    setQuestState(prev => {
      const objKey = isSocial ? 'isClaimedSocialBonus' : 'isClaimedDailyBonus';
      const localKey = isSocial ? socialBonus : dailyBonus;

      localStorage.setItem(localKey, `${value}`);
      queryClient.invalidateQueries({ queryKey: ['userQuestInfo'] });

      return {
        ...prev,
        [objKey]: value,
      };
    });
  };

  return {
    updateQuestCompleted,
    updateStatusBonus,
  };
};
