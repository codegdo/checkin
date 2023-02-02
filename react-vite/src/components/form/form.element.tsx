import React, { PropsWithChildren } from 'react';

import { useWrapperContext } from '../../hooks';
import { FormContext } from './form.context';

interface ElementProps {
  id?: string | number;
  className?: string;
  type: string;
  name: string;
  label?: string;
  data?: string;
  value?: string;
}

export const Element: React.FC<PropsWithChildren<ElementProps>> = ({ type, name, label, value, className, children }): JSX.Element => {

  const { onClick } = useWrapperContext(FormContext);

  const handleClick = () => {
    onClick && onClick(name);
  }

  switch (type) {
    case 'button':
      return <button type="button" name={name} onClick={handleClick}>
        {children ? children : label || value}
      </button>
    default:
      return <span>Element not found</span>
  }
}