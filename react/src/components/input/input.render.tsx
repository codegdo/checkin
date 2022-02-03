import React from 'react';
import { InputRadio } from './input.radio';
import { InputSelect } from './input.select';
import { InputText } from "./input.text";

export const InputRender: React.FC<any> = ({ type }): JSX.Element | null => {
  switch (type) {
    case 'checkbox': return <InputText />;
    case 'radio': return <InputRadio />;
    case 'select': return <InputSelect />;
    case 'textarea': return <InputText />;
    default: return <InputText />
  }
}