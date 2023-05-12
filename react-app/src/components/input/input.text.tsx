import React, { useEffect, useState, ChangeEvent } from 'react';
import { InputProps } from './input.type';

export function InputText({
  type,
  name,
  note,
  value: initialValue = '',
  isReset = false,
  onChange,
}: InputProps) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (isReset) {
      setValue(initialValue);
    }
  }, [isReset, initialValue]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    onChange?.({ key: name, value: newValue });
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
      {note && <span className="note">{note}</span>}
    </div>
  );
}

// (value == null) also returns true if value is undefined