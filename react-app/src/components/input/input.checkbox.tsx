import React, { ChangeEvent, useEffect, useState } from 'react';
import { InputProps } from './input.type';

export function InputCheckbox({ onChange }: InputProps) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    console.log('CHECKED', checked);
    onChange && onChange({ key: '', value: '' });
  }, [checked]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    setChecked(target.checked);
  }

  return <label className={`switch ${checked ? '-on' : ''}`}>
    <input type='checkbox' defaultValue={'test'} checked={checked} onChange={handleChange} />
  </label>
}