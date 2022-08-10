import React, { useContext } from 'react';
import { Table } from '../table/table.component';
import { GridViewContext } from './gridview.context';
import { MainProps } from './gridview.type';

export const Main: React.FC<MainProps> = (props): JSX.Element => {

  const ctx = useContext(GridViewContext);

  if (!ctx) {
    throw new Error();
  }

  const { data, columns = [] } = ctx;

  return <Table data={data} columns={[...props.columns || [], ...columns]} />
}