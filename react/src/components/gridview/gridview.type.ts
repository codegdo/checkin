export type GridViewProps = {
  data?: any;
  columns?: any;
  boundColumns?: any;
  keyColumn?: any;
  children?: any;
  onSearch?: () => void;
}
export type GridViewContextProps = GridViewProps | undefined;

export type DataProps = {
  name?: string;
  label?: string;
  type?: string;
  isDefault?: boolean;
  isSearch?: boolean;
  children?: any;
}