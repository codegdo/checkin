import { ChangeEvent } from 'react';
import { IInput } from './types';

interface IProps extends IInput {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function InputText({
  type,
  name,
  hint = '',
  value = '',
  onChange,
}: IProps) {

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);
  };

  return (
    <div>
      <input
        className="input"
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
      />
      {hint && <span className="hint">{hint}</span>}
    </div>
  );
}
