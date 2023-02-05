import React, { PropsWithChildren } from 'react';
import { TableProps } from './table.type';

//export const TableContext = React.createContext<TableProps<{}> | null>(null);

export const TableProvider = <T,>({ children, ...props }: PropsWithChildren<TableProps<T>>): JSX.Element => {
  return <></>
  // return <TableContext.Provider value={{ ...props }}>
  //   {children}
  // </TableContext.Provider>
}