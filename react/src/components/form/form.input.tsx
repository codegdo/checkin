import React, { useContext } from 'react';
import { TextBox } from '../input';
import { FieldContext } from './form.field';

export const Input: React.FC = (): JSX.Element => {
  const context = useContext(FieldContext);

  if (!context) {
    throw new Error();
  }

  const { type } = context;

  const render = () => {
    switch (type) {
      case 'text':
        return <TextBox />;
      default:
        return <TextBox />
    }
  }

  return (
    <div>
      {render()}
    </div>
  )
}