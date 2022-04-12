import React from 'react';

export const DynamicHead: React.FC<any> = ({ columns }): JSX.Element | null => {

  if (!columns) {
    return null;
  }

  return <tr>
    {
      columns && columns.map((column: any, i: any) => {
        return <th key={i}>{column.label}</th>
      })
    }
  </tr>
}