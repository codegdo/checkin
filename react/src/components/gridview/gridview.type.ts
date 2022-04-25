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

export type GridViewConfig = {
  columns?: any;
  customs?: any;
};

export type GridViewProps<T> = {
  data?: Array<T>;
  columns?: DataColumnProps[];
  config?: GridViewConfig;
  boundColumns?: any;
  customColumns?: any;
  onSearch?: () => void;
  onCallback?: () => void;
};

