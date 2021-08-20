import React, { useContext } from 'react';
import { Button } from '../element';
import { FormContext } from './form.component';
import { ElementProps } from './form.type';

export const FormElement: React.FC<ElementProps> = ({ element, ...props }): JSX.Element | null => {
  const context = useContext(FormContext);

  if (context == undefined) {
    throw new Error('Require ELEMENT Nested In FORMCONTEXT');
  }

  const { handleSubmit } = context;

  const data = element || props;
  const { name, label, type } = data;

  switch (type) {
    case 'button': return <Button type={type} name={name} label={label} onClick={handleSubmit} />;
    default: return null;
  }
}