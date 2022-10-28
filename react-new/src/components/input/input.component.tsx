import React from 'react';
import { InputCheckbox } from './input.checkbox';
import { InputRange } from './input.range';
import { InputText } from './input.text';
import { InputProps } from './input.type';

export const Input: React.FC<InputProps> = ({ onChange, ...props }): JSX.Element | null => {

  switch (props.type) {
    case 'text':
    case 'password': return <InputText {...props} onChange={onChange} />;
    case 'range': return <InputRange type='' name='' />;
    case 'checkbox': return <InputCheckbox type='' name='' onChange={onChange} />;

    default: return null;
  }
}