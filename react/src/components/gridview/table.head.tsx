import React, { Children, isValidElement, ReactNode, useContext } from 'react';
import { GridViewContext } from './gridview.component';
import { DataColumnProps } from './gridview.type';

export const THead: React.FC<{ children: ReactNode | undefined }> = ({ children }): JSX.Element | null => {
  const context = useContext(GridViewContext);

  if (!context) {
    throw new Error('Required CONTEXT');
  }

  const { columns, config = {} } = context;
  const { columns: configColumns } = config;

  return <thead>
    <tr>
      {
        children ? Children.map(children, (child): JSX.Element | null => {
          if (isValidElement(child) && typeof child.type !== 'string') {
            const { name, label } = child.props as DataColumnProps;
            const typeName = child.type.name;

            if (typeName == 'DataColumn') {
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
            configColumns && configColumns.map((column: any, i: any) => {
              const { name, label } = column;
              return <th key={i}>{label || name}</th>;
            })
          }
        </>
      }
    </tr>
  </thead>

}