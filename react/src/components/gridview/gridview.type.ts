export type GridViewConfig = {
  columns?: any;
  customs?: any;
};
export type GridViewColumn = {
  id: number;
  name: string;
  label: string;
  type: string;
  data: any;
};

export type GridViewProps<T> = {
  data?: Array<T>;
  columns?: GridViewColumn[];
  config?: GridViewConfig;
  boundColumns?: any;
  customColumns?: any;
  onSearch?: () => void;
  onCallback?: () => void;
};

export type DataProps = {
  name?: string;
  label?: string;
  type?: string;
  isDefault?: boolean;
  isSearch?: boolean;
  children?: any;
};
