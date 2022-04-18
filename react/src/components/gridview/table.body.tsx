import React, { Children, isValidElement, useContext } from 'react';
import { GridViewContext } from './gridview.component';
import { TB } from './table.tb';
import { TD } from './table.td';

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
              if (isValidElement(child) && typeof child.type !== 'string') {
                if (child.type.name == 'Data') {
                  return <TD data={item} {...child.props} />;
                } else if (child.type.name == 'DataBound') {
                  return <TB data={item}>{child.props.children}</TB>;
                } else {
                  return null;
                }
              }
              return null;
            }) : columns && columns.map((col: any, j: any) => {
              return <td key={j}>{String(item[col.name])}</td>;
            })
          }
        </tr>
      })
    }

  </tbody>

}