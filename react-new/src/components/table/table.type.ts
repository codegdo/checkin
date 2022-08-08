export interface TableProps<D, C> {
  data?: D[];
  columns?: C[];
  status?: string;
  onClick?: (key?: string, value?: string) => void;
}