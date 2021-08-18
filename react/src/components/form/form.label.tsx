import React, { useContext } from 'react';

import { FieldContext } from './form.field';


export const Label: React.FC = ({ children }): JSX.Element => {
  const context = useContext(FieldContext);

  if (context == undefined) {
    throw new Error();
  }

  const { data } = context;

  return (
    <span>
      {
        children || data?.label
      }
    </span>
  )
}
