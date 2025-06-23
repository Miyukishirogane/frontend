import { TAppChainId } from 'src/jotai/wallet/type';
import {
  BACKEND_URL,
  BACKEND_CENTIC,
  BACKEND_CENTIC_URL,
  BACKEND_PROJEET,
  GOVERNANCE_IMAGE,
  BACKEND_AUTO_RAID,
} from './baseURL';
import { Address } from 'viem';

export const apiUrl = {
  getListVaultByChainId: (chainId: TAppChainId) => `${BACKEND_URL}/tcv/vault?chainId=${chainId}`,
  getPoolInfoByVaultAddress: (vaultAddress: Address, chainId: TAppChainId) =>
    `${BACKEND_URL}/tcv/vault/${vaultAddress}/pool?chainId=${chainId}`,

  // Private sale
  postPrivateSale: `${BACKEND_URL}/tcv/private-sale/login`,
  getListPrivateSale: (chainId: TAppChainId) => `${BACKEND_URL}/tcv/private-sale?chainId=${chainId}`,

  // public sale
  getListPublicSale: (chainId: TAppChainId) => `${BACKEND_URL}/tcv/public-sale?chainId=${chainId}`,

  // centic market info
  getListMarketInfo: (chainId: TAppChainId, address: Address) =>
    `${BACKEND_CENTIC}/overview?chainId=${chainId}&address=${address}`,

  // centic market price
  getListPrice: (chainId: TAppChainId, address: Address) =>
    `${BACKEND_CENTIC}/price?chainId=${chainId}&address=${address}`,

  // centic pendle tradingVolume
  getTradingVolume: (chainId: TAppChainId, address: Address) =>
    `${BACKEND_CENTIC}/overview/trading-volume?chainId=${chainId}&address=${address}`,

  // centic market get lastest price
  getLatestPrice: (chainId: TAppChainId, address: Address) =>
    `${BACKEND_CENTIC}/get-latest-price?chainId=${chainId}&address=${address}`,

  // centic get rank LiquidityPosition leader board
  getRankLeaderBoardLiquidityPosition: (page: number, pageSize: number) => {
    return `${BACKEND_CENTIC_URL}/wallet-airdrop-info/leaderboard/liquidity-position?pageSize=${pageSize}&page=${page}`;
  },

  // centic get rank DexToken leader board
  getRankLeaderBoardDexToken: (page: number, pageSize: number) =>
    `${BACKEND_CENTIC_URL}/wallet-airdrop-info/leaderboard/dex-token-holding?pageSize=${pageSize}&page=${page}`,

  // centic get rank ReputationTrava leader board
  getRankLeaderBoardReputationTrava: (page: number, pageSize: number) =>
    `${BACKEND_CENTIC_URL}/wallet-airdrop-info/leaderboard/reputation-trava?pageSize=${pageSize}&page=${page}`,

  // centic get rank reputation_scores user in leader board
  getUserTravaRank: (wallet: Address) =>
    `${BACKEND_CENTIC_URL}/wallet-airdrop-info/wallet-airdrop-info/reputation_scores/wallet?wallet=${wallet}`,

  // centic get rank liquidity user in leader board
  getUserLiquidityRank: (wallet: Address) =>
    `${BACKEND_CENTIC_URL}/wallet-airdrop-info/leaderboard/liquidity-position/user-rank?address=${wallet}`,

  // centic get rank liquidity user in leader board
  getUserDexRank: (wallet: Address) =>
    `${BACKEND_CENTIC_URL}/wallet-airdrop-info/leaderboard/liquidity-position/user-rank?address=${wallet}`,

  // sy info
  getSYInfo: (chainId: TAppChainId, syAddress: Address) =>
    `${BACKEND_URL}/tcv/vault/SY-info/history?chainId=${chainId}&address=${syAddress}`,

  //list user hold TOD
  getListTODHolder: () => `${BACKEND_CENTIC_URL}/wallet-airdrop-info/tod-holders`,

  //dashboard overview
  getDashboardOverview: (chainId: TAppChainId, vaultAddress?: Address) => {
    if (vaultAddress) {
      return `${BACKEND_URL}/tcv/dashboard/overview?chainId=${chainId}&vaultAddress=${vaultAddress}`;
    }

    return `${BACKEND_URL}/tcv/dashboard/overview?chainId=${chainId}`;
  },

  //dashboard tvl
  getDashboardTvl: (chainId: TAppChainId, vaultAddress?: Address) => {
    if (vaultAddress) {
      return `${BACKEND_URL}/tcv/dashboard/tvl?chainId=${chainId}&vaultAddress=${vaultAddress}`;
    }

    return `${BACKEND_URL}/tcv/dashboard/tvl?chainId=${chainId}`;
  },

  //dashboard earning fee
  getDashboardEarningFee: (chainId: TAppChainId, vaultAddress?: Address) => {
    if (vaultAddress) {
      return `${BACKEND_URL}/tcv/dashboard/earning-fee?chainId=${chainId}&vaultAddress=${vaultAddress}`;
    }

    return `${BACKEND_URL}/tcv/dashboard/earning-fee?chainId=${chainId}`;
  },

  //dashboard pnl
  getDashboardPnl: (chainId: TAppChainId, vaultAddress?: Address) => {
    if (vaultAddress) {
      return `${BACKEND_URL}/tcv/dashboard/pnl?chainId=${chainId}&vaultAddress=${vaultAddress}`;
    }

    return `${BACKEND_URL}/tcv/dashboard/pnl?chainId=${chainId}`;
  },

  //login by wallet for quest
  loginByWallet: () => `${BACKEND_CENTIC_URL}/login`,

  //Add bonus in quest
  addBonusQuest: () => `${BACKEND_CENTIC_URL}/tcv-points/add-bonus`,

  //Claim tasks
  claimTask: () => `${BACKEND_CENTIC_URL}/tcv-points/claim-tasks`,

  //Add bonus invite quest
  addPointInvitesQuest: () => `${BACKEND_CENTIC_URL}/tcv-points/invites`,

  //Get list tasks
  getListTask: () => `${BACKEND_CENTIC_URL}/tcv-points/tasks`,

  //Get info user quest
  getInfoUserQuest: () => `${BACKEND_CENTIC_URL}/tcv-points/user-info`,

  //Get quest leader board
  getQuestLeaderBoard: (page: number, pageSize: number) =>
    `${BACKEND_CENTIC_URL}/tcv-points/leaderboard?pageSize=${pageSize}&page=${page - 1}`,

  //Get user quest rank
  getUserQuestRank: () => `${BACKEND_CENTIC_URL}/tcv-points/user-rank`,

  //Lending pool apy
  getLendingPoolApy: (chainId: number, poolAddress: string, tokenAddress: string) =>
    `${BACKEND_URL}/tcv/smart-lending/lending-pools/apy?chainId=${chainId}&poolAddress=${poolAddress}&tokenAddress=${tokenAddress}`,

  //Chart Projeet
  getProjeetChartData: (type: string, pair: string, chainId: number) =>
    `${BACKEND_PROJEET}/chart?type=${type}&pairs=${pair}&chainId=${chainId}`,

  ///getFarmingPrice
  getFarmingPrice: (pair: string, chainId: number) =>
    `${BACKEND_PROJEET}/farming/price?pair=${pair}&chainId=${chainId}`,

  ///getFarmingStrategy
  getFarmingStrategy: (
    minPrice: number,
    maxPrice: number,
    pair: string,
    timeInterval: string,
    chainId: number,
    isBuy: boolean,
  ) =>
    `${BACKEND_PROJEET}/farming/strategy?minPrice=${minPrice}&maxPrice=${maxPrice}&pair=${pair}&timeInterval=${timeInterval}&chainId=${chainId}&isBuy=${isBuy}`,

  ///getTradePosition
  getTradePosition: (addressUser: Address, pair: string, chainId: number) =>
    `${BACKEND_PROJEET}/trade/position?userAddress=${addressUser}&pair=${pair}&chainId=${chainId}`,

  ///Projeet Portfolio Page Balance
  getProjeetPortfolioBalance: (addressUser: Address, chainId: number) =>
    `${BACKEND_PROJEET}/balance/user-balance?userAddress=${addressUser}&chainId=${chainId}`,

  ///Projeet Portfolio Page Balance
  getProjeetPosition: (chainId: number) => `${BACKEND_PROJEET}/balance/total-balance?chainId=${chainId}`,

  ///Get withdraw path
  getWithdrawPath: (tokenAddress: Address, amount: string, chainId: number) =>
    `${BACKEND_PROJEET}/balance/path-withdraw?tokenAddress=${tokenAddress}&amount=${amount}&chainId=${chainId}`,

  ///Get DCA History
  getDcaHistory: (userAddress: Address, status: string, page: number, itemPerPage: number, chainId: number) =>
    `${BACKEND_PROJEET}/dca/get-dca?userAddress=${userAddress}&status=${status}&page=${page}&limit=${itemPerPage}&chainId=${chainId}`,

  ///Get DCA History Detail
  getDcaHistoryDetail: (id: string, chainId: number) =>
    `${BACKEND_PROJEET}/dca/get-dca-detail?dcaId=${id}&chainId=${chainId}`,

  ///Get Proposal Image
  getProposalImage: (ipfsHash: string) => `${GOVERNANCE_IMAGE}${ipfsHash}`,

  //Get TCV DAO
  getTopUserByVotingPower: () => `${BACKEND_URL}/tcv/tcv-dao/user-rank`,

  //Get Auto Raid Leaderboard
  getAutoRaidLeaderboard: (page: number, limit: number) =>
    `${BACKEND_AUTO_RAID}/leaderboard?page=${page}&limit=${limit}`,

  //Get User Auto Raid Rank
  getUserAutoRaidRank: (address: string) => `${BACKEND_AUTO_RAID}/leaderboard/rank?userAddress=${address}`,

  //Get Auto Raid Task
  getAutoRaidTask: (userAddress: string) => `${BACKEND_AUTO_RAID}/mission?userAddress=${userAddress}`,
  //Claim Auto Raid Task
  claimAutoRaidTask: (userAddress: Address, missionId: number) =>
    `${BACKEND_AUTO_RAID}/mission/claim?userAddress=${userAddress}&missionId=${missionId}`,
  //Set Mission Done
  setMissionDone: (userAddress: Address, missionId: number) =>
    `${BACKEND_AUTO_RAID}/mission/done?userAddress=${userAddress}&missionId=${missionId}`,
  //Get Pair Info
  getPairsByChainId: (chainId: number) => `${BACKEND_PROJEET}/info/pair?chainId=${chainId}`,
};
