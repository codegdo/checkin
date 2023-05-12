import React, { useEffect, useState } from 'react';
import { InputProps } from './input.type';

export function InputSelect({ name, note, value: initialValue, data = [], onChange }: InputProps) {

  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { target } = event;
    setValue(target.value)
    onChange && onChange({ key: name, value: target.value });
  }

  return <div>
    <select className='select' value={value == null ? '' : value} onChange={handleChange}>
      <option value="">--</option>
      {
        data.map(({ key, value }: any, i: number) => {
          return <option key={i} value={key}>{value}</option>
        })
      }
    </select>
    {note && <span className='note'>{note}</span>}
  </div>
}