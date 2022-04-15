import React from 'react';
import { Link } from 'react-router-dom';

import { stringifyParam } from '../../utils/stringify-param.util';
import { stringifyQuery } from '../../utils/stringify-query.util';

export const BoundLink: React.FC<any> = ({ data, label, param, query }): JSX.Element => {

  const p = stringifyParam(param, data);
  const q = stringifyQuery(query, data);

  return <Link to={`${p}${q}`}>{label}</Link>
}