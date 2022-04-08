import React from 'react';

export const DynamicHead: React.FC<any> = ({ columns }): JSX.Element => {
  return <tr>
    {
      columns && columns.map((column: any, i: any) => {
        return <th key={i}>{column.label}</th>
      })
    }
  </tr>
}