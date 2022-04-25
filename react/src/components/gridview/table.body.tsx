import React, { Children, ReactNode, useContext } from 'react';
import { GridViewContext } from './gridview.component';
import { TR } from './table.tr';

export const TBody: React.FC<{ children: ReactNode | undefined }> = ({ children }): JSX.Element | null => {
  const context = useContext(GridViewContext);

  if (!context) {
    throw new Error('Required CONTEXT');
  }

  const { data, columns, config = {} } = context;
  const { columns: configColumns } = config;

  if (!data || data.length == 0) {
    const colspans = (children ? Children.count(children) : columns?.length + configColumns?.length) || 100;

    return <tbody>
      <tr>
        <td colSpan={colspans}>no data</td>
      </tr>
    </tbody>;
  }

  return <tbody>
    {
      data.map((item, i) => {
        return <TR<Object> dataRow={item} key={i}>{children}</TR>
      })
    }
  </tbody>

}