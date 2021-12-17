import React, { useContext } from 'react';
import { InputContext } from './input.component';

export const InputRadio: React.FC = (): JSX.Element => {
  const context = useContext(InputContext);

  if (!context) {
    throw new Error('Require INPUTTEXT Nested In INPUTCONTEXT');
  }

  const { data, value, handleChange } = context;
  const { type = 'radio' } = data;

  return (
    <span>
      <input type={type} value={value} onChange={handleChange} />
    </span>
  )
}