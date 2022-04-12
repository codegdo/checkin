import React, { useContext } from 'react';

import { GridViewContext } from './gridview.component';
import { StaticHead } from './static.head';
import { StaticRow } from './static.row';

export const StaticRender: React.FC = ({ children }): JSX.Element | null => {
  const context = useContext(GridViewContext);

  if (!context) {
    throw new Error('Required CONTEXT');
  }

  const { data } = context;

  if (!data) {
    return null;
  }

  return <table>
    <thead>
      <StaticHead>{children}</StaticHead>
    </thead>
    <tbody>
      {
        data.map((item: any, i: any) => {
          return <StaticRow data={item} key={i}>{children}</StaticRow>
        })
      }
    </tbody>
  </table>

}