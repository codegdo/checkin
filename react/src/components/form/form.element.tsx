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

  const { data: form, status, handleSubmit } = context;

  const data = element || props;
  const { label, name, type, value } = data;

  console.log('ELEMENT', data);

  switch (type) {
    case 'button': return <Button type={type} name={name} label={label} status={status} onClick={handleSubmit} />;
    case 'link': return <Link to={value || '../not-found'}>{label}</Link>;
    case 'label': return <Label label={label} />;
    case 'title': return name === form?.name ? <Title name={form?.label} /> : <Title name={name} />;
    default: return null;
  }
}