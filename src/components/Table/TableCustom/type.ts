import { TableCellProps } from '@mui/material';

type TypeIds<T> = keyof (T & { action?: boolean; checkbox?: boolean });

export interface IColumn<T> {
  id: TypeIds<T>;
  minWidth?: number;
  hidden?: boolean;
  renderItem?: (item: T, index: number, isItemSelected?: boolean, isCollapse?: boolean) => React.ReactNode;
  tableCellProps?: TableCellProps;
  isHidden?: (row: T) => boolean;
}
