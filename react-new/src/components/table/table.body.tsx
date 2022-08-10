import React, { useContext } from 'react';
import { TableContext } from './table.context';
import { TR } from './table.tr';

export const TBody: React.FC = (): JSX.Element => {

  const ctx = useContext(TableContext);

  if (!ctx) {
    throw new Error();
  }

  const { data = [] } = ctx;

  return <tbody>
    {
      data.map((item, i) => {
        return <TR data={item} key={i} />
      })
    }
  </tbody>
}