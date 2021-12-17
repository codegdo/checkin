import React from 'react';
import { InputRadio } from './input.radio';
import { InputText } from "./input.text";

export const InputRender: React.FC<any> = ({ type }): JSX.Element | null => {
  switch (type) {
    case 'checkbox': return <InputText />;
    case 'radio': return <InputRadio />;
    case 'select': return <InputText />;
    case 'textarea': return <InputText />;
    default: return <InputText />
  }
}