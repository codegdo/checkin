import React, { useContext } from 'react';
import { TableContext } from './table.context';

export const THead: React.FC = (): JSX.Element => {
  const { columns = [] } = useContext(TableContext);

  return <thead>
    <tr>
      {
        columns.map((col, i) => {
          return <th key={i}>
            {col.label || col.name}
          </th>
        })
      }
    </tr>
  </thead>
}