import React, { useContext } from 'react';
import { TableContext } from './table.component';
import { TR } from './table.tr';
import { TableProps, TBodyProps } from './table.type';

export function TBody<T extends Object>(_props: TBodyProps<T>) {

  const ctx = useContext((TableContext as Object) as React.Context<TableProps<T>>);

  if (!ctx) {
    throw new Error();
  }

  const { data = [] } = ctx;

  return <tbody>
    {
      data.map((item, i) => {
        return <TR data={item} key={i} />
      })
    }
  </tbody>
}