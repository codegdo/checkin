import React, { useContext } from 'react';
import { FieldContext } from './form.field';



export const Input: React.FC = (): JSX.Element => {
  const context = useContext(FieldContext);

  if (!context) {
    throw new Error();
  }

  const { value, handleChange } = context;

  return (
    <div>
      <input value={value} onChange={handleChange} />
    </div>
  )
}