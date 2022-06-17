import React from 'react';

import { InputText } from './input.text';
import { InputProps } from './input.type';

export const InputRender: React.FC<InputProps> = ({ ...props }) => {
  switch (props.type) {
    case 'text':
    case 'email':
    case 'password':
      return <InputText {...props} />
    default:
      return null;
  }
}