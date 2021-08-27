import React, { useEffect, useRef, useState } from 'react';
import { useFocus } from '../../hooks';
import { NumPadInput } from './numpad.input';
import { NumPadKey } from './numpad.key';
import { NumPadContextProps, NumPadProps } from './numpad.type';

export const NumPadContext = React.createContext<NumPadContextProps | undefined>(undefined);

export const NumPad: React.FC<NumPadProps> = ({ value: initialValue = '', className = 'numpad', type = 'input', focus = false, keypress = false, digit = 4, onClick, children }): JSX.Element => {

  const { current } = useRef<{ [x: string]: string }>({ value: initialValue });
  const [value, setValue] = useState(initialValue || '');
  const [counter, setCounter] = useState(0);
  const [ref, setFocus] = useFocus(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setValue(value => value.replace(/./g, "•"));
    }, 300);

    return () => {
      clearTimeout(timer);
    }
  }, [value]);

  useEffect(() => {
    focus && setFocus();
  }, []);

  const setNum = (val: string) => {
    if (current.value.length <= digit - 1) {
      current.value = current.value + val;
      setValue(value + val);
      setCounter(counter + 1);
    }
    if (current.value.length === digit) {
      enterNum();
    }
  }

  const clearNum = () => {
    current.value = current.value.substring(0, current.value.length - 1);
    setValue(value.substring(0, value.length - 1));
    counter > 0 && setCounter(counter - 1);
  }

  const enterNum = () => {
    onClick && onClick(current.value);
    console.log('SUBMIT', current.value);
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const target = event.target as HTMLInputElement;

    if (target.name === "key") {
      setNum(target.value);
    } else if (target.name === "clear") {
      clearNum();
    } else {
      enterNum();
    }

    focus && setFocus();
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {

    const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Enter', 'Delete', 'Backspace'];
    const key = event.key || event.code;

    if (keys.indexOf(key) < 0) {
      return;
    }

    if (key === 'Enter') {
      enterNum();
    } else if (key === 'Delete' || key === 'Backspace') {
      clearNum();
    } else {
      setNum(event.key);
    }
  }

  return <div className={className}>
    <NumPadContext.Provider value={{ ref, type, value, digit, counter, keypress, handleClick, handleKeyDown }}>
      {
        children || <><NumPadInput /><NumPadKey /></>
      }
    </NumPadContext.Provider>
  </div>
}