import React from 'react';
import { TBody } from './table.body';
import { TableProvider } from './table.context';
import { THead } from './table.head';
import { TableProps } from './table.type';

export const Table = <D extends Object, C extends Object>(props: TableProps<D, C>): JSX.Element => {
  console.log('TABLE', props);
  return <table>
    <TableProvider {...props}>
      <THead />
      <TBody />
    </TableProvider>
  </table>

}