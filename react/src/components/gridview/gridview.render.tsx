import React from 'react';
import { Control } from './gridview.control';
import { Paging } from './gridview.paging';
import { Table } from './gridview.table';

export const Render: React.FC<any> = ({ children }): JSX.Element | null => {
  return <>
    <Control>{children}</Control>
    <Table>{children}</Table>
    <Paging></Paging>
  </>
}