import { Typography } from '@mui/material';
import TextSmallNumber from 'src/components/TextSmallNumber/TextSmallNumber';
import { TDcaHistoryDetail } from 'src/services/api/yieldFlex/dcaHistoryDetail';
import { BN } from 'src/utils';
import { formatDate, formatNumber } from 'src/utils/format';
import { TTokenProjeetInfo } from 'src/views/YieldFlex/type';
import TableBodyCustom from '../../TableCustom/TableBodyCustom';
import { IColumn } from '../../TableCustom/type';
import { useChainId } from 'wagmi';
import { SvgComponent } from 'src/assets/icon';
import { projeetTradeTokens } from 'src/views/YieldFlex/mapNameToken';

interface IProps {
  historyDetails: TDcaHistoryDetail[];
  tokenInInfo: TTokenProjeetInfo;
  tokenOutInfo: TTokenProjeetInfo;
}

const TableRowBody = (props: IProps) => {
  const { historyDetails, tokenInInfo, tokenOutInfo } = props;
  const chainId = useChainId();

  const tokenListByChainId = projeetTradeTokens[chainId];
  const IconTokenIn = tokenInInfo?.icon || (tokenListByChainId?.['ETH'].icon as SvgComponent);
  const IconTokenOut = tokenOutInfo?.icon || (tokenListByChainId?.['ETH'].icon as SvgComponent);

  const columns: IColumn<TDcaHistoryDetail>[] = [
    {
      id: 'tokenOutAmount',
      tableCellProps: {
        sx: {
          fontWeight: '700',
          borderBottom: '1px solid #DADBDD',
        },
      },
      renderItem: row => {
        return (
          <Typography sx={{ fontWeight: '700', alignItems: 'center', display: 'flex', gap: 0.5 }}>
            <TextSmallNumber value={BN(row.tokenOutAmount)} />
            <IconTokenOut />
          </Typography>
        );
      },
    },
    {
      id: 'tokenInAmount',
      tableCellProps: {
        sx: {
          borderLeft: '1px solid #DADBDD',
          borderBottom: '1px solid #DADBDD',
        },
      },
      renderItem: row => {
        return (
          <Typography sx={{ fontWeight: '700', alignItems: 'center', display: 'flex', gap: 0.5 }}>
            {formatNumber(row.tokenInAmount, { fractionDigits: 4 })}
            <IconTokenIn />
          </Typography>
        );
      },
    },
    {
      id: 'tokenOutInUsd',
      tableCellProps: {
        sx: {
          fontWeight: '700',
          borderLeft: '1px solid #DADBDD',
          borderBottom: '1px solid #DADBDD',
        },
      },
      renderItem: row => {
        return (
          <Typography sx={{ fontWeight: '700', alignItems: 'center', display: 'flex', gap: 0.5 }}>
            {formatNumber(row.tokenOutInUsd, { fractionDigits: 2 })}
          </Typography>
        );
      },
    },
    {
      id: 'time',
      tableCellProps: {
        sx: {
          borderLeft: '1px solid #DADBDD',
          borderBottom: '1px solid #DADBDD',
        },
      },
      renderItem: row => {
        return <Typography sx={{ fontWeight: '700' }}>{formatDate(row.time * 1000, 'MMM d, yyyy H:mm')}</Typography>;
      },
    },
  ];

  return (
    <TableBodyCustom
      columns={columns}
      rows={historyDetails}
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
