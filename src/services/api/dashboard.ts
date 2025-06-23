import axios from 'axios';
import { apiUrl } from '../apiUrl';
import { TAppChainId } from 'src/jotai/wallet/type';
import { Address } from 'viem';
import { TypeDashboardData, TypeDashboardOverView } from 'src/views/Dashboard/type';

const defaultOverview = {
  tvl: 0,
  earningFee: 0,
  pnl: 0,
};

export const handleGetDashboardOverview = async (chainId: TAppChainId, vaultAddress?: Address): Promise<TypeDashboardOverView> => {
  try {
    const response = await axios.get(apiUrl.getDashboardOverview(chainId, vaultAddress));

    return response.data as TypeDashboardOverView;
  } catch (error) {
    console.log('🚀 ~ handleGetDashboardOverview ~ error:', error);
    return defaultOverview;
  }
};

export const handleGetDashboardTvl = async (chainId: TAppChainId, vaultAddress?: Address): Promise<TypeDashboardData> => {
  try {
    const response = await axios.get(apiUrl.getDashboardTvl(chainId, vaultAddress));

    return response.data as TypeDashboardData;
  } catch (error) {
    console.log('🚀 ~ handleGetDashboardTvl ~ error:', error);
    return {} as TypeDashboardData;
  }
};

export const handleGetDashboardEarningFee = async (chainId: TAppChainId, vaultAddress?: Address): Promise<TypeDashboardData> => {
  try {
    const response = await axios.get(apiUrl.getDashboardEarningFee(chainId, vaultAddress));

    return response.data as TypeDashboardData;
  } catch (error) {
    console.log('🚀 ~ handleGetDashboardEarningFee ~ error:', error);
    return {} as TypeDashboardData;
  }
};

export const handleGetDashboardPnl = async (chainId: TAppChainId, vaultAddress?: Address): Promise<TypeDashboardData> => {
  try {
    const response = await axios.get(apiUrl.getDashboardPnl(chainId, vaultAddress));

    return response.data as TypeDashboardData;
  } catch (error) {
    console.log('🚀 ~ handleGetDashboardPnl ~ error:', error);
    return {} as TypeDashboardData;
  }
};
