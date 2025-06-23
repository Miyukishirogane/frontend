import axios from 'axios';
import { queryClient } from 'src/jotai/AppProvider';
import { TAppChainId } from 'src/jotai/wallet/type';
import { apiUrl } from 'src/services/apiUrl';
import { Address } from 'viem';

export async function getListMarketPriceInfoChainId(
  chainId: TAppChainId,
  address: Address,
): Promise<Record<string, number>> {
  try {
    const response = await axios.get(apiUrl.getListPrice(chainId, address));
    const data =
      response && response.data
        ? response.data[Object.keys(response.data)[0]].price_data
        : (null as Record<number, number> | null);

    return data;
  } catch (err) {
    return {};
  }
}

export async function getListMarketPriceInfoChainIdNow(chainId: TAppChainId, address: Address): Promise<number> {
  try {
    const response = await queryClient.ensureQueryData({
      queryKey: ['getListMarketPriceInfoChainIdNow', chainId, address],
      queryFn: async () => await axios.get(apiUrl.getLatestPrice(chainId, address)),
      staleTime: 60 * 1000,
    });

    if (response.data) {
      return response.data?.price as number;
    } else {
      return 1;
    }
  } catch (err) {
    console.log(err);
    return 1;
  }
}

export async function getPriceInfoChainIdNow(chainId: TAppChainId, address: Address): Promise<number> {
  try {
    const url = apiUrl.getLatestPrice(chainId, address);
    const res = await axios.get(url);
    if (res && res.data) {
      return res.data?.price as number;
    } else {
      return 1;
    }
  } catch (err) {
    console.log(err);
    return 1;
  }
}
