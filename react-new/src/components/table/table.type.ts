export interface ColumnProps {
  id?: string | number;
  className?: string;
  name: string;
  label?: string;
  type?: string;
  role?: string;
}

export interface TableProps<T> {
  data?: T[];
  columns?: ColumnProps[];
  className?: string;
  status?: string;
  onClick?: (payload: { key?: string, value?: string }) => void;
}

