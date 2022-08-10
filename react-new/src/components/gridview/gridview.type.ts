import { ColumnProps, TableProps } from "../table/table.type";

export interface GridviewColumnProps extends ColumnProps { }
export interface GridViewProps<T> extends TableProps<T> {
  total?: number;
}

export interface RenderProps { }

export interface HeaderProps {
  columns?: ColumnProps[]
}

export interface MainProps {
  columns?: ColumnProps[]
}


