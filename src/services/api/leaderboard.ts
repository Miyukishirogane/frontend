import axios from 'axios';
import { ReturnTypeDataTable, ReturnTypeUserDataTable, LeaderboardTableType } from 'src/views/LeaderBoard/type';
import { Address } from 'viem';
import { apiUrl } from '../apiUrl';

const blankValue = {
  data: [] as LeaderboardTableType[],
  totalDocs: 0,
};

export const getRankLeaderBoardLiquidityPosition = async (page: number, pageSize: number): Promise<ReturnTypeDataTable> => {
  try {
    const response = await axios.get(apiUrl.getRankLeaderBoardLiquidityPosition(page, pageSize));

    if (response.data) {
      return response.data as ReturnTypeDataTable;
    } else {
      return blankValue;
    }
  } catch (error) {
    console.log('getRankLeaderBoardLiquidityPosition', error);
    return blankValue;
  }
};

export const getRankLeaderBoardDexToken = async (page: number, pageSize: number): Promise<ReturnTypeDataTable> => {
  try {
    const response = await axios.get(apiUrl.getRankLeaderBoardDexToken(page, pageSize));

    if (response.data) {
      return response.data as ReturnTypeDataTable;
    } else {
      return blankValue;
    }
  } catch (error) {
    console.log('getRankLeaderBoardDexToken', error);
    return blankValue;
  }
};

export const getRankLeaderBoardReputationTrava = async (page: number, pageSize: number): Promise<ReturnTypeDataTable> => {
  try {
    const response = await axios.get(apiUrl.getRankLeaderBoardReputationTrava(page, pageSize));

    if (response.data) {
      return response.data as ReturnTypeDataTable;
    } else {
      return blankValue;
    }
  } catch (error) {
    console.log('getRankLeaderBoardReputationTrava', error);
    return blankValue;
  }
};

export const getCurrUserTravaRank = async (wallet: Address): Promise<ReturnTypeUserDataTable> => {
  try {
    const response = await axios.get(apiUrl.getUserTravaRank(wallet));

    if (response.data) {
      return response.data as ReturnTypeUserDataTable;
    } else {
      return {} as ReturnTypeUserDataTable;
    }
  } catch (error) {
    console.log('getCurrUserRank', error);
    return {} as ReturnTypeUserDataTable;
  }
};

export const getCurrUserLiquidityRank = async (wallet: Address): Promise<LeaderboardTableType> => {
  try {
    const liquidityRank = await axios.get(apiUrl.getUserLiquidityRank(wallet));

    if (liquidityRank) {
      return liquidityRank.data as LeaderboardTableType;
    } else {
      return {} as LeaderboardTableType;
    }
  } catch (error) {
    console.log('getCurrUserRank', error);
    return {} as LeaderboardTableType;
  }
};

export const getCurrUserDexRank = async (wallet: Address): Promise<LeaderboardTableType> => {
  try {
    const liquidityRank = await axios.get(apiUrl.getUserDexRank(wallet));

    if (liquidityRank) {
      return liquidityRank.data as LeaderboardTableType;
    } else {
      return {} as LeaderboardTableType;
    }
  } catch (error) {
    console.log('getCurrUserRank', error);
    return {} as LeaderboardTableType;
  }
};
