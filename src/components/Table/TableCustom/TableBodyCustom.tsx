import { Collapse, TableCell, TableRow, TableRowProps, Typography } from '@mui/material';
import { useState } from 'react';
import EmptyTableBody from './EmptyTableBody';
import { IColumn } from './type';
import { isFunction } from 'src/utils';
interface IEnhancedTableProps<T> {
  columns: IColumn<T>[];
  rows: T[];
  onRowClick?: (item: T, index: number) => void;
  displayEmptyData?: boolean;
  tableRowProps?: TableRowProps | ((row: T) => TableRowProps);
  selectedIds?: (number | string)[];
  idSelectKey?: keyof T;
  collapseContent?: (row: T) => React.ReactNode;
}

const TableBodyCustom = <T extends Record<string, unknown>>(props: IEnhancedTableProps<T>) => {
  const {
    columns,
    rows,
    onRowClick,
    displayEmptyData = true,
    tableRowProps,
    selectedIds = [],
    idSelectKey,
    collapseContent,
  } = props;
  const [isExpandedById, setIsExpandedById] = useState(-1);

  const isSelected = (id: number | string) => selectedIds.indexOf(id) !== -1;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClickRow = (event: any, row: T, rowIndex: number) => {
    if (event.target.localName === 'button') return;
    if (collapseContent) {
      setIsExpandedById(prev => (prev === rowIndex ? -1 : rowIndex));
    }

    onRowClick?.(row, rowIndex);
  };

  if (displayEmptyData && rows?.length === 0) {
    return <EmptyTableBody listTitleLength={columns.length} />;
  }

  return rows.map((row, rowIndex) => {
    const rowProps = tableRowProps && isFunction(tableRowProps) ? (tableRowProps(row) as TableRowProps) : tableRowProps;

    return (
      <>
        <TableRow
          hover
          onClick={event => {
            handleClickRow(event, row, rowIndex);
          }}
          key={`${row.id}-${rowIndex}`}
          {...rowProps}
        >
          {columns.map(column => {
            if (column.isHidden?.(row)) return null;
            const { sx: tableCellSx, ...restTableCellProps } = column.tableCellProps || {};
            const isItemSelected = idSelectKey ? isSelected(row[idSelectKey] as string) : false;
            const isCollapse = Boolean(isExpandedById === rowIndex);

            return (
              <TableCell
                key={column.id as string}
                component="th"
                id={`table-${rowIndex}`}
                scope="row"
                sx={{
                  textAlign: 'left',
                  verticalAlign: 'top',
                  padding: '23px 18px',
                  position: 'relative',
                  ...tableCellSx,
                }}
                {...restTableCellProps}
              >
                {column.renderItem ? (
                  column.renderItem(row, rowIndex, isItemSelected, isCollapse)
                ) : (
                  <Typography sx={{ fontWeight: '700', alignItems: 'center', display: 'flex', gap: 0.5 }}>
                    {String(row[column.id])}
                  </Typography>
                )}
              </TableCell>
            );
          })}
        </TableRow>

        {collapseContent && (
          <TableRow>
            <TableCell
              colSpan={columns.length}
              sx={{
                borderBottom: isExpandedById === rowIndex ? '1px solid #DADBDD' : 'none',
                padding: 0,
              }}
            >
              <Collapse in={isExpandedById === rowIndex} timeout="auto" unmountOnExit>
                {collapseContent?.(row)}
              </Collapse>
            </TableCell>
          </TableRow>
        )}
      </>
    );
  });
};

export default TableBodyCustom;
