import React, { Children, isValidElement, useContext, useEffect, useState } from 'react';

import { GridViewContext } from './gridview.component';
import { DataProps } from './gridview.type';
import { TD } from './table.td';

export const RowContext = React.createContext<any>(undefined);

export const TRow: React.FC<any> = ({ dataRow, children }): JSX.Element => {
  const context = useContext(GridViewContext);

  if (!context) {
    throw new Error('Required CONTEXT');
  }

  const { columns, boundColumns, onCallback } = context;

  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    console.log(toggle);
  }, [toggle]);

  const onRowClick = (value: any) => {

    if (toggle) {
      setToggle(false);
    } else {
      setToggle(true);
    }

    console.log(value);

    //setToggle(!toggle);

    //console.log(toggle);
    onCallback && onCallback();
  }



  return <tr className={toggle ? 'active' : ''}>
    <RowContext.Provider value={{ dataRow, onRowClick }}>
      {
        children ? Children.map(children, (child): JSX.Element | null => {
          if (isValidElement(child) && typeof child.type !== 'string') {

            const { children } = child.props as DataProps;

            if (child.type.name == 'DataColumn') {
              return <TD {...child.props} />;
            } else if (child.type.name == 'DataBound') {
              return <TD dataRow={dataRow}>{children}</TD>;
            } else {
              return null;
            }
          }
          return null;
        }) : columns && <>
          {
            columns.map((column: any, i: any) => {
              return <TD {...column} key={i} />;
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