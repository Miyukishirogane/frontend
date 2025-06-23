import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import useGetDcaHistory from 'src/hooks/Projeet/useGetDcaHistory';
// import { dcaStatus } from 'src/views/ProjeetTrade/constants';
import { useNavigate } from 'react-router-dom';
import CustomSelectField from 'src/components/CustomForm/CustomSelectField';
import TableCustom from '../../TableCustom/TableCustom';
import TableRowBody from './TableRowBody';
import { itemPerPage, listTitleHeader, statusOptions } from './const';

const TableHistory = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState<number>(1);
  const [status, setStatus] = useState<string>('All');

  const { dcaHistory, isLoading, totalPage } = useGetDcaHistory({
    itemPerPage: itemPerPage,
    status: status,
    page: page,
  });
  // const isHasActiveStatus = dcaHistory?.some(item => dcaStatus[item.status] === 'Active');
  // const header = !isHasActiveStatus ? listTitleHeader.slice(0, listTitleHeader.length - 1) : listTitleHeader;

  return (
    <Box
      sx={{
        boxShadow: '0px 3px 8px 0px rgba(0, 0, 0, 0.12)',
        borderRadius: '20px',
        mb: '20px',
        backgroundColor: '#fff',
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        flexDirection={{ xs: 'column', sm: 'row' }}
        gap="16px"
        sx={{ p: '16px' }}
      >
        <Typography variant="caption2" sx={{ fontSize: '18px', color: '#000', fontWeight: '600' }}>
          History
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          gap="16px"
          sx={{
            alignSelf: { xs: 'flex-start', sm: 'center' },
          }}
        >
          <CustomSelectField
            value={status}
            sx={{
              textAlign: 'start',
              '& svg': {
                right: '10px !important',
              },
            }}
            onChange={e => setStatus(e.target.value as string)}
            options={statusOptions}
            size="small"
          />
          <Button
            variant="outlined"
            onClick={() => {
              navigate('/dashboard?tab=yieldFlex', { replace: true });
            }}
            sx={{ borderRadius: '18px' }}
          >
            Withdraw
          </Button>
        </Box>
      </Box>

      <TableCustom
        isLoading={isLoading}
        listTitleHeader={listTitleHeader}
        page={page}
        totalPage={totalPage}
        onChangePage={(e, newPage) => setPage(newPage)}
        tableName="history_projeet"
        elevation={0}
        sx={{
          '& .MuiTableContainer-root': {
            maxHeight: 'unset',
          },
        }}
        isShowPagination={true}
      >
        <TableRowBody data={dcaHistory || []} />
      </TableCustom>
    </Box>
  );
};

export default TableHistory;
