import React, { Children, isValidElement, PropsWithChildren, useContext, useEffect, useState } from 'react';

import { GridViewContext } from './gridview.component';
import { DataColumnProps } from './gridview.type';
import { TD } from './table.td';

type TRProps<T> = {
  dataRow: T
}

type TRContextProps<T> = TRProps<T> & { customColumns: any, onRowClick: any }

export const TRContext = (<T extends Record<string, any>>() => React.createContext<TRContextProps<T> | undefined>(undefined))();

export const TR = <T extends Object>(props: PropsWithChildren<TRProps<T>>): JSX.Element => {
  const context = useContext(GridViewContext);

  if (!context) {
    throw new Error('Required CONTEXT');
  }

  const { columns, config = {}, onCallback } = context;
  const { columns: configColumns, customs: customColumns } = config;

  const { dataRow, children } = props;

  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    console.log(toggle);
  }, [toggle]);

  const onRowClick = (data: any) => {

    setToggle(!toggle);

    if (onCallback) {
      toggle ? onCallback() : onCallback();
    }

  }

  return <tr className={toggle ? 'active' : ''}>
    <TRContext.Provider value={{ dataRow, customColumns, onRowClick }}>
      {
        children ? Children.map(children, (child): JSX.Element | null => {
          if (isValidElement(child) && typeof child.type !== 'string') {

            const { children } = child.props as PropsWithChildren<DataColumnProps>;

            if (child.type.name == 'DataColumn') {
              return children ? <TD {...child.props}>{children}</TD> : <TD {...child.props} />;
            } else {
              return null;
            }
          }
          return null;
        }) : columns && <>
          {
            columns.map((column, i: any) => {
              return <TD {...column} key={i} />;
            })
          }
          {
            configColumns && configColumns.map((column: any, i: any) => {
              return <TD {...column} key={i}>CHILDREN</TD>;
            })
          }
        </>
      }
    </TRContext.Provider>
  </tr>
}