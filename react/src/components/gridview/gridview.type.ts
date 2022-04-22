export type GridViewColumn = {
  id: number;
  name: string;
  label: string;
  type: string;
  data: any;
}
export type GridViewProps<T> = {
  data?: Array<T>;
  columns?: GridViewColumn[];
  boundColumns?: any;
  customColumns?: any;
  children?: any;
  onSearch?: () => void;
  onCallback?: () => void;
}
export type GridViewContextProps<T> = GridViewProps<T> | undefined;

export type DataProps = {
  name?: string;
  label?: string;
  type?: string;
  isDefault?: boolean;
  isSearch?: boolean;
  children?: any;
}