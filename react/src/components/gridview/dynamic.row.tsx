import React from 'react';

export const DynamicRow: React.FC<any> = ({ data, columns }): JSX.Element | null => {

  if (!columns) {
    return null;
  }

  return <tr>
    {
      columns.map((item: any, i: any) => {
        return <td key={i}>{String(data[item.name])}</td>
      })
    }
  </tr>
}
