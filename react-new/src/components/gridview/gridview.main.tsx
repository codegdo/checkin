import React, { useContext } from 'react';
import { Table } from '../table/table.component';
import { GridViewContext } from './gridview.component';
import { GridViewContextProps, MainProps } from './gridview.type';

export const Main = <T extends Object>(props: MainProps<T>): JSX.Element => {

  const ctx = useContext((GridViewContext as Object) as React.Context<GridViewContextProps<T>>);

  if (!ctx) {
    throw new Error();
  }

  const { data = [], columns = [] } = ctx;

  return <Table<T> data={data} columns={[...props.columns || [], ...columns]} />
}