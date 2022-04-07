import React, { useContext } from 'react';

import { GridviewContext } from './gridview.component';
import { RenderHead } from './render.head';
import { RenderRow } from './render.row';

export const Render: React.FC = ({ children }): JSX.Element => {
  const context = useContext(GridviewContext);

  if (!context) {
    throw new Error('Require RENDER nested in GRIDVIEW');
  }

  const { data } = context;

  return <table>
    <thead>
      <RenderHead>{children}</RenderHead>
    </thead>
    <tbody>
      {
        data && data.map((item: any, i: any) => {
          return <RenderRow data={item} key={i}>{children}</RenderRow>
        })
      }
    </tbody>
  </table>
}