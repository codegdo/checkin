import { useEffect, useRef } from 'react';
import { TableField, KeyValue } from '../types';

export interface TableOptions {
  editable?: boolean;
}

interface IProps {
  title?: string;
  data?: KeyValue[] | null;
  columns?: TableField[] | null;
  options?: TableOptions;
  status?: string;
  onClick?: (keyValue: KeyValue) => void;
  onChange?: (keyValue: KeyValue) => void;
}

interface TableRef {
  initialValues: Record<string, Record<string, string>[]>;
  values: Record<string, string>[];
}

export const useTableState = ({ title, data = [], columns = [], options, status, onClick, onChange }: IProps) => {
  const ref = useRef<TableRef>({
    initialValues: {},
    values: []
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
    onClick,
    onChange
  }
}