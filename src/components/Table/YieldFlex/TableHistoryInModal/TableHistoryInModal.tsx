import { Box, Grid, Typography } from '@mui/material';
import { ReactNode, useMemo } from 'react';
import useGetDcaHistoryDetail from 'src/hooks/Projeet/useGetDcaHistoryDetail';
import { TDcaHistory } from 'src/services/api/yieldFlex/dcaHistory';
import { formatDate, formatDuration, formatNumber } from 'src/utils/format';
import { dcaStatus } from 'src/views/YieldFlex/constants';
import { TTokenProjeetInfo } from 'src/views/YieldFlex/type';
import TableCustom, { TTableHeaderCustom } from '../../TableCustom/TableCustom';
import TableRowBody from './TableRowBody';
import ChipStatus, { TStatusInChip } from 'src/components/Chip/ChipStatus';

interface IProps {
  dcaId: string;
  tokenInInfo: TTokenProjeetInfo;
  tokenOutInfo: TTokenProjeetInfo;
  data: TDcaHistory;
  currentPrice: number;
}

type TDataDetail = {
  title: string;
  value: ReactNode;
};

const TableHistoryInModal = (props: IProps) => {
  const { dcaId, tokenInInfo, tokenOutInfo, data, currentPrice } = props;
  const { historyDetails, isLoading } = useGetDcaHistoryDetail({ id: dcaId });

  // const currentValue = useMemo(() => {
  //   return data.tokenOutAmount * currentPrice;
  // }, [data, currentPrice]);

  const pair = data.pair;

  const listTitleHeader: TTableHeaderCustom[] = useMemo(() => {
    return [
      {
        title: 'Buy',
        sx: {
          background: '#fff',
          padding: '16px 16px',
          borderBottom: '1px solid #DADBDD',
        },
      },
      {
        title: 'With',
        sx: {
          background: '#fff',
          padding: '16px 16px',
          borderBottom: '1px solid #DADBDD',
          borderLeft: '1px solid #DADBDD',
        },
      },
      {
        title: pair + ' Price',
        sx: {
          background: '#fff',
          padding: '16px 16px',
          borderBottom: '1px solid #DADBDD',
          borderLeft: '1px solid #DADBDD',
        },
      },
      {
        title: 'At',
        sx: {
          background: '#fff',
          padding: '16px 16px',
          borderBottom: '1px solid #DADBDD',
          borderLeft: '1px solid #DADBDD',
        },
      },
    ];
  }, [pair]);

  const listDataDetail: TDataDetail[] = useMemo(() => {
    return [
      { title: 'Total Cost Spent', value: `$ ` + formatNumber(data.costSpent, { fractionDigits: 2, fallback: 0 }) },
      { title: 'Status', value: <ChipStatus status={dcaStatus[data.status] as TStatusInChip} /> },
      { title: 'Return Value', value: '$ ' + formatNumber(data.tokenOutValue, { fractionDigits: 2, fallback: 0 }) },
      {
        title: 'Recurring Cycle',
        value: formatDuration(data.recurringCycle),
      },
      {
        title: pair + ' Price',
        value: formatNumber(currentPrice, { fractionDigits: 2, fallback: 0 }),
      },
      { title: 'Created At', value: formatDate(new Date(data.createdAt * 1000), 'MM/dd/yyyy HH:mm') },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Box sx={{ py: 2, px: 2, border: 'none' }}>
      <Typography variant="h6" sx={{ color: '#000', fontWeight: '600', mb: 1 }}>
        More Info
      </Typography>
      <Grid container spacing={'8px'} sx={{ my: 2 }}>
        {listDataDetail.map(data => {
          return (
            <Grid item xs={12} md={6} key={data.title} sx={{ display: 'flex', gap: '8px' }}>
              <Typography>{data.title}:</Typography>
              <Typography fontWeight={600}>{data.value}</Typography>
            </Grid>
          );
        })}
      </Grid>
      <TableCustom
        isLoading={isLoading}
        listTitleHeader={listTitleHeader}
        tableName="history_dialog_projeet"
        sxHeaderRow={{
          height: '50px',
        }}
        sx={{
          border: '2px solid #DADBDD',
          borderRadius: '10px',
          '& .MuiTableCell-root': {
            tableLayout: 'fixed',
          },
        }}
      >
        <TableRowBody historyDetails={historyDetails || []} tokenInInfo={tokenInInfo} tokenOutInfo={tokenOutInfo} />
      </TableCustom>
    </Box>
  );
};

export default TableHistoryInModal;
