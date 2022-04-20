import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { stringifyParam } from '../../utils/stringify-param.util';
import { stringifyQuery } from '../../utils/stringify-query.util';
import { GridViewContext } from './gridview.component';
import { RowContext } from './table.tr';

export const GridViewKey: React.FC<any> = ({ name }): JSX.Element | null => {

  const context = useContext(GridViewContext);
  const rowContext = useContext(RowContext);

  if (!context) {
    throw new Error('Required GRIDVIEW CONTEXT');
  }

  if (!rowContext) {
    throw new Error('Required ROW CONTEXT');
  }

  const { keyColumn } = context;
  const { dataRow } = rowContext;

  const text = String(dataRow[name]);

  const { type, param = '', query = '', isShowing = true } = keyColumn;

  const p = stringifyParam(param, dataRow);
  const q = stringifyQuery(query, dataRow);

  if (!isShowing) {
    return null;
  }

  switch (type) {
    case 'link':
      return <Link to={`${p}${q}`}>{text}</Link>;
    default:
      return <>{text}</>;
  }
}