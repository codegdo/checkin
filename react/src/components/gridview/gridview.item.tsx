import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { stringifyParam } from '../../utils/stringify-param.util';
import { stringifyQuery } from '../../utils/stringify-query.util';
import { DataColumnProps } from './gridview.type';

import { TRContext } from './table.tr';

export const GridViewItem: React.FC<DataColumnProps> = (props): JSX.Element => {

  const rowContext = useContext(TRContext);

  if (!rowContext) {
    throw new Error('Required ROW CONTEXT');
  }

  const { dataRow, customColumns = {}, onRowClick } = rowContext;
  const { name: key = '' } = props;
  const { type, name, label, data }: DataColumnProps = { ...props, ...customColumns[key] };
  const { [key]: val, id } = dataRow;
  const value = String(val || label || name);

  const handleClick = () => {
    onRowClick && onRowClick({
      id,
      name,
      key,
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