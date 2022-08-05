import React, { useState } from 'react';
import { InputText } from './input.text';

interface InputProps {
  id?: string | number;
  type: string;
  name: string;
  value?: string;
  onChange?: (key: string, value: string) => void;
}

export const Input: React.FC<InputProps> = ({ onChange, ...props }): JSX.Element | null => {

  switch (props.type) {
    case 'text': return <InputText {...props} onChange={onChange} />;
    default: return null;
  }
}