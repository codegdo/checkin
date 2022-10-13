import React, { useState, useEffect, useRef } from 'react';

export const useToggle = (initialState: boolean = false): [React.MutableRefObject<null>, boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const ref = useRef(null);

  const [isToggle, setIsToggle] = useState(initialState);


  useEffect(() => {

    const pageClickEvent = (e: MouseEvent) => {
      // If the toggle element exists and is clicked outside of
      if (ref.current !== null && !ref.current.contains(e.target)) {
        setIsToggle(!isToggle);
      }
    };

    // If the item is toggle (ie open) then listen for clicks
    if (isToggle) {
      window.addEventListener('click', pageClickEvent);
    }

    console.log('click');

    return () => {
      window.removeEventListener('click', pageClickEvent);
    }

  }, [isToggle, ref]);

  return [ref, isToggle, setIsToggle];
}