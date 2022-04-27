import React, { Children, isValidElement, useContext } from 'react';

import { ControlContext } from './gridview.control';
import { DataColumn } from './gridview.data-column';
import { DataColumnProps } from './gridview.type';

export const Search: React.FC<any> = ({ children }): JSX.Element | null => {
  const context = useContext(ControlContext);

  if (!context) {
    throw new Error('Required CONTEXT');
  }

  const { data } = context;

  return <div className="search">
    <input type="search" />
    <button type="button">Search</button>
  </div>

}