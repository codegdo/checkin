import { Input } from '../input';
import { IControl } from './types';

interface IProps extends IControl { }

export function ControlText({ name, value, onChange }: IProps) {

  return (
    <div>
      <Input type='text' name={name} value={value} onChange={onChange} />
    </div>
  );
}