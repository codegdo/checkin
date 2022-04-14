import React, { useContext } from 'react';
import { GridViewContext } from './gridview.component';
import { Control } from './gridview.control';
import { Paging } from './gridview.paging';
import { Table } from './gridview.table';

export const Render: React.FC = ({ children }): JSX.Element | null => {
  const context = useContext(GridViewContext);

  if (!context) {
    throw new Error('Required CONTEXT');
  }

  return <>
    <Control>{children}</Control>
    <Table>{children}</Table>
    <Paging></Paging>
  </>
}