import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { Button, Label, Title } from '../element';
import { FormContext } from './form.component';
import { ElementProps } from './form.type';

export const FormElement: React.FC<ElementProps> = ({ element, ...props }): JSX.Element | null => {
  const context = useContext(FormContext);

  if (context == undefined) {
    throw new Error('Require ELEMENT Nested In FORMCONTEXT');
  }

  const { data: form, loading, handleSubmit } = context;

  const data = element || props;
  const { label, name, type, value } = data;

  //console.log('ELEMENT', data);

  switch (type) {
    case 'button':
      return <Button
        type={type}
        name={name}
        label={label}
        loading={loading}
        onClick={handleSubmit} />;
    case 'link':
      return <Link to={value || '../not-found'}>{label}</Link>;
    case 'label':
      return <Label label={label} />;
    case 'title':
      return <Title name={(name === form?.name) ? form?.label : name} />;
    default: return null;
  }
}