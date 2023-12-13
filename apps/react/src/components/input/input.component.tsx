import {InputField} from './types';
import { InputText } from './input.text';

interface IProps extends InputField {}

export function Input({ ...props }: IProps) {

  switch (props.type) {
    case 'text':
    case 'password': return <InputText {...props} />;

    default: return null;
  }
}