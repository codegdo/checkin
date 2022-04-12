import React, { useContext } from 'react';
import { ControlContext } from './gridview.control';

export const Field: React.FC<any> = ({ input, ...props }): JSX.Element => {

  const context = useContext(ControlContext);

  if (!context) {
    throw new Error('Required CONTEXT');
  }

  const { values, handleChange } = context;

  const data = input || props;
  const { name, type = 'text' } = data;

  return <><input type={type} name={name} value={values[name] || ''} onChange={handleChange} /></>
}