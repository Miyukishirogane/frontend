import axios from 'axios';
import { TTradingVolume } from 'src/jotai/pendle/type';
import { TAppChainId } from 'src/jotai/wallet/type';
import { apiUrl } from 'src/services/apiUrl';
import { Address } from 'viem';

export async function getTradingVolumeInfoChainId(chainId: TAppChainId, address: Address): Promise<Record<string, TTradingVolume>> {
  try {
    const response = await axios.get(apiUrl.getTradingVolume(chainId, address));
    const data = response && (response.data[address] as Record<string, TTradingVolume>);
    return data;
  } catch (err) {
    return {} as Record<string, TTradingVolume>;
  }
}
