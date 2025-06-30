/* eslint-disable @typescript-eslint/no-explicit-any */
import { Typography } from '@mui/material';
import LoadingButton from 'src/components/LoadingButton/LoadingButton';
import TableBodyCustom from 'src/components/Table/TableCustom/TableBodyCustom';
import TableCustom, { TTableHeaderCustom } from 'src/components/Table/TableCustom/TableCustom';
import { IColumn } from 'src/components/Table/TableCustom/type';
import usePortfolioPosition from './hooks/usePortfolioPosition';
import { BN } from 'src/utils';
import useCloseTrade from './hooks/useCloseTrade';

// Mock data type for positions
interface TPosition {
  id: string;
  entryPrice: number;
  closePrice: number;
  takeProfit: number;
  pnl: number;
}

// Mock data
const mockPositions: TPosition[] = Array.from({ length: 1 }).map((_, i) => ({
  id: !(1000 + ((i * 2) % 2) == 0) ? 'Long' : 'Short',
  entryPrice: Math.floor(Math.random() * 1000),
  closePrice: Math.floor(Math.random() * 1000),
  takeProfit: Math.floor(Math.random() * 1000),
  pnl: 0.23, // can be negative
}));

const listTitleHeader: TTableHeaderCustom[] = [
  { title: 'Position Long', sx: { textAlign: 'center' } },
  { title: 'Entry Price', sx: { textAlign: 'start' } },
  { title: 'Position', sx: { textAlign: 'center' } },
  { title: '', sx: { textAlign: 'center' } },
];

const mapPositionStatus: Record<number, string> = {
  2: 'Long',
  1: 'Short',
  0: 'Flat',
};

const PositionTable = () => {
  const pagedData = mockPositions;
  const { data: position, isFetching } = usePortfolioPosition();
  const { mutate: closeTrade, isPending } = useCloseTrade();

  const columns: IColumn<TPosition>[] = [
    {
      id: 'id',
      tableCellProps: { sx: { textAlign: 'center', verticalAlign: 'middle' } },
      renderItem: () => <Typography variant="body2">{mapPositionStatus[Number(position?.side) || 0]}</Typography>,
    },
    {
      id: 'entryPrice',
      tableCellProps: { sx: { textAlign: 'left', textTransform: 'lowercase', verticalAlign: 'middle' } },
      renderItem: () => {
        const entryPrice = BN(position?.entryPrice.toString()).div(1e18).toFixed(4);
        return <Typography variant="body2">{entryPrice}</Typography>;
      },
    },
    {
      id: 'pnl',
      tableCellProps: { sx: { textAlign: 'center', verticalAlign: 'middle' } },
      renderItem: () => {
        const balance = BN(position?.balance.toString()).div(1e18).toFixed(4);
        return <Typography variant="body2">{balance}</Typography>;
      },
    },
    {
      id: 'takeProfit',
      tableCellProps: { sx: { textAlign: 'center' } },
      renderItem: () => (
        <LoadingButton
          props={{
            variant: 'outlined',
            sx: {
              width: '180px',
            },
          }}
          loading={isPending}
          onClick={() => closeTrade()}
        >
          Cancel Trade
        </LoadingButton>
      ),
    },
  ];

  return (
    <TableCustom
      sx={{ borderRadius: '20px', mb: 3 }}
      isLoading={isFetching}
      listTitleHeader={listTitleHeader}
      tableName="position_table"
      elevation={0}
    >
      <TableBodyCustom columns={columns as any} rows={pagedData as any} />
    </TableCustom>
  );
};

export default PositionTable;
