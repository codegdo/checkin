import React, { FC, useEffect, useRef, useState } from 'react';
import { styleHelper } from '../../helpers';
import { InputProps } from './input.type';

export const InputRange: React.FC<InputProps> = ({ type, name, text, value: intialValue = '', onChange }): JSX.Element => {

  const [value, setValue] = useState(intialValue);
  const [backgroundImage, setBackgroundImage] = useState('');
  const ref = useRef(null);
  //let { current: backgroundImage } = useRef('');

  useEffect(() => {
    if (ref.current) {


      const { style } = ref.current as HTMLInputElement;
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

  /* const backgroundImage = `linear-gradient(
    90deg,
    rgb(231, 231, 231) 0%,
    rgb(14, 14, 14) 0%,
    rgb(14, 14, 14) ${parseInt(value) * 5}%,
    rgb(231, 231, 231) ${parseInt(value) * 5}%
  )`;
 */

  console.log(backgroundImage);

  return <div>
    <label>{value}</label>
    <input ref={ref} type='range' min='0' max='20' step='1' value={value} style={{ backgroundImage }} onChange={handleChange} />
  </div>
}