import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { stringifyParam } from '../../utils/stringify-param.util';
import { stringifyQuery } from '../../utils/stringify-query.util';
import { GridViewContext } from './gridview.component';

export const KeyColumn: React.FC<any> = ({ dataRow, name }): JSX.Element => {

  const context = useContext(GridViewContext);

  if (!context) {
    throw new Error('Required CONTEXT');
  }

  const { keyColumn } = context;
  const text = String(dataRow[name]);

  if (!keyColumn) {
    return <td>{text}</td>;
  }

  const { type, param, query } = keyColumn;

  const p = stringifyParam(param, dataRow);
  const q = stringifyQuery(query, dataRow);

  switch (type) {
    case 'link':
      return <td><Link to={`${p}${q}`}>{text}</Link></td>;
    default:
      return <td>{text}</td>;
  }
}