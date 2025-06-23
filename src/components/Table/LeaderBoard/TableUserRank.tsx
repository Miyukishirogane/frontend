import CopyAll from '@mui/icons-material/CopyAll';
import { Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs } from '@mui/material';
import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import useAccount from 'src/hooks/useAccount';
import useGetUserRank from 'src/hooks/useGetUserRank';
import { copyTextToClipboard } from 'src/utils';
import { formatAddress } from 'src/utils/format';
import { LeaderboardTableType } from 'src/views/LeaderBoard/type';
import { dataTableTODHeader, displayRankTableCell, tabOptions } from 'src/views/LeaderBoard/util';
import SkeletonTableBody from '../TableLoading/SkeletonTableBody';
import { TableLiquidityRowItem } from './TableLiquidity';
import { TableTODRowItem } from './TableTOD';
import { TableDexHoldingRowItem } from './TableDexHolding';

const TableUserRank = () => {
  const { address } = useAccount();
  const { loading, userData: dataTable } = useGetUserRank();

  const [tab, setTab] = useState(0);

  const { userRank } = useMemo(() => {
    if (!dataTable) return { userRank: null, headers: dataTableTODHeader };
    let rank: number | null;

    switch (tabOptions[tab].title) {
      case 'Trava/TOD Reputation':
        rank = dataTable?.rankReputationTrava;
        break;
      case 'Liquidity Position':
        rank = dataTable?.rankLiquidityPosition;
        break;
      case 'Token Holding':
        rank = dataTable?.rankDEXTokenHolding;
        break;
      default:
        rank = null;
        break;
    }

    return { userRank: rank };
  }, [dataTable, tab]);

  const handleRenderRow = (data: LeaderboardTableType) => {
    let component: React.ReactNode;

    switch (tabOptions[tab].title) {
      case 'Trava/TOD Reputation':
        component = <TableTODRowItem data={data} />;
        break;
      case 'Liquidity Position':
        component = <TableLiquidityRowItem data={data} />;
        break;
      case 'Token Holding':
        component = <TableDexHoldingRowItem data={data} />;
        break;
      default:
        component = <TableTODRowItem data={data} />;
        break;
    }

    return component;
  };

  function _copyText(_address: string) {
    copyTextToClipboard(_address);

    toast.success('Copy success');
  }

  const handleChangeTab = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }} elevation={1}>
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
            <TableRow>
              <TableCell colSpan={6}>
                <Tabs
                  value={tab}
                  onChange={handleChangeTab}
                  indicatorColor="secondary"
                  textColor="inherit"
                  variant="fullWidth"
                >
                  {tabOptions.map(item => (
                    <Tab key={item.value} label={item.title} value={item.value} />
                  ))}
                </Tabs>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? <SkeletonTableBody rows={1} /> : null}
            {!loading ? (
              dataTable && (dataTable._id || dataTable.id) && userRank ? (
                <TableRow sx={{ background: 'linear-gradient(90deg, #E9F4FF 0%, #FFFFFF 100%)' }}>
                  <TableCell align="center" width="200px">
                    {displayRankTableCell(userRank || 0) || '--'}
                  </TableCell>
                  <TableCell width="400px">
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', textTransform: 'lowercase' }}>
                      {formatAddress(address || '', 10, 10)}{' '}
                      <CopyAll sx={{ fontSize: '16px', cursor: 'pointer' }} onClick={() => _copyText(address || '')} />
                    </div>
                  </TableCell>

                  {handleRenderRow(dataTable)}
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

export default TableUserRank;
