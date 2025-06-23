import { Typography } from '@mui/material';
import { useState } from 'react';
import useAutoRaidLeaderboard from 'src/hooks/AutoRaid/useAutoRaidLeaderboard';
import { TAutoRaidLeaderboard } from 'src/views/AutoRaid/types/leaderboard';
import TableCustom, { TTableHeaderCustom } from '../TableCustom/TableCustom';
import { IColumn } from '../TableCustom/type';
import { displayRankQuestTableCell } from 'src/views/Quest/utils';
import TableBodyCustom from '../TableCustom/TableBodyCustom';
import { displayBgTableCell } from 'src/views/LeaderBoard/util';
import { copyTextToClipboard } from 'src/utils';
import CopyAll from '@mui/icons-material/CopyAll';

const listTitleHeader: TTableHeaderCustom[] = [
  {
    title: 'Rank',
    sx: { textAlign: 'center' },
  },
  {
    title: 'User Address',
    sx: { textAlign: 'start' },
  },
  {
    title: 'Total Point',
    sx: { textAlign: 'center' },
  },
];

const itemPerPage = 10;

const AutoRaidRankTable = () => {
  const [page, setPage] = useState<number>(1);
  const { data, isLoading } = useAutoRaidLeaderboard(page, itemPerPage);

  const columns: IColumn<TAutoRaidLeaderboard>[] = [
    {
      id: 'rank',
      tableCellProps: { sx: { textAlign: 'center', width: '200px' } },
      renderItem: row => {
        return displayRankQuestTableCell(row.rank);
      },
    },
    {
      id: 'userAddress',
      tableCellProps: { sx: { textAlign: 'center', width: '600px', verticalAlign: 'middle' } },
      renderItem: row => {
        return (
          <div style={{ display: 'flex', gap: '8px', textTransform: 'lowercase' }}>
            {row.userAddress}{' '}
            <CopyAll
              sx={{ fontSize: '16px', cursor: 'pointer' }}
              onClick={() => copyTextToClipboard(row.userAddress || '', true)}
            />
          </div>
        );
      },
    },
    {
      id: 'totalPoint',
      tableCellProps: { sx: { textAlign: 'center', verticalAlign: 'middle' } },
      renderItem: row => {
        return <Typography variant="body2">{row.totalPoint}</Typography>;
      },
    },
  ];

  return (
    <TableCustom
      isLoading={isLoading}
      listTitleHeader={listTitleHeader}
      page={page}
      totalPage={data?.totalPage || 0}
      onChangePage={(e, newPage) => setPage(newPage)}
      tableName="history_projeet"
      elevation={0}
      isShowPagination={true}
    >
      <TableBodyCustom
        tableRowProps={row => {
          return {
            sx: { background: displayBgTableCell(row.rank) },
          };
        }}
        columns={columns}
        rows={data?.leaderboard || []}
      />
    </TableCustom>
  );
};

export default AutoRaidRankTable;
