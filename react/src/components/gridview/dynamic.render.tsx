import React, { useContext } from 'react';
import { DynamicHead } from './dynamic.head';
import { DynamicRow } from './dynamic.row';
import { GridViewContext } from './gridview.component';

export const DynamicRender: React.FC = (): JSX.Element | null => {
  const context = useContext(GridViewContext);

  if (!context) {
    throw new Error('Required CONTEXT');
  }

  const { data, columns } = context;

  if (!data) {
    return null;
  }

  return <table>
    <thead>
      <DynamicHead columns={columns} />
    </thead>
    <tbody>
      {
        data.map((item: any, i: any) => {
          return <DynamicRow data={item} columns={columns} key={i} />
        })
      }
    </tbody>
  </table>
}