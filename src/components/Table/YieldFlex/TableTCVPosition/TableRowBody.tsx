import { Box, Typography } from '@mui/material';
import { TAppDenom } from 'src/constants/mapTokenToIcon';
import { TUserProjeetPositionDetail } from 'src/services/api/yieldFlex/portfolioPostion';
import { BN } from 'src/utils';
import { formatNumber } from 'src/utils/format';
import { listPoolInfo } from 'src/views/YieldFlexDashboard/constants';
import TableBodyCustom from '../../TableCustom/TableBodyCustom';
import TableCellTokenWithPrice from '../../TableCustom/TableCellTokenWithPrice';
import { IColumn } from '../../TableCustom/type';
import { projeetPortTokens } from 'src/views/YieldFlexDashboard/mapNameToken';
import { useChainId } from 'wagmi';

interface IProps {
  data: TUserProjeetPositionDetail[];
  token: TAppDenom;
}

const TableRowBody = (props: IProps) => {
  const { data, token } = props;
  const chainId = useChainId();

  const tokenProjeetProfileByChainId = projeetPortTokens[chainId];
  const tokenInfo = tokenProjeetProfileByChainId[token] || projeetPortTokens[42161]['ETH'];

  const columns: IColumn<TUserProjeetPositionDetail>[] = [
    {
      id: 'projectId',
      tableCellProps: { sx: { borderBottom: 'none' } },
      renderItem: row => {
        const Icon = listPoolInfo[row.projectId].icon || listPoolInfo['aave-v3'].icon;

        return (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Icon />
            <Typography sx={{ fontWeight: '700' }}>{row.projectId}</Typography>
          </Box>
        );
      },
    },
    {
      id: 'aprFarming',
      tableCellProps: { sx: { borderBottom: 'none' } },
      renderItem: row => (
        <Typography sx={{ fontWeight: '700' }}>
          {formatNumber(BN(row.aprFarming).times(100), { fractionDigits: 2 })}%
        </Typography>
      ),
    },
    {
      id: 'balance',
      tableCellProps: { sx: { borderBottom: 'none' } },
      renderItem: row => {
        const balance = BN(row.balance).dividedBy(`1e${tokenInfo.decimal}`);
        return <TableCellTokenWithPrice tokenInfo={tokenInfo} balance={balance.toString()} />;
      },
    },
  ];

  return (
    <TableBodyCustom
      columns={columns}
      rows={data}
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
