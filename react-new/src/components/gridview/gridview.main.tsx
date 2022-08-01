import React, { useContext } from 'react';
import { Table } from '../table/table.component';
import { GridViewContext } from './gridview.context';

interface MainProps {
  columns?: any;
}

export const Main: React.FC<MainProps> = ({ columns }): JSX.Element => {

  const { data, columns: cols = [] } = useContext(GridViewContext);

  return <Table data={data} columns={[...columns, ...cols]} />
}