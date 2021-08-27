import React, { useRef } from 'react';

export const useFocus = (value: any): [ref: React.MutableRefObject<null>, setFocus: () => void] => {
  const ref = useRef(value);

  const setFocus = () => {
    ref.current && ref.current.focus();
  }

  return [ref, setFocus]
}