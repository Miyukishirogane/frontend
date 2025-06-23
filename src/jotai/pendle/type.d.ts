import BigNumber from 'bignumber.js';

export type TTradingVolume = {
  longYield: number;
  shortYield: number;
};

export type TPendleState = {
  name: string;
  PT: Address;
  SY: Address;
  YT: Address;
  tokenMintSy: Address;
  tokens: [Address, Address];
  totalPt: string;
  totalSy: string;
  totalLp: string;
  expiry: Date;
  daysLeft: string;
  ptFixedYield: string;
  marketAddress: Address;
  lpPosition: string;
  ptPosition: string;
  ytPosition: string;
  price: number | null;
  syBalance?: string;
  ptBalance?: string;
  ytBalance?: string;
  lpBalance?: string;
  assetInterest?: string;
  syInterest?: string;
  assetAmount?: string;
  syAmount?: string;
  longYield?: number;
  underlyingApy?: number;
  ptPrice?: number;
  ytPrice?: number;
  protocol: string;
};

export type TPendleDetailState = {
  name: string;
  PT: Address;
  SY: Address;
  YT: Address;
  tokenMintSy: Address;
  tokens: [Address, Address];
  totalPt: string;
  totalSy: string;
  totalLp: string;
  expiry: Date;
  daysLeft: string;
  ptFixedYield: string;
  marketAddress: Address;
  lpPosition: string;
  ptPosition: string;
  ytPosition: string;
  price: number | null;
  syBalance: string;
  ptBalance: string;
  ytBalance: string;
  lpBalance: string;
  impliedAPY: string[];
  timestamp: string[];
  ptToAsset: string[];
  ytToAsset: string[];
  assetInterest?: string;
  syInterest?: string;
  tradingVolume?: Record<string, TTradingVolume>;
  protocol: string;
};

export type TPendleBalances = {
  [marketAddress: string]: TBalanceInfo;
};

export type TBalanceInfo = {
  syBalance: string;
  ptBalance: string;
  ytBalance: string;
  lpBalance: string;
};

export type TMarketInfo = {
  name: string;
  SY: EthAddress;
  PT: EthAddress;
  YT: EthAddress;
  tokenMintSy: EthAddress;
  tokens: EthAddress[];
  totalPt: int256;
  totalSy: int256;
  totalLp: int256;
  expiry: Date;
  daysLeft: uint256;
  ptFixedYield: uint256;
  protocol: string;
};

export type TSwapData = {
  inTokenYT?: string | null;
  inTokenPT?: string | null;
  inYtDes?: string | null;
  inPtDes?: string | null;
  outTokenYT?: string | null;
  outTokenPT?: string | null;
  outYTDes?: string | null;
  outPTDes?: string | null;
  outYTUSDT?: string | null;
  outPTUSDT?: string | null;
  outMintUSDT?: string | null;
  outRedeemUSDT?: string | null;
  YTpriceToken?: string | null;
  PTpriceToken?: string | null;
};

export type TMintData = {
  inTokenMint?: string | null;
  outPtMint?: string | null;
  outYtMint?: string | null;
  inputPtRedeem?: string | null;
  outTokenRedeem?: string | null;
  outMintYTUSDT?: string | null;
  outMintPTUSDT?: string | null;
  outRedeemPTUSDT?: string | null;
  outRedeemYTUSDT?: string | null;
  MintPriceToken?: string | null;
  RedeemToken?: string | null;
};

export type StatesObject = {
  [marketAddress: string]: {
    name: string;
    SY: EthAddress;
    PT: EthAddress;
    YT: EthAddress;
    tokenMintSy: EthAddress;
    tokens: EthAddress[];
    totalPt: int256;
    totalSy: int256;
    totalLp: int256;
    expiry: Date;
    daysLeft: uint256;
    ptFixedYield: uint256;
    protocol: string;
  };
};

export type TPendleStateData = {
  loading: boolean;
  priceLoading: boolean;
  error: Error | null;
  router: string | null;
  listPendle: TPendleState[];
  listPendlePortfolio: TPendleState[];
  listPendleBanner: TPendleState[];
  balance: { [key: string]: BigNumber };
  DetailPendetail: TPendleDetailState | null;
  tab: string;
  tokenToggle: string;
  SwapData: TSwapData;
  loadPrivew: boolean;
  tokenSelect: Address | null;
  MintData: TMintData;
  mint: string;
  tabsRight: string;
  timeChart: '1H' | '1D' | '1W';
  tabPool: 'add' | 'remove';
  addPoolData: {
    lpToReserve?: string;
    lpToAccount?: string;
    tokenUsed?: string;
    ptUsed?: string;
    outPtUSDT?: string;
    outLpUSDT?: string;
  };
  removePoolData: {
    tokenToAccount?: string;
    ptToAccout?: string;
    outLPUSDT?: string;
    outPTUSDT?: string;
  };
  userPositions: {
    ptPosition?: string;
    ytPosition?: string;
    lpPosition?: string;
    syInterest?: string;
    assetInterest?: string;
  };
  dataModalClaim: TPendleState | null;
  loadingModal: boolean;
  useUSD: boolean;
  showUnder: boolean;
};
