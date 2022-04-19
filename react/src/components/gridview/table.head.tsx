import React, { Children, isValidElement, useContext } from 'react';
import { GridViewContext } from './gridview.component';
import { DataProps } from './gridview.type';

export const THead: React.FC<any> = ({ children }): JSX.Element | null => {
  const context = useContext(GridViewContext);

  if (!context) {
    throw new Error('Required CONTEXT');
  }

  const { columns, boundColumns } = context;

  return <thead>
    <tr>
      {
        children ? Children.map(children, (child): JSX.Element | null => {
          if (isValidElement(child) && typeof child.type !== 'string') {
            const { name, label } = child.props as DataProps;

            if (child.type.name == 'DataColumn') {
              return <th>{label || name}</th>;
            } else if (child.type.name == 'DataBound') {
              return <th>{label || name}</th>;
            } else {
              return null;
            }
          }
          return null;
        }) : columns && <>
          {
            columns.map((column: any, i: any) => {
              const { name, label } = column;
              return <th key={i}>{label || name}</th>;
            })
          }
          {
            boundColumns && <th>th</th>
          }
        </>
      }
    </tr>
  </thead>

}