export type DataColumnProps = {
  id?: number;
  name?: string;
  label?: string;
  type?: string;
  data?: any;
  isDefault?: boolean;
  isSearch?: boolean;
  isKey?: boolean;
  isPrimary?: boolean;
};

export type CurrentQuery = {
  search: {
    keys: string[];
    value: string | null;
  };
  sort: {
    column: string | null;
    direction: string | null;
  };
  paging: {
    limit: number;
    offset: number;
  }
};

export type DataQuery = {
  name: string;
  dataQuery: CurrentQuery;
  search: string;
};

export type GridViewConfig = {
  columns?: any;
  customs?: any;
  pagination?: any;
};

export type GridViewProps<T> = {
  data?: Array<T>;
  columns?: DataColumnProps[];
  config?: GridViewConfig;
  status?: string;
  onCallback?: (data: DataQuery) => void;
};

export type GridViewContextProps<T> = {
  data?: Array<T>;
  columns?: DataColumnProps[];
  config?: GridViewConfig;
  currentQuery: CurrentQuery;
  status: string | undefined;
  onSearch?: (name: string) => void;
};
