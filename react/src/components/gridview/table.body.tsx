import React, { Children, isValidElement, useContext } from 'react';
import { GridViewContext } from './gridview.component';
import { DataProps } from './gridview.type';
import { TB } from './table.tb';
import { TD } from './table.td';

export const TBody: React.FC<any> = ({ children }): JSX.Element | null => {
  const context = useContext(GridViewContext);

  if (!context) {
    throw new Error('Required CONTEXT');
  }

  const { data, columns, boundColumns } = context;

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

                const { children } = child.props as DataProps;

                if (child.type.name == 'DataColumn') {
                  return <TD dataRow={item} {...child.props} />;
                } else if (child.type.name == 'DataBound') {
                  return <TB dataRow={item}>{children}</TB>;
                } else {
                  return null;
                }
              }
              return null;
            }) : columns && <>
              {
                columns.map((column: any, j: any) => {
                  return <TD dataRow={item} {...column} key={j} />;
                })
              }
              {
                boundColumns && <td>edit</td>
              }
            </>
          }
        </tr>
      })
    }

  </tbody>

}