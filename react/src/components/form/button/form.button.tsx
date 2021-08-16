import React from 'react';
import { useContext } from 'react';
import { FormContext } from '../form.component';


export const FormButton: React.FC = ({ children }): JSX.Element => {
  const context = useContext(FormContext);

  if (context == undefined) {
    throw new Error();
  }

  const { onClick } = context;

  return <button type="button" onClick={onClick}>
    {
      children
    }
  </button>
}