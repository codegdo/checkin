import React from 'react';
import { InputCheckbox } from './input.checkbox';
import { InputRange } from './input.range';
import { InputText } from './input.text';
import { InputProps } from './input.type';

export const Input: React.FC<InputProps> = ({ ...props }): JSX.Element | null => {

  switch (props.type) {
    case 'text':
    case 'password': return <InputText {...props} />;
    case 'range': return <InputRange {...props} />;
    case 'checkbox': return <InputCheckbox {...props} />;

    default: return null;
  }
}