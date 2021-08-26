import React, { useEffect, useRef, useState } from 'react';
//import { NumPadInput } from './numpad.input';
import { NumPadKey } from './numpad.key';
import { NumPadContextProps, NumPadProps } from './numpad.type';

export const NumPadContext = React.createContext<NumPadContextProps | undefined>(undefined);

export const NumPad: React.FC<NumPadProps> = ({ value: initialValue, onClick }): JSX.Element => {

  const { current } = useRef<{ [x: string]: string }>({ value: initialValue || '' })
  const [value, setValue] = useState(initialValue || '');

  useEffect(() => {
    const timer = setTimeout(() => {
      setValue(value => value.replace(/./g, "•"));
    }, 500);

    return () => {
      clearTimeout(timer);
    }
  }, [value])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const target = e.target as HTMLInputElement;

    if (target.name === "key") {
      current.value = current.value + target.value;
      setValue(value + target.value);
    } else if (target.name === "clear") {
      current.value = current.value.substring(0, current.value.length - 1);
      setValue(value.substring(0, value.length - 1));
    } else {
      console.log(current.value);
      onClick && onClick(current.value);
    }

  }

  return <>
    <div>{value}</div>

    <NumPadContext.Provider value={{ value, handleClick }}>
      <NumPadKey />
    </NumPadContext.Provider>
  </>
}