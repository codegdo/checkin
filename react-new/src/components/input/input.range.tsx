import React, { FC, useEffect, useRef, useState } from 'react';
import { styleHelper } from '../../helpers';
import { InputProps } from './input.type';

export const InputRange: React.FC<InputProps> = ({ name, text, value: initialValue = '0', onChange }): JSX.Element => {

  const [value, setValue] = useState(initialValue);
  const [backgroundImage, setBackgroundImage] = useState('');
  const ref = useRef<HTMLInputElement>(null);
  let linearGradient = '';

  useEffect(() => {
    setValue(initialValue);
    setBackgroundImage(linearGradient);
  }, [initialValue]);

  useEffect(() => {
    if (ref.current) {
      const { style } = ref.current;

      if (style.backgroundImage) {
        linearGradient = styleHelper.linearGradient(style.backgroundImage, `${parseInt(value) * 5}%`)
      } else if (window.getComputedStyle(ref.current).backgroundImage) {
        linearGradient = styleHelper.linearGradient(window.getComputedStyle(ref.current).backgroundImage, `${parseInt(value) * 5}%`)
      } else {
        linearGradient = `linear-gradient(
          90deg,
          #ddd 0%,
          #000 0%,
          #000 ${parseInt(value) * 5}%,
          #ddd ${parseInt(value) * 5}%
        )`;
      }

      setBackgroundImage(linearGradient);
    }
  }, [value, backgroundImage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    setValue(target.value);
    onChange && onChange({ key: name, value: target.value });
  }

  return <div>
    <input ref={ref} type='range' className='input' min='0' max='20' step='1' value={value == null ? 0 : value} style={{ backgroundImage }} onChange={handleChange} />
    {value !== null && <span className='text'>{value}</span>}
  </div>
}