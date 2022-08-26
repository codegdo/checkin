import React from 'react';
import { InputText } from './input.text';
import { InputProps } from './input.type';

export const Input: React.FC<InputProps> = ({ onChange, ...props }): JSX.Element | null => {

  switch (props.type) {
    case 'text':
    case 'password': return <InputText {...props} onChange={onChange} />;

    default: return null;
  }
}