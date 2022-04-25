import React, { ReactNode } from 'react';
import { Control } from './gridview.control';
import { Paging } from './gridview.paging';
import { Table } from './gridview.table';

export const Render: React.FC<{ children: ReactNode | undefined }> = ({ children }): JSX.Element => {
  return <>
    <Control>{children}</Control>
    <Table>{children}</Table>
    <Paging></Paging>
  </>
}