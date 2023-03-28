import React, { useEffect, useState } from 'react';
import { InputProps } from './input.type';

export function InputText({ type, name, text, value: initialValue, isReset, onChange }: InputProps) {

  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [isReset]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    setValue(target.value)
    onChange && onChange({ key: name, value: target.value });
  }

  return <div>
    <input className='input' type={type} name={name} value={value == null ? '' : value} onChange={handleChange} />
    {text && <span className='text'>{text}</span>}
  </div>
}

// (value == null) also returns true if value is undefined