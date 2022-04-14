import React, { Children, isValidElement, useContext } from 'react';
import { GridViewContext } from './gridview.component';

export const RowContext = React.createContext<any>(undefined);

export const TBody: React.FC = ({ children }): JSX.Element | null => {
  const context = useContext(GridViewContext);

  if (!context) {
    throw new Error('Required CONTEXT');
  }

  const { data, columns } = context;

  if (!data || data.length == 0) {
    return <tbody>
      <tr>
        <td colSpan={(children ? Children.count(children) : columns?.length) || 100}>no data</td>
      </tr>
    </tbody>;
  }

  return <tbody>
    {
      data.map((item: any, i: any) => {
        return <tr key={i}>
          {
            children ? Children.map(children, (child): JSX.Element | null => {
              if (!(isValidElement(child) && typeof child.type !== 'string' && child.type.name == 'Data')) {
                return null;
              }
              return <td>{String(item[child.props.name])}</td>;
            }) : columns && columns.map((col: any, j: any) => {
              return <td key={j}>{String(item[col.name])}</td>;
            })
          }
        </tr>
      })
    }
  </tbody>

}