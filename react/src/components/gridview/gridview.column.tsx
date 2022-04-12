import React, { useContext } from 'react';
import { RowContext } from './static.row';

export const Column: React.FC<any> = ({ name }): JSX.Element => {
  const context = useContext(RowContext);

  if (!context) {
    throw new Error('Require Column nested in ROWCONTEXT');
  }

  const { data } = context;

  return <td>{data[name]}</td>
}


