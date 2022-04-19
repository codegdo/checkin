import React from 'react';
import { Link } from 'react-router-dom';

import { stringifyParam } from '../../utils/stringify-param.util';
import { stringifyQuery } from '../../utils/stringify-query.util';

export const DataBoundItem: React.FC<any> = ({ dataRow, label, param, query }): JSX.Element => {

  const p = stringifyParam(param, dataRow);
  const q = stringifyQuery(query, dataRow);

  return <Link to={`${p}${q}`}>{label}</Link>
}