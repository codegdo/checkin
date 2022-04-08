import React, { useContext } from 'react';
import { DynamicHead } from './dynamic.head';
import { DynamicRow } from './dynmaic.row';
import { GridviewContext } from './gridview.component';

export const GridviewDynamic: React.FC = (): JSX.Element => {
  const context = useContext(GridviewContext);

  if (!context) {
    throw new Error('Require RENDER nested in GRIDVIEW');
  }

  const { data, columns } = context;

  return <table>
    <thead>
      <DynamicHead columns={columns} />
    </thead>
    <tbody>
      {
        data && data.map((item: any, i: any) => {
          return <DynamicRow data={item} columns={columns} key={i} />
        })
      }
    </tbody>
  </table>
}