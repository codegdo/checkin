import { IControl } from './types';
import { InputText } from './input.text';

interface IProps extends IControl { }

export function Control(props: IProps) {

  switch (props.type) {
    case 'text':
    case 'password': return <InputText {...props} />;

    default: return null;
  }
}