import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { stringifyParam } from '../../utils/stringify-param.util';
import { stringifyQuery } from '../../utils/stringify-query.util';
import { GridViewContext } from './gridview.component';

import { RowContext } from './table.tr';

export const GridViewItem: React.FC<any> = (props): JSX.Element => {

  const context = useContext(GridViewContext);
  const rowContext = useContext(RowContext);

  if (!context) {
    throw new Error('Required CONTEXT');
  }

  if (!rowContext) {
    throw new Error('Required ROW CONTEXT');
  }

  const { customColumns = {} } = context;
  const { dataRow, onRowClick } = rowContext;

  const custom = { ...props, ...customColumns[props.name] };

  const { type, name, label, data } = custom;

  const value = String(dataRow[props.name] || label || name);

  const handleClick = () => {
    onRowClick && onRowClick({
      id: dataRow.id,
      name,
      key: props.name,
      value
    });
  }

  switch (type) {
    case 'link':
      const { path, param, query } = data;
      const p = stringifyParam(param, dataRow);
      const q = stringifyQuery(query, dataRow);

      return <Link to={`${path || ''}${p}${q}`}>{value}</Link>;
    case 'checkbox':
      return <input type="checkbox" onClick={handleClick} />
    default:
      return <>{value}</>;
  }
}