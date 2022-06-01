import React from 'react';
import { InputText } from './input.text';

type Props = {
  type: string;
  value?: string;
  placeholder?: string;
  className?: string;
}

export const InputRender: React.FC<Props> = ({ type, ...props }) => {
  switch (type) {
    case 'text':
    case 'email':
    case 'password':
      return <InputText {...props} />
    default:
      return null;
  }
}