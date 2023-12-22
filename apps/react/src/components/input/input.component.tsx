import { ChangeEvent } from 'react';

import { IInput } from './types';
import { InputText } from './input.text';

interface IProps extends IInput {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function Input({ ...props }: IProps) {

  switch (props.type) {
    case 'text':
    case 'password': return <InputText {...props} />;

    default: return null;
  }
}