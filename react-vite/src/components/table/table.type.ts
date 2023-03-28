import { PropsWithChildren } from "react";

export interface ColumnProps {
  id?: string | number;
  className?: string;
  name: string;
  label?: string;
  type?: string;
  role?: string;
}

export interface TableProps<T> extends PropsWithChildren {
  data?: T[];
  columns?: ColumnProps[];
  className?: string;
  status?: string;
  onCallback?: (payload: { key?: string, name?: string, value?: string }) => void;
}

export interface TBodyProps<_T> { }

