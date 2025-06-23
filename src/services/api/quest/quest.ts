import { apiUrl } from 'src/services/apiUrl';
import { axiosClient } from 'src/services/axios';
import { camelize } from 'src/utils';
import { TQuestDataReturn, TUserQuestInfo } from 'src/views/Quest/type';

export const handleGetTodayUserQuest = async () => {
  try {
    const response = await axiosClient.get(apiUrl.getListTask());

    if (response.data) {
      //convert key of data to camelcase
      const formattedKeyData = Object.keys(response.data).reduce((result, key: string) => {
        return { ...result, [camelize(key)]: response.data[key] };
      }, {});

      return formattedKeyData as TQuestDataReturn;
    }

    return {} as TQuestDataReturn;
  } catch (err) {
    console.log('🚀 ~ handleGetTodayUserQuest ~ err:', err);
    return {} as TQuestDataReturn;
  }
};

export const handleSubmitQuest = async (taskId: string) => {
  try {
    const response = await axiosClient.post(apiUrl.claimTask(), { taskId: taskId });

    return response.data;
  } catch (err) {
    console.log('🚀 ~ handleSubmitQuest ~ err:', err);
    return err;
  }
};

export const handleGetBonus = async (category: string) => {
  try {
    const response = await axiosClient.post(apiUrl.addBonusQuest(), { category: category });

    return response.data;
  } catch (err) {
    console.log('🚀 ~ handleGetBonus ~ err:', err);
    throw err;
  }
};

export const handleGetInfoUserQuest = async () => {
  try {
    const response = await axiosClient.get(apiUrl.getInfoUserQuest());

    return response.data as TUserQuestInfo;
  } catch (err) {
    console.log('🚀 ~ handleGetBonus ~ err:', err);
    return {} as TUserQuestInfo;
  }
};

export const handleAddInvitePoint = async (refCode: string) => {
  try {
    const response = await axiosClient.post(apiUrl.addPointInvitesQuest(), { referralCode: refCode });

    return response.data;
  } catch (err) {
    console.log('🚀 ~ handleAddInvitePoint ~ err:', err);
    throw err;
  }
};
