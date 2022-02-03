import React, { useEffect, useRef, useState } from 'react';

import { useFocus, useReset } from '../../hooks';
import { formatPhone } from '../../utils';
import { NumPadKey } from './numpad.key';
import { NumPadMessage } from './numpad.message';
import { NumPadInput } from './numpad.input';
import { NumPadContextProps, NumPadProps } from './numpad.type';

export const NumPadContext = React.createContext<NumPadContextProps | undefined>(undefined);

export const NumPad: React.FC<NumPadProps> = ({
  value: initialValue = '',
  className = 'numpad',
  type = 'input',
  placeholder = '',
  message = '',
  focus = false,
  keypress = false,
  masked = false,
  reset = false,
  autoSubmit = false,
  digit = 4,
  status = 'idle',
  children,
  onSubmit }): JSX.Element => {

  const { current } = useRef<{ [x: string]: string }>({ value: initialValue });
  const [ref, setFocus] = useFocus(null);
  const [value, setValue] = useState(initialValue || '');
  const [counter, setCounter] = useState(0);
  const { error } = useReset(status);

  useEffect(() => {
    const timer = setTimeout(() => {
      masked && setValue(value => value.replace(/[0-9]/g, "•"));
    }, 300);

    return () => {
      clearTimeout(timer);
    }
  }, [value]);

  // reset
  useEffect(() => {
    if (error && reset) {
      current.value = '';
      setValue('');
      setCounter(0);
    }
  }, [error])

  // focus
  useEffect(() => {
    focus && setFocus();
  }, []);

  const setNum = (val: string) => {
    if (current.value.length <= digit - 1) {
      current.value = current.value + val;
      type === 'input' && setValue(value + val);

      if (type === 'phone') {
        masked ?
          setValue(
            current.value.length > 3 ?
              formatPhone(current.value).replace(/[0-9](?!$)/g, "•") :
              formatPhone(current.value).replace(/[0-9](?!\D$)/g, "•")
          ) :
          setValue(formatPhone(current.value));
      }

      setCounter(counter + 1);
    }
    if (autoSubmit) {
      current.value.length === digit && enterNum();
    }
  }

  const clearNum = () => {
    current.value = current.value.substring(0, current.value.length - 1);
    type === 'input' && setValue(value.substring(0, value.length - 1));

    if (type === 'phone') {
      masked ?
        setValue(formatPhone(current.value).replace(/[0-9]/g, "•")) :
        setValue(formatPhone(current.value));
    }

    counter > 0 && setCounter(counter - 1);
  }

  const enterNum = () => {
    onSubmit && onSubmit(current.value);
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
    <NumPadContext.Provider value={{ ref, type, value, placeholder, message, digit, counter, keypress, autoSubmit, handleClick, handleKeyDown }}>
      {
        children ||
        <>
          <NumPadInput type={type} />
          <NumPadMessage />
          <NumPadKey />
        </>
      }
    </NumPadContext.Provider>
  </div>
}