import { ControlText } from './control.text';
import { IControl } from './types';

interface IProps extends IControl { }

export function Control(props: IProps) {

  switch (props.type) {
    case 'text':
    case 'password': return <ControlText {...props} />;

    default: return null;
  }
}