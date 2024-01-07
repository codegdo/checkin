
import { RichText } from '../richtext';
import { IControl } from './types';

interface IProps extends IControl { 
  onChange
}

export function ControlRichText({ name, value, onChange }: IProps) {

  return (
    <div>
      <RichText />
    </div>
  );
}