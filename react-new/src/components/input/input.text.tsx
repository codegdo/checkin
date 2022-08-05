import React, { useState } from 'react';

interface InputTextProps {
  name: string;
  value?: string;
  onChange?: (key: string, value: string) => void;
}
export const InputText: React.FC<InputTextProps> = ({ name, value: intialValue = '', onChange }): JSX.Element => {

  const [value, setValue] = useState(intialValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    setValue(target.value)
    onChange && onChange(name, target.value);
  }

  return <input type="text" name={name} value={value} onChange={handleChange} />
}