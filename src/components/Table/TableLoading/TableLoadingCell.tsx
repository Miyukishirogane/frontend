import { TableCell, Skeleton, SxProps } from '@mui/material';
import React from 'react';

interface IProps {
  children: React.ReactNode;
  loading: boolean;
  skeletonStyle?: SxProps;
}

const TableLoadingCell = (props: IProps) => {
  const { loading, children, skeletonStyle } = props;

  if (loading) {
    return (
      <TableCell align="center">
        <Skeleton variant="rounded" height="20px" width="100%" sx={skeletonStyle} />
      </TableCell>
    );
  }

  return children;
};

export default TableLoadingCell;
