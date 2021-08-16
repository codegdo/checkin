import React, { useContext } from 'react';
import { FieldContext } from './form.field';

export const Button: React.FC = ({ children }): JSX.Element => {
  const context = useContext(FieldContext);

  if (context == undefined) {
    throw new Error();
  }

  const { handleClick } = context;

  return (
    <button onClick={handleClick} type="button">
      {
        children
      }
    </button>
  )
}