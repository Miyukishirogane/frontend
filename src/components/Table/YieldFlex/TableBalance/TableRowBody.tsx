import { Box, Typography } from '@mui/material';
import { TUserProjeetBalance } from 'src/services/api/yieldFlex/protfolioBalance';
import { BN } from 'src/utils';
import { formatNumber } from 'src/utils/format';
import TableBodyCustom from '../../TableCustom/TableBodyCustom';
import TableCellTokenWithPrice from '../../TableCustom/TableCellTokenWithPrice';
import { IColumn } from '../../TableCustom/type';
import TableBalanceAction from './TableBalanceAction';
import { useChainId } from 'wagmi';
import { projeetTradeTokens } from 'src/views/YieldFlex/mapNameToken';
import { projeetPortTokens } from 'src/views/YieldFlexDashboard/mapNameToken';

interface IProps {
  data: TUserProjeetBalance;
}

const TableRowBody = (props: IProps) => {
  const { data } = props;
  const { token, balance, aprFarming, balanceFree } = data;
  const chainId = useChainId();

  const tokenProjeetTradeByChainId = projeetTradeTokens[chainId];
  const tokenProjeetProfileByChainId = projeetPortTokens[chainId];

  const tokenInfo = tokenProjeetProfileByChainId[token] || projeetPortTokens[42161]['ETH'];
  const Icon = tokenInfo?.icon;

  const column: IColumn<TUserProjeetBalance>[] = [
    {
      id: 'token',
      renderItem: () => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px', ml: 2 }}>
            <Icon />
            <Typography sx={{ fontWeight: '700' }}>{token}</Typography>
          </Box>
        );
      },
    },
    {
      id: 'aprFarming',
      renderItem: () => {
        return (
          <Typography sx={{ fontWeight: '700' }}>
            {formatNumber(BN(aprFarming).times(100), { fractionDigits: 2 })}%
          </Typography>
        );
      },
    },
    {
      id: 'balance',
      renderItem: () => {
        return <TableCellTokenWithPrice tokenInfo={tokenProjeetTradeByChainId?.[token]} balance={balance} />;
      },
    },
    {
      id: 'balanceFree',
      renderItem: () => {
        return <TableCellTokenWithPrice tokenInfo={tokenProjeetTradeByChainId?.[token]} balance={balanceFree} />;
      },
    },
    {
      id: 'action',
      renderItem: () => {
        return <TableBalanceAction token={token} />;
      },
    },
  ];

  return (
    <TableBodyCustom
      columns={column}
      rows={[data]}
      tableRowProps={{
        sx: {
          borderBottom: 'none',
          cursor: 'pointer',
          '&:hover': {
            background: 'rgba(215, 241, 255, 0.50);',
          },
        },
      }}
    />
  );
};

export default TableRowBody;
