import React, { useContext } from 'react';
import { TableContext } from './table.context';

export const TBody: React.FC = (): JSX.Element => {
  const { data = [], columns = [] } = useContext(TableContext);

  return <tbody>
    {
      data.map((item, i) => {
        return <tr key={i}>
          {
            columns.map((col, j) => {
              const { name } = col;

              return <td key={j}>{item[name]}</td>
            })
          }
        </tr>
      })
    }
  </tbody>
}