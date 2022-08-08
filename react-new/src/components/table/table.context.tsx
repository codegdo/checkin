import React, { PropsWithChildren } from 'react';
import { TableProps } from './table.type';

type Data = {
  name?: string;
  label?: string;
};

type Column = {
  name?: string;
  label?: string;
};

const initialProps = {
  data: [],
  columns: [],
  status: '',
  onClick: () => { }
};

export const TableContext = React.createContext<TableProps<Data, Column>>(initialProps);

export const TableProvider = <Data, Column>({ children, ...props }: PropsWithChildren<TableProps<Data, Column>>): JSX.Element => {
  return <TableContext.Provider value={{ ...props }}>
    {children}
  </TableContext.Provider>
}