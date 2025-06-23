import { Box, Paper, Typography } from '@mui/material';
import useGetUserPortfolioBalance from 'src/hooks/Projeet/useGetUserPortfolioBalance';
import useAccount from 'src/hooks/useAccount';
import InputSearch from 'src/views/YieldFlexDashboard/components/Portfolio/InputSearch';
import TableCustom, { TTableHeaderCustom } from '../../TableCustom/TableCustom';
import TableRowBody from './TableRowBody';
import { useMemo, useState } from 'react';
import { TUserProjeetBalance } from 'src/services/api/yieldFlex/protfolioBalance';

const listTitleHeader: TTableHeaderCustom[] = [
  {
    title: 'Assets',
  },
  {
    title: 'APY',
  },
  {
    title: 'TVL',
  },
  {
    title: 'Free',
  },
  {
    title: '',
  },
];

const TableBalance = () => {
  const { userBalances, isLoading } = useGetUserPortfolioBalance();
  const { address } = useAccount();
  const [inputSearch, setInputSearch] = useState<string>('');

  const userBalancesFilter: TUserProjeetBalance[] = useMemo(() => {
    if (userBalances)
      return userBalances.filter(userBalance => userBalance.token.includes(inputSearch.toLocaleUpperCase()));
    else return [];
  }, [userBalances, inputSearch]);

  if (!address) {
    return null;
  }

  return (
    <Paper elevation={1}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: '10px',
          justifyContent: { sm: 'space-between', xs: 'left' },
          padding: '28px 28px 16px 28px',
          alignItems: { sm: 'center', xs: 'flex-start' },
        }}
      >
        <Typography variant="caption2" sx={{ fontSize: '20px', color: '#000', fontWeight: '600' }}>
          Your Deposited Amount
        </Typography>

        <InputSearch value={inputSearch} onChange={e => setInputSearch(e.target.value)} />
      </Box>
      <TableCustom isLoading={isLoading} listTitleHeader={listTitleHeader} tableName="balance_projeet">
        {userBalancesFilter.map((data, index) => {
          return <TableRowBody data={data} key={index} />;
        })}
      </TableCustom>
    </Paper>
  );
};

export default TableBalance;
