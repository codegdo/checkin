import React, { useContext } from 'react';
import { TableContext } from './table.context';

export const TR: React.FC<any> = ({ data }): JSX.Element => {
  const ctx = useContext(TableContext);

  if (!ctx) {
    throw new Error();
  }

  const { columns = [] } = ctx;

  return <tr>
    {
      columns.map((col, i) => {
        const { name } = col;

        return <td key={i}>{data[name]}</td>
      })
    }
  </tr>
}