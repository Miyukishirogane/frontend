import { Box, Typography } from '@mui/material';
import { mapTokenToIcon } from 'src/constants/mapTokenToIcon';
import { TUserProjeetPositionItem } from 'src/services/api/yieldFlex/portfolioPostion';
import TableCustom, { TTableHeaderCustom } from '../../TableCustom/TableCustom';
import TableRowBody from './TableRowBody';

const listTitleHeader: TTableHeaderCustom[] = [
  {
    title: 'LendingPool',
    sx: {
      width: '40%',
    },
  },
  {
    title: 'APY',
    sx: {
      width: '30%',
      minWidth: '120px',
    },
  },
  {
    title: 'Balance',
    sx: {
      width: '30%',
      minWidth: '120px',
    },
  },
];

interface IProps {
  data: TUserProjeetPositionItem;
  isLoading: boolean;
}

const TableTCVPosition = (props: IProps) => {
  const { data, isLoading } = props;
  const { token, detail } = data;
  const Icon = mapTokenToIcon[token] || mapTokenToIcon['ETH'];

  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        p: '28px 28px 16px 28px',
        border: '1px solid #DADBDD',
        borderRadius: '20px',
        tableLayout: 'fixed',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px', mb: '16px' }}>
        <Icon sx={{ fontSize: '36px' }} />
        <Typography fontSize={24} fontWeight={700}>
          {token}
        </Typography>
      </Box>
      <TableCustom
        elevation={0}
        sxHeaderRow={{
          '& th:first-of-type': { borderTopLeftRadius: '12px', borderBottomLeftRadius: '12px' },
          '& th:last-of-type': {
            borderTopRightRadius: '12px',
            borderBottomRightRadius: '12px',
          },
        }}
        isLoading={isLoading}
        listTitleHeader={listTitleHeader}
        tableName="history_dialog_projeet"
      >
        <TableRowBody data={detail} token={token} />
      </TableCustom>
    </Box>
  );
};

export default TableTCVPosition;
