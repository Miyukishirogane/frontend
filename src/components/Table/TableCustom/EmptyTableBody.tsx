import { TableRow, TableCell, Typography } from '@mui/material';
import React from 'react';
import { EmptyIcon } from 'src/assets/EmptyIcon';

interface IProps {
  listTitleLength: number;
}

const EmptyTableBody = (props: IProps) => {
  const { listTitleLength } = props;

  return (
    <TableRow>
      <TableCell colSpan={listTitleLength} align="center" sx={{ py: '28px' }}>
        <EmptyIcon sx={{ fontSize: '140px' }} />
        <Typography variant={'h6'}>No Data</Typography>
      </TableCell>
    </TableRow>
  );
};

export default EmptyTableBody;
