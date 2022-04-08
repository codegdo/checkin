import React from 'react';

export const DynamicRow: React.FC<any> = ({ data, columns }): JSX.Element => {
  return <tr>
    {
      columns && columns.map((item: any, i: any) => {
        return <td key={i}>{String(data[item.name])}</td>
      })
    }
  </tr>
}
