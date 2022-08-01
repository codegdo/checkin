import React, { PropsWithChildren } from 'react';
import { TableProps } from './table.component';

type TableProviderProps = TableProps;

const initialProps: TableProps = {
  data: null,
  columns: null,
  onCallback: () => console.log('onCallback')
}

export const TableContext = React.createContext<TableProps>(initialProps);

export const TableProvider: React.FC<PropsWithChildren<TableProviderProps>> = ({ children, ...props }) => {
  return <TableContext.Provider value={{ ...props }}>
    {children}
  </TableContext.Provider>
}