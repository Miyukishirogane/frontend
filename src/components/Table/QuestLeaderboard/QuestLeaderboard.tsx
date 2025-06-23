import { Box, Pagination, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { imagePath } from 'src/constants/imagePath';
import { displayBgTableCell } from 'src/views/LeaderBoard/util';
import { dataTablePointHeader } from 'src/views/Quest/constant';
import { displayRankQuestTableCell } from 'src/views/Quest/utils';
import SkeletonTableBody from '../TableLoading/SkeletonTableBody';
import { handleGetQuestLeaderboardData } from 'src/services/api/quest/questLeaderboard';
import CopyAll from '@mui/icons-material/CopyAll';
import { copyTextToClipboard } from 'src/utils';

const ITEM_PER_PAGE = 10;

const QuestLeaderboard = () => {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const { data: dataTable, isLoading } = useQuery({
    queryKey: ['QuestLeaderboard', page],
    queryFn: async () => {
      const resp = await handleGetQuestLeaderboardData(page, ITEM_PER_PAGE);
      if (resp) {
        setTotalPage(Math.ceil(resp.totalUsers / ITEM_PER_PAGE));
      }

      return resp.leaderboard;
    },
  });

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', mt: 4, pb: 3 }} elevation={1}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {dataTablePointHeader.map(item => (
              <TableCell
                width={item?.width ? item.width : undefined}
                key={item?.id}
                sx={{
                  background: 'rgba(231, 235, 239)',
                  textAlign: item?.align ? item.align : 'left',
                  color: '#828282',
                  fontSize: '14px',
                  borderBottom: 'none',
                  padding: '23px 18.5px',
                }}
              >
                {item?.label || item?.title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <SkeletonTableBody cols={dataTablePointHeader.length} />
          ) : (
            dataTable?.map((item, index) => {
              return (
                <TableRow sx={{ background: displayBgTableCell(item.rank) }} key={item?._id || index}>
                  <TableCell align="center">{displayRankQuestTableCell(item.rank)}</TableCell>
                  <TableCell width={600}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', textTransform: 'lowercase' }}>
                      {item._id}{' '}
                      <CopyAll
                        sx={{ fontSize: '16px', cursor: 'pointer' }}
                        onClick={() => copyTextToClipboard(item._id || '', true)}
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                      {item.totalPoint} <img height={16} width={16} alt="quest_coin" src={imagePath.QuestCoin} />
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>

      <Pagination
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          mr: 4,
          mt: 2,
          '& .MuiButtonBase-root': {
            color: 'black !important',
          },
        }}
        page={page}
        count={totalPage}
        variant="outlined"
        shape="rounded"
        disabled={isLoading}
        onChange={(e, newPage) => {
          setPage(newPage);
        }}
      />
    </Paper>
  );
};

export default QuestLeaderboard;
