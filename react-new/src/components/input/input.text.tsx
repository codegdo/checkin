import React, { useState } from 'react';
import { InputProps } from './input.type';

export const InputText: React.FC<InputProps> = ({ name, value: intialValue = '', onChange }): JSX.Element => {

  const [value, setValue] = useState(intialValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    setValue(target.value)
    onChange && onChange(name, target.value);
  }

  return <input type="text" name={name} value={value} onChange={handleChange} />
}