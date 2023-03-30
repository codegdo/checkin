import React, { useEffect, useRef, useState, ChangeEvent } from 'react';

import { linearGradient } from '../../utils';
import { InputProps } from './input.type';

interface InputRangeProps {
  name: string;
  text?: string;
  initialValue?: string;
  defaultValue?: string;
  unit?: string;
  onChange?: (value: string) => void;
}

export function InputRange({
  name,
  text = '',
  value: initialValue = '0',
  defaultValue,
  unit = 'px',
  onChange,
}: InputProps) {

  const [value, setValue] = useState<string>(initialValue || defaultValue || '0');
  const [backgroundImage, setBackgroundImage] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const newValue = initialValue || defaultValue || '0';
    setValue(newValue);
    setBackgroundImage(getBackgroundImage(newValue));
  }, [initialValue, defaultValue]);

  useEffect(() => {
    if (inputRef.current) {
      const newValue = `${parseInt(value) * 5}%`;
      const currentStyle = inputRef.current.style;
      const currentComputedStyle = window.getComputedStyle(inputRef.current);
      setBackgroundImage(
        getLinearGradient(currentStyle.backgroundImage || currentComputedStyle.backgroundImage, newValue)
      );
    }
  }, [value]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const newValue = event.target.value;
    setValue(newValue);
    onChange && onChange({ key: name, value: newValue });
  }

  function getBackgroundImage(value: string) {
    return getLinearGradient(null, `${parseInt(value) * 5}%`);
  }

  function getLinearGradient(backgroundImage: string | null, newValue: string) {
    if (backgroundImage) {
      return linearGradient(backgroundImage, newValue);
    } else {
      return `linear-gradient(
        90deg,
        #ddd 0%,
        #000 0%,
        #000 ${newValue},
        #ddd ${newValue}
      )`;
    }
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
        style={{ backgroundImage }}
        onChange={handleChange}
      />
      {text && <span className="text">{text + ' '}</span>}
      <span className="value">{value + unit}</span>
    </div>
  );
}
