import React, { useContext } from 'react';
import { FormContext } from './form.component';

type ButtonProps = {
  name?: string;
  text?: string;
}

export const Button: React.FC<ButtonProps> = ({ name = '', text = 'Button', children }): JSX.Element => {
  const context = useContext(FormContext);

  if (context == undefined) {
    throw new Error();
  }

  const { handleSubmit } = context;

  return (
    <button name={name} type="button" onClick={() => handleSubmit(name)}>
      {
        children || text
      }
    </button>
  )
}