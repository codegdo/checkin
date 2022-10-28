import React, { useState, useEffect } from 'react';

export const useToggle = (defaultToggle: boolean = false, ref?: React.RefObject<HTMLElement>): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [isToggle, setIsToggle] = useState(defaultToggle);

  const outsideClickEvent = (e: MouseEvent) => {
    if (ref && ref.current !== null && !ref.current.contains(e.target as HTMLElement)) {
      setIsToggle(!isToggle);
    }
  };

  useEffect(() => {
    if (isToggle) {
      ref && window.addEventListener('click', outsideClickEvent);
    }

    return () => {
      ref && window.removeEventListener('click', outsideClickEvent);
    }
  }, [isToggle, ref]);

  return [isToggle, setIsToggle];
}