import React, { useContext } from 'react';
import { InputContext } from './input.component';

export const InputText: React.FC = (): JSX.Element => {
  const context = useContext(InputContext);

  if (!context) {
    throw new Error('Require INPUT nested in INPUTCONTEXT');
  }

  const { input, value, handleChange } = context;
  const { type = 'text' } = input;

  return (
    <span>
      <input type={type} value={value} onChange={handleChange} />
    </span>
  )
}