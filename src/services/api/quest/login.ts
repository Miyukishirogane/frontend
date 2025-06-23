import axios from 'axios';
import { apiUrl } from 'src/services/apiUrl';
import { Address } from 'viem';

export const handleLogin = async (address: Address) => {
  try {
    const resp = await axios.post(apiUrl.loginByWallet(), { address: address });

    if (resp?.data) {
      return resp.data?.jwt;
    }
  } catch (error) {
    console.log('handleLogin error', error);
  }
};
