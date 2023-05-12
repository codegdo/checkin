import React, { PropsWithChildren } from 'react';
import { TableProps } from './table.type';

//export const TableContext = React.createContext<TableProps<{}> | null>(null);

export function TableProvider<T,>({ children, ...props }: TableProps<T>) {
  return <></>
  // return <TableContext.Provider value={{ ...props }}>
  //   {children}
  // </TableContext.Provider>
}