import axios from 'axios';
import { apiUrl } from 'src/services/apiUrl';
import { TAutoRaidTaskResponse } from 'src/views/AutoRaid/types/task';
import { Address } from 'viem';

export const getRaidTask = async (userAddress: string) => {
  const resp = await axios.get(apiUrl.getAutoRaidTask(userAddress));
  return resp.data as TAutoRaidTaskResponse;
};

export const claimRaidTask = async (userAddress: Address, missionId: number) => {
  await axios.post(apiUrl.claimAutoRaidTask(userAddress, missionId));
};

export const setMissionDone = async (userAddress: Address, missionId: number) => {
  axios.post(apiUrl.setMissionDone(userAddress, missionId));
};
