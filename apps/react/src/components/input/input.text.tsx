import { ChangeEvent } from 'react';
import { InputField } from './types';

interface IProps extends InputField {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function InputText({
  type,
  name,
  hint,
  value = '', // Default value if value is undefined/null
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
