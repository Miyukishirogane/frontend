import axios from 'axios';
import { apiUrl } from '../apiUrl';
import { TypeTODHolder } from 'src/views/ConvertTOD/utils/type';

export const getListTODHolder = async (): Promise<TypeTODHolder[]> => {
  try {
    const response = await axios.get(apiUrl.getListTODHolder());

    if (response.data) {
      return response.data.wallets as TypeTODHolder[];
    } else {
      return [];
    }
  } catch (error) {
    console.log('getListTODHolder', error);
    return [];
  }
};
