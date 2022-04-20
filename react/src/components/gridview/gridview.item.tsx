import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { stringifyParam } from '../../utils/stringify-param.util';
import { stringifyQuery } from '../../utils/stringify-query.util';

import { RowContext } from './table.tr';

export const GridViewItem: React.FC<any> = ({ type, param, query, name, label }): JSX.Element => {

  const rowContext = useContext(RowContext);

  if (!rowContext) {
    throw new Error('Required CONTEXT');
  }

  const { dataRow } = rowContext;

  const p = stringifyParam(param, dataRow);
  const q = stringifyQuery(query, dataRow);

  switch (type) {
    case 'link':
      return <Link to={`${p}${q}`}>{label || name}</Link>;
    default:
      return <>{label || name}</>;
  }
}