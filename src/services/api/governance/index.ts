import axios from 'axios';
import { TDelegationData } from 'src/components/Table/Governance/Delegation/type';
import { apiUrl } from 'src/services/apiUrl';

export const getProposalImage = async (ipfsHash: string) => {
  const response = await axios.get(apiUrl.getProposalImage(ipfsHash));
  return response;
};

export const getTopUserByVotingPower = async (): Promise<TDelegationData[]> => {
  const response = await axios.get(apiUrl.getTopUserByVotingPower());

  return response.data;
};
