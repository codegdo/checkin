import React, { useContext } from 'react';
import { TableContext } from './table.component';

export function THead() {

  const ctx = useContext(TableContext);

  if (!ctx) {
    throw new Error();
  }

  const { columns = [] } = ctx;

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