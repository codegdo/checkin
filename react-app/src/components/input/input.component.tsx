import React from 'react';
import { InputCheckbox } from './input.checkbox';
import { InputRange } from './input.range';
import { InputText } from './input.text';
import { InputProps } from './input.type';

export function Input({ ...props }: InputProps) {

  switch (props.type) {
    case 'text':
    case 'password': return <InputText {...props} />;
    case 'range': return <InputRange {...props} />;
    case 'checkbox': return <InputCheckbox {...props} />;

    default: return null;
  }
}