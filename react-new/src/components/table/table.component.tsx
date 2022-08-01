import React from 'react';
import { TBody } from './table.body';
import { TableProvider } from './table.context';
import { THead } from './table.head';

export interface TableProps {
  data?: any;
  columns?: any;
  status?: string | undefined;
  onCallback?: (key?: string, value?: string) => void;
}

export const Table: React.FC<TableProps> = (props): JSX.Element => {
  console.log('TABLE', props);
  return <table>
    <TableProvider {...props}>
      <THead />
      <TBody />
    </TableProvider>
  </table>

}