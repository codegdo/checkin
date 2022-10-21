import React, { useState } from 'react';
import { InputProps } from './input.type';

export const InputText: React.FC<InputProps> = ({ type, name, text, value: intialValue = '', onChange }): JSX.Element => {

  const [value, setValue] = useState(intialValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    setValue(target.value)
    onChange && onChange(name, target.value);
  }

  return <div>
    <input className='input' type={type} name={name} value={value} onChange={handleChange} />
    {text && <em>{text}</em>}
  </div>
}