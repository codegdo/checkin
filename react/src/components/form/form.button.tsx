import React, { useContext } from 'react';
import { FormContext } from './form.component';

type ButtonProps = {
  label?: string;
  name?: string;
  type?: "button" | "submit" | "reset" | undefined;
}

export const Button: React.FC<ButtonProps> = ({ label = 'Button', name = '', type = 'button', children }): JSX.Element => {
  const context = useContext(FormContext);

  if (context == undefined) {
    throw new Error();
  }

  const { handleSubmit } = context;

  return (
    <button name={name} type={type} onClick={() => handleSubmit(name)}>
      {
        children || label
      }
    </button>
  )
}