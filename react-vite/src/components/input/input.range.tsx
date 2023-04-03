import React, { useEffect, useRef, useState, ChangeEvent } from 'react';

import { InputProps, KeyValue } from './input.type';

interface InputRangeProps extends InputProps {
  unit?: string;
}

export function InputRange({
  name,
  note,
  value: initialValue,
  defaultValue = '0',
  placeholder = '',
  unit = 'px',
  isReset,
  onChange,
}: InputRangeProps) {

  const [value, setValue] = useState<string>(initialValue || defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const newValue = initialValue || defaultValue;
    setValue(newValue);
  }, [initialValue, defaultValue]);

  useEffect(() => {
    if (isReset) {
      const newValue = initialValue || defaultValue;
      setValue(newValue);
    }
  }, [isReset]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    onChange && onChange({ key: name, value: newValue });
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="range"
        className="input"
        min="0"
        max="20"
        step="1"
        value={value}
        onChange={handleChange}
      />
      {note && <span className="note">{note + ' '}</span>}
      <span className="unit">{value + unit}</span>
    </div>
  );
}
