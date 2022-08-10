import React, { PropsWithChildren } from 'react';
import { TableProps } from './table.type';

export const TableContext = React.createContext<TableProps<{ [key: string]: any }> | undefined>(undefined);

export const TableProvider = <T extends Object>({ children, ...props }: PropsWithChildren<TableProps<T>>): JSX.Element => {
  return <TableContext.Provider value={{ ...props }}>
    {children}
  </TableContext.Provider>
}