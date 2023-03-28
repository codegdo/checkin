import React from 'react';
import { TBody } from './table.body';
import { THead } from './table.head';
import { TableProps } from './table.type';

export const TableContext = React.createContext<TableProps<Object> | null>(null);

export function Table<T extends Object>(props: TableProps<T>) {
  console.log('TABLE', props);

  return <table>
    <TableContext.Provider value={{ ...props }}>
      <THead />
      <TBody<T> />
    </TableContext.Provider>
  </table>

}