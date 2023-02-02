import React, { useEffect, useRef, useState } from 'react';

import { linearGradient } from '../../utils';
import { InputProps } from './input.type';

export const InputRange: React.FC<InputProps> = ({ name, text, value: initialValue = '0', defaultValue, unit = 'px', onChange }): JSX.Element => {

  const [value, setValue] = useState(initialValue || defaultValue);
  const [backgroundImage, setBackgroundImage] = useState('');
  const ref = useRef<HTMLInputElement>(null);
  let gradient = '';

  useEffect(() => {
    setValue(initialValue || defaultValue);
    setBackgroundImage(gradient);
  }, [initialValue]);

  useEffect(() => {
    if (ref.current) {
      const { style } = ref.current;
      const val = `${parseInt(value as any) * 5}%`;

      if (style.backgroundImage) {
        gradient = linearGradient(style.backgroundImage, val)
      } else if (window.getComputedStyle(ref.current).backgroundImage) {
        gradient = linearGradient(window.getComputedStyle(ref.current).backgroundImage, val)
      } else {
        gradient = `linear-gradient(
          90deg,
          #ddd 0%,
          #000 0%,
          #000 ${val},
          #ddd ${val}
        )`;
      }

      setBackgroundImage(gradient);
    }
  }, [value, backgroundImage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    setValue(target.value);
    onChange && onChange({ key: name, value: target.value });
  }

  return <div>
    <input ref={ref} type='range' className='input' min='0' max='20' step='1' value={value == null ? 0 : value} style={{ backgroundImage }} onChange={handleChange} />
    {value !== null && <span className='text'>{value + unit}</span>}
  </div>
}