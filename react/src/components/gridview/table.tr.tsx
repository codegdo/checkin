import React, { Children, isValidElement, useContext } from 'react';

import { GridViewContext } from './gridview.component';
import { DataProps } from './gridview.type';
import { TDataBound } from './table.tdb';
import { TData } from './table.td';

export const RowContext = React.createContext<any>(undefined);

export const TRow: React.FC<any> = ({ dataRow, children }): JSX.Element => {
  const context = useContext(GridViewContext);

  if (!context) {
    throw new Error('Required CONTEXT');
  }

  const { columns, boundColumns } = context;

  return <tr>
    <RowContext.Provider value={{ dataRow }}>
      {
        children ? Children.map(children, (child): JSX.Element | null => {
          if (isValidElement(child) && typeof child.type !== 'string') {

            const { children } = child.props as DataProps;

            if (child.type.name == 'DataColumn') {
              return <TData {...child.props} />;
            } else if (child.type.name == 'DataBound') {
              return <TDataBound dataRow={dataRow}>{children}</TDataBound>;
            } else {
              return null;
            }
          }
          return null;
        }) : columns && <>
          {
            columns.map((column: any, i: any) => {
              return <TData {...column} key={i} />;
            })
          }
          {
            boundColumns && <td>edit</td>
          }
        </>
      }
    </RowContext.Provider>
  </tr>
}