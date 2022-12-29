import { ColumnProps, TableProps } from "../table/table.type";

export interface GridviewColumnProps extends ColumnProps { }

export interface GridViewProps<T> extends TableProps<T> {
  total?: number;
}

export interface GridViewContextProps<T> extends GridViewProps<T> {
  searchQuery: SearchQuery;
}

export interface RenderProps<_T> { }

export interface HeaderProps {
  columns?: ColumnProps[]
}

export interface MainProps<_T> {
  columns?: ColumnProps[]
}

export interface SearchQuery {
  searchKeys: string[];
  searchValue: string;
  sortColumn: string;
  sortDirection: string;
  pageLimit: number;
  pageOffset: number;
}

