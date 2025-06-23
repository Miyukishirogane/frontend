import { Pagination, Paper, Tab, Table, TableContainer, Tabs } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { getRankLeaderBoardDexToken, getRankLeaderBoardLiquidityPosition, getRankLeaderBoardReputationTrava } from 'src/services/api/leaderboard';
import { copyTextToClipboard } from 'src/utils';
import { LeaderboardTableType, ReturnTypeDataTable } from 'src/views/LeaderBoard/type';
import { tabOptions } from 'src/views/LeaderBoard/util';
import TableDexHolding from './TableDexHolding';
import TableLiquidity from './TableLiquidity';
import TableTOD from './TableTOD';

const ITEM_PER_PAGE = 10;

const TableLeaderBoard = () => {
  const [page, setPage] = useState(1);
  const [tab, setTab] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const { data: dataTable, isLoading: loading } = useQuery<LeaderboardTableType[]>({
    queryKey: ['TableLeaderBoard', tab, page],
    queryFn: async () => {
      let result: ReturnTypeDataTable;

      switch (tabOptions[tab].title) {
        case 'Trava/TOD Reputation':
          result = await getRankLeaderBoardReputationTrava(page, ITEM_PER_PAGE);
          break;
        case 'Liquidity Position':
          result = await getRankLeaderBoardLiquidityPosition(page, ITEM_PER_PAGE);
          break;
        default:
          result = await getRankLeaderBoardDexToken(page, ITEM_PER_PAGE);
          break;
      }

      if (result) {
        setTotalPage(Math.ceil(result.totalDocs / ITEM_PER_PAGE));
      }

      return result.data;
    },
  });

  const copyText = (_address: string) => {
    copyTextToClipboard(_address);

    toast.success('Copy success');
  };

  const handleChangeTab = (_: React.SyntheticEvent, newValue: number) => {
    if (loading) return;

    setTab(newValue);
    setPage(1);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', mt: '20px', pb: 3 }} elevation={1}>
      <Tabs value={tab} onChange={handleChangeTab} indicatorColor="secondary" textColor="inherit" variant="fullWidth">
        {tabOptions.map(item => (
          <Tab key={item.value} label={item.title} value={item.value} />
        ))}
      </Tabs>

      <TableContainer id="table-leaderboard">
        <Table stickyHeader>
          {tabOptions[tab].title === 'Trava/TOD Reputation' && <TableTOD copyText={copyText} dataTable={dataTable} loading={loading} />}
          {tabOptions[tab].title === 'Liquidity Position' && <TableLiquidity copyText={copyText} dataTable={dataTable} loading={loading} />}
          {tabOptions[tab].title === 'Token Holding' && <TableDexHolding copyText={copyText} dataTable={dataTable} loading={loading} />}
        </Table>
      </TableContainer>

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
        disabled={loading}
        onChange={(e, newPage) => {
          setPage(newPage);
        }}
      />
    </Paper>
  );
};

export default TableLeaderBoard;
