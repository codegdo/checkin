import React from 'react';
import { TextBox } from "./input.text";

export const InputRender: React.FC<any> = ({ type }): JSX.Element | null => {
  switch (type) {
    case 'checkbox': return <TextBox />;
    case 'radio': return <TextBox />;
    case 'select': return <TextBox />;
    case 'textarea': return <TextBox />;
    default: return <TextBox />
  }
}