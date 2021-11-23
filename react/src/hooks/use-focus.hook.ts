import React, { useRef, useState, useEffect } from 'react';

const hasFocus = () => typeof document !== 'undefined' && document.hasFocus();

export const useFocus = (value: any): [ref: React.MutableRefObject<null>, setFocus: () => void] => {
  const ref = useRef(value);

  const setFocus = () => {
    ref.current && ref.current.focus();
  }

  return [ref, setFocus]
}

export const useWindowFocus = (): boolean => {
  const [focused, setFocused] = useState(hasFocus);

  useEffect(() => {
    setFocused(hasFocus());

    const onFocus = () => setFocused(true);
    const onBlur = () => setFocused(false);

    window.addEventListener('focus', onFocus);
    window.addEventListener('blur', onBlur);

    return () => {
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('blur', onBlur);
    };
  }, []);

  return focused;
};
