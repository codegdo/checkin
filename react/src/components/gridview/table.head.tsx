import React, { Children, isValidElement, useContext } from 'react';
import { GridViewContext } from './gridview.component';

export const THead: React.FC = ({ children }): JSX.Element | null => {
  const context = useContext(GridViewContext);

  if (!context) {
    throw new Error('Required CONTEXT');
  }

  const { columns = [] } = context;

  return <thead>
    {
      children ? <tr>
        {
          Children.map(children, (child): JSX.Element | null => {
            if (!(isValidElement(child) && typeof child.type !== 'string' && child.type.name == 'Data')) {
              return null;
            }
            return <th>{child.props.label}</th>;
          })
        }
      </tr> : <tr>
        {
          columns && columns.map((column: any, i: any) => {
            return <th key={i}>{column.label}</th>
          })
        }
      </tr>
    }
  </thead>

}