import React, { PropsWithChildren } from 'react';

import { useWrapperContext } from '../../hooks';
import { Button } from '../element/element.button';
import { FormContext } from './form.component';

export interface ElementProps extends PropsWithChildren {
  type?: string;
  name?: string;
  label?: string;
  value?: string;
  className?: string;
}

export function FormElement({ type, name, label, value, className, children }: ElementProps) {

  const { status, onClick } = useWrapperContext(FormContext);

  switch (type) {
    case 'button':
      return <Button
        name={name}
        className={className}
        text={label || value}
        disabled={status === 'loading' ? true : false}
        onClick={onClick}>{children}</Button>
    default:
      return <span>Element not found</span>
  }
}
