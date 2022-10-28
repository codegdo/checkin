import React, { FC, useEffect, useRef, useState } from 'react';
import { styleHelper } from '../../helpers';
import { InputProps } from './input.type';

export const InputRange: React.FC<InputProps> = ({ type, name, text, value: intialValue = '', onChange }): JSX.Element => {

  const [value, setValue] = useState(intialValue);
  const [backgroundImage, setBackgroundImage] = useState('');
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      const { style } = ref.current;

      if (style.backgroundImage) {
        setBackgroundImage(styleHelper.linearGradient(style.backgroundImage, `${parseInt(value) * 5}%`));
      } else {
        if (window.getComputedStyle(ref.current).backgroundImage) {
          setBackgroundImage(styleHelper.linearGradient(window.getComputedStyle(ref.current).backgroundImage, `${parseInt(value) * 5}%`));
        } else {
          setBackgroundImage(`linear-gradient(
            90deg,
            #ddd 0%,
            #000 0%,
            #000 ${parseInt(value) * 5}%,
            #ddd ${parseInt(value) * 5}%
          )`);
        }
      }
    }
  }, [value, backgroundImage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    setValue(target.value);
    onChange && onChange(name, target.value);
  }

  console.log(backgroundImage);

  return <div>
    <span>{value}</span>
    <input ref={ref} type='range' min='0' max='20' step='1' value={value} style={{ backgroundImage }} onChange={handleChange} />
  </div>
}