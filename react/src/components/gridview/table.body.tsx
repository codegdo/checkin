import React, { Children, useContext } from 'react';
import { GridViewContext } from './gridview.component';
import { TRow } from './table.tr';

export const TBody: React.FC<any> = ({ children }): JSX.Element | null => {
  const context = useContext(GridViewContext);

  if (!context) {
    throw new Error('Required CONTEXT');
  }

  const { data, columns, boundColumns } = context;

  if (!data || data.length == 0) {
    const colspans = (children ? Children.count(children) : columns?.length + boundColumns?.length) || 100;

    return <tbody>
      <tr>
        <td colSpan={colspans}>no data</td>
      </tr>
    </tbody>;
  }

  return <tbody>
    {
      data.map((item: any, i: any) => {
        return <TRow dataRow={item} key={i}>{children}</TRow>
      })
    }
  </tbody>

}