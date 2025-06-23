import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { handleGetUserQuestRank } from 'src/services/api/quest/questLeaderboard';
import SkeletonTableBody from '../TableLoading/SkeletonTableBody';
import { displayRankQuestTableCell } from 'src/views/Quest/utils';
import { imagePath } from 'src/constants/imagePath';
import { copyTextToClipboard } from 'src/utils';
import CopyAll from '@mui/icons-material/CopyAll';

const QuestUserRank = () => {
  const { data: dataTable, isLoading } = useQuery({
    queryKey: ['QuestUserRank'],
    queryFn: async () => {
      const resp = await handleGetUserQuestRank();

      return resp;
    },
  });

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', my: 4 }} elevation={1}>
      <TableContainer
        id="scrollTable"
        sx={{
          '&&::-webkit-scrollbar': {
            width: '0.4em',
          },
          '&&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
          },
          '&&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.1)',
            outline: '1px solid slategrey',
          },
          position: 'inherit',
          overflowX: 'scroll',
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  textAlign: 'center',
                  fontSize: '14px',
                  borderBottom: 'none',
                  padding: '23px 18.5px',
                  fontWeight: 700,
                }}
                colSpan={6}
              >
                Your Rank
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? <SkeletonTableBody rows={1} /> : null}

            {!isLoading ? (
              dataTable ? (
                <TableRow sx={{ background: 'linear-gradient(90deg, #E9F4FF 0%, #FFFFFF 100%)' }}>
                  <TableCell align="center" width="200px">
                    {displayRankQuestTableCell(dataTable.rank || 0) || '--'}
                  </TableCell>
                  <TableCell width={600} sx={{ alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', textTransform: 'lowercase' }}>
                      {dataTable._id}{' '}
                      <CopyAll
                        sx={{ fontSize: '16px', cursor: 'pointer' }}
                        onClick={() => copyTextToClipboard(dataTable._id || '', true)}
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                      {dataTable.totalPoint} <img height={16} width={16} alt="quest_coin" src={imagePath.QuestCoin} />
                    </Box>
                  </TableCell>
                </TableRow>
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
              )
            ) : null}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default QuestUserRank;
