import React, { Children, isValidElement, useContext } from 'react';

import { ControlContext } from './gridview.control';
import { DataColumn } from './gridview.data-column';

export const Search: React.FC<any> = ({ children }): JSX.Element | null => {
  const context = useContext(ControlContext);

  if (!context) {
    throw new Error('Required CONTEXT');
  }

  const { data } = context;

  return <div className="search">
    {
      children ? Children.toArray(children).filter(
        child => (isValidElement(child) && typeof child.type !== 'string' && child.type.name == 'DataColumn' && child.props.isSearch && child.props.isPrimary)
      ) as React.ReactElement[] : data && data.map((item: any, i: any) => {
        return item.isSearch && item.isPrimary ? <DataColumn input={item} key={i} /> : null;
      })
    }
  </div>

}