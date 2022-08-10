import React from 'react';
import { TBody } from './table.body';
import { TableProvider } from './table.context';
import { THead } from './table.head';
import { TableProps } from './table.type';

export const Table = <T extends Object>(props: TableProps<T>): JSX.Element => {
  console.log('TABLE', props);

  return <table>
    <TableProvider {...props}>
      <THead />
      <TBody />
    </TableProvider>
  </table>

}