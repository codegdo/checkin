import React, { useContext } from 'react';
import { FieldContext } from '../form/form.field';

export const TextBox: React.FC = (): JSX.Element => {
  const context = useContext(FieldContext);

  if (!context) {
    throw new Error();
  }

  const { data, value, handleChange } = context;

  return (
    <span>
      <input type={data?.type} value={value} onChange={handleChange} />
    </span>
  )
}