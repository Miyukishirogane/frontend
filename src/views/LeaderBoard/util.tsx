import { imagePath } from 'src/constants/imagePath';
import { TableHeaderItem } from './type';

const displayBgTableCell = (rank: number) => {
  if (rank === 1) return 'linear-gradient(90deg, rgba(146, 217, 255, 0.5) 0%, rgba(242, 249, 255, 0.5) 100%)';
  if (rank === 2) return 'linear-gradient(90deg, rgba(185, 230, 255, 0.5) 0%, rgba(242, 249, 255, 0.5) 100%)';
  if (rank === 3) return 'linear-gradient(90deg, rgba(215, 241, 255, 0.5) 0%, rgba(242, 249, 255, 0.5) 100%)';

  return '#FFFFFF';
};

const displayRankTableCell = (rank: number) => {
  if (rank === 1) return <img src={imagePath.IconRank1} alt="rank_1" style={{ width: '20px', height: '30px' }} />;
  if (rank === 2) return <img src={imagePath.IconRank2} alt="rank_2" style={{ width: '20px', height: '30px' }} />;
  if (rank === 3) return <img src={imagePath.IconRank3} alt="rank_3" style={{ width: '20px', height: '30px' }} />;

  return rank;
};

const tabOptions = [
  {
    value: 0,
    title: 'Trava/TOD Reputation',
  },
  {
    value: 1,
    title: 'Liquidity Position',
  },
  // {
  //   value: 2,
  //   title: 'Token Holding',
  // },
];

const dataTableTODHeader: TableHeaderItem[] = [
  {
    id: 0,
    title: 'Rank',
    width: '200px',
    align: 'center',
  },
  {
    id: 1,
    title: 'Address',
    width: '500px',
  },
  {
    id: 2,
    title: 'Trava/TOD Reputation',
    displayOptional: true,
  },
];

const dataTableLiquidityHeader: TableHeaderItem[] = [
  {
    id: 0,
    title: 'Rank',
    width: '200px',
    align: 'center',
  },
  {
    id: 1,
    title: 'Address',
    width: '400px',
  },
  {
    id: 2,
    title: 'Total Liquidity',
  },
  {
    id: 3,
    title: 'Liquidity Position',
    label: 'Uniswap Liquidity Score',
    displayOptional: true,
  },
  {
    id: 4,
    title: 'Camelot Liquidity Score',
  },
];

const dataTableDexHeader: TableHeaderItem[] = [
  {
    id: 0,
    title: 'Rank',
    width: '200px',
    align: 'center',
  },
  {
    id: 1,
    title: 'Address',
    width: '400px',
  },
  {
    id: 2,
    title: 'DEX Token Position',
    displayOptional: true,
  },
  {
    id: 3,
    title: 'Uniswap Holded',
  },
  {
    id: 4,
    title: 'Grail Holded',
  },
  {
    id: 5,
    title: 'Pancake Holded',
  },
];

export { displayBgTableCell, displayRankTableCell, tabOptions, dataTableTODHeader, dataTableLiquidityHeader, dataTableDexHeader };
