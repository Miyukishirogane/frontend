import CopyAll from '@mui/icons-material/CopyAll';
import { Paper, TableCell, TableRow, Typography } from '@mui/material';
import useUserRaidRank from 'src/hooks/AutoRaid/useUserRaidRank';
import { copyTextToClipboard } from 'src/utils';
import { TAutoRaidLeaderboard } from 'src/views/AutoRaid/types/leaderboard';
import { displayBgTableCell } from 'src/views/LeaderBoard/util';
import { displayRankQuestTableCell } from 'src/views/Quest/utils';
import TableBodyCustom from '../TableCustom/TableBodyCustom';
import TableCustom, { TTableHeaderCustom } from '../TableCustom/TableCustom';
import { IColumn } from '../TableCustom/type';
import useAccount from 'src/hooks/useAccount';

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

const AutoRaidUserRank = () => {
  const { address } = useAccount();
  const { data: userRank, isLoading } = useUserRaidRank();

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
      renderItem: () => {
        return (
          <div style={{ display: 'flex', gap: '8px', textTransform: 'lowercase' }}>
            {address}{' '}
            <CopyAll
              sx={{ fontSize: '16px', cursor: 'pointer' }}
              onClick={() => copyTextToClipboard(address || '', true)}
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
    <Paper sx={{ height: '100%', mt: 4, textAlign: 'center' }}>
      <Typography variant="body1" fontWeight={700} py={2}>
        Your Rank
      </Typography>
      <TableCustom
        isLoading={isLoading}
        listTitleHeader={listTitleHeader}
        tableName="user_auto_raid_rank"
        elevation={0}
      >
        {userRank?.totalPoint && userRank.totalPoint > 0 ? (
          <TableBodyCustom
            tableRowProps={row => {
              return {
                sx: { background: displayBgTableCell(row.rank) },
              };
            }}
            columns={columns}
            rows={userRank ? [userRank] : []}
          />
        ) : (
          <TableRow>
            <TableCell
              sx={{
                textAlign: 'center',
                fontSize: '14px',
                borderBottom: 'none',
                background: 'linear-gradient(90deg, #E9F4FF 0%, #FFFFFF 100%)',
              }}
              colSpan={6}
            >
              You haven't been ranked on the leaderboard yet.
            </TableCell>
          </TableRow>
        )}
      </TableCustom>
    </Paper>
  );
};

export default AutoRaidUserRank;
