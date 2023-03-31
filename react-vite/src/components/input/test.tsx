import React, { useState, useRef, useEffect } from 'react';

interface InputProps {
  name: string;
  text: string;
  value?: string;
  defaultValue?: string;
  unit?: string;
  onChange?: ({ key, value }: { key: string, value: string }) => void;
}

const linearGradientFn = (str: string, value: string) => {
  const match = str.match(/^(linear-gradient\()([^\)]*)(\))$/);
  if (!match) return '';

  const [, prefix, cssValue, suffix] = match;
  const arr = cssValue.split(/,(?![^(]*\))(?![^"']*["'](?:[^"']*["'][^"']*["'])*[^"']*$)/);

  if (arr.length === 5) {
    arr[3] = arr[3].replace(/(\d+)%.*/, `${value}%`);
    arr[4] = arr[4].replace(/(\d+)%.*/, `${value}%`);
  }

  return `${prefix}${arr.join()}${suffix}`;
}

export const InputRange: React.FC<InputProps> = ({ name, text, value: initialValue, defaultValue = '0', unit = 'px', onChange }): JSX.Element => {
  const [value, setValue] = useState<string>(initialValue || defaultValue);
  const [backgroundImage, setBackgroundImage] = useState<string>('linear-gradient(90deg, #ddd 0%, #000 0%, #000 0%, #ddd 0%)');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(initialValue || defaultValue || '0');
  }, [initialValue, defaultValue]);

  useEffect(() => {
    if (inputRef.current) {
      const { style } = inputRef.current;
      const backgroundImage = style.backgroundImage || window.getComputedStyle(inputRef.current).backgroundImage || '';

      setBackgroundImage(linearGradientFn(backgroundImage, `${parseInt(value) * 5}`));

      console.log(backgroundImage);
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
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
        style={{ backgroundImage }}
      />
      <span className="text">{value + unit}</span>
    </div>
  );
}
