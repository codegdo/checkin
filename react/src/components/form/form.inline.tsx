import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { Button, Label, Title } from '../element';
import { FormContext } from './form.component';
import { InlineProps } from './form.type';

export const FormInline: React.FC<InlineProps> = ({ inline, ...props }): JSX.Element | null => {
  const context = useContext(FormContext);

  if (context == undefined) {
    throw new Error('Require ELEMENT Nested In FORMCONTEXT');
  }

  const { status, handleClick } = context;

  const element = inline || props;
  const { title, description, name, type, value } = element;

  //console.log('INLINE', data);

  switch (type) {
    case 'button':
      return <Button
        type={type}
        name={name}
        title={title}
        status={status}
        onClick={handleClick}
      />;
    case 'link':
      return <Link to={value || '../not-found'}>{title}</Link>;
    case 'label':
      return <Label title={title} />;
    case 'title':
      return <Title
        title={title}
        description={description}
      />;
    default: return null;
  }
}