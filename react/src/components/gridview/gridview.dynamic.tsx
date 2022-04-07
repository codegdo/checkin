import React from 'react';
import { DynamicHead } from './dynamic.head';
import { DynamicRow } from './dynmaic.row';

export const GridviewDynamic: React.FC = (): JSX.Element => {

  return <table>
    <thead>
      <DynamicHead />
    </thead>
    <tbody>
      <DynamicRow />
    </tbody>
  </table>
}