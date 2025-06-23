import {
  Checkbox,
  Pagination,
  Paper,
  PaperProps,
  SxProps,
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { ReactNode, useMemo } from 'react';
import SkeletonTableBody from '../TableLoading/SkeletonTableBody';

export type TTableHeaderCustom = { title: string; isCheckbox?: boolean } & TableCellProps;
type TProps = {
  tableName: string;
  sxHeaderRow?: SxProps;
  listTitleHeader: TTableHeaderCustom[];
  isLoading?: boolean;
  onClickCheckboxHeader?: (value: boolean) => void;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: ReactNode;
  sxTableBody?: SxProps;
  isCheckAll?: boolean;
  isShowPagination?: boolean;
  page?: number;
  itemPerPage?: number;
  totalPage?: number;
  onChangePage?: (event: React.ChangeEvent<unknown>, page: number) => void;
} & PaperProps;

export default function TableCustom(props: TProps) {
  const {
    tableName,
    children,
    listTitleHeader,
    isLoading,
    sxHeaderRow,
    sxTableBody,
    onClickCheckboxHeader,
    isCheckAll,
  } = props;
  const { totalPage, page, onChangePage, isShowPagination, sx: sxPaper, ...PaperProps } = props;
  const currentPage = useMemo(() => page, [page]);
  return (
    <Paper
      sx={{ width: '100%', overflow: 'hidden', borderTopLeftRadius: '0px', borderTopRightRadius: '0px', ...sxPaper }}
      {...PaperProps}
    >
      <TableContainer id={tableName}>
        <Table stickyHeader={true}>
          <TableHead>
            <TableRow sx={sxHeaderRow}>
              {listTitleHeader.map((item, index) => {
                const { title, sx, isCheckbox, ...tableCellProps } = item;
                return (
                  <TableCell
                    key={tableName + index}
                    sx={{
                      background: 'rgba(241, 241, 241)',
                      textAlign: 'left',
                      color: '#828282',
                      fontSize: '14px',
                      borderBottom: 'none',
                      padding: '23px 18.5px',
                      width: title ? 'max-content' : '300px',
                      ...sx,
                    }}
                    padding={isCheckbox ? 'checkbox' : 'normal'}
                    {...tableCellProps}
                  >
                    {isCheckbox ? (
                      <Checkbox checked={isCheckAll} onClick={() => onClickCheckboxHeader?.(!isCheckAll)} />
                    ) : (
                      title
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody sx={sxTableBody}>
            {isLoading ? <SkeletonTableBody cols={listTitleHeader.length} rows={3} /> : children}
          </TableBody>
        </Table>
      </TableContainer>
      {isShowPagination && (
        <Pagination
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: '16px',
            '& .MuiButtonBase-root': {
              color: 'black !important',
            },
          }}
          page={currentPage}
          count={totalPage}
          variant="outlined"
          shape="rounded"
          onChange={onChangePage}
        />
      )}
    </Paper>
  );
}
