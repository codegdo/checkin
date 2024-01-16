import { useEffect, useRef } from 'react';
import { Field } from '../types';

export interface TableOptions { }

interface IProps {
  title?: string;
  data?: Field[][] | null;
  columns?: Field[] | null;
  options?: TableOptions;
  status?: string;
  callback?: () => void;
}

interface TableRef {
  initialValues: Record<string, Record<string, string>[]>;
  values: Record<string, Record<string, string>[]>;
}

export const useTableState = ({ title, data = [], columns = [], options, status, callback }: IProps) => {
  const ref = useRef<TableRef>({
    initialValues: {},
    values: {}
  });

  useEffect(() => {
    console.log('Table', ref.current);
  }, []);

  return {
    ref: ref.current,
    table: {
      title,
      data,
      columns,
      options,
    },
    status,
    callback
  }
}