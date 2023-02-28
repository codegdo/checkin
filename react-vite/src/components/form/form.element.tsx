import React, { PropsWithChildren } from 'react';

import { useWrapperContext } from '../../hooks';
import { Button } from '../element/element.button';
import { FormContext } from './form.context';

export interface ElementProps extends PropsWithChildren {
  type?: string;
  name?: string;
  label?: string;
  value?: string;
  className?: string;
}

const FormElement: React.FC<ElementProps> = ({ type, name, label, value, className, children }): JSX.Element => {

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

export default FormElement;