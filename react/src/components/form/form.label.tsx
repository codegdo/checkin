import React, { useContext } from 'react';

import { FieldContext } from './form.field';


export const Label: React.FC = ({ children }): JSX.Element => {
  const context = useContext(FieldContext);

  if (context == undefined) {
    throw new Error();
  }

  const { label } = context;

  return (
    <span>
      {
        children || label
      }
    </span>
  )
}
