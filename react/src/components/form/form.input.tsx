import React, { useContext } from 'react';
import { TextBox } from '../input';
import { FieldContext } from './form.field';

export const Input: React.FC = (): JSX.Element => {
  const context = useContext(FieldContext);

  if (!context) {
    throw new Error();
  }

  const { data } = context;

  const render = () => {
    switch (data?.type) {
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