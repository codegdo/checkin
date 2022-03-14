import { useState } from 'react';

export const useModal = (show?: boolean): [boolean, () => void] => {
  const [isShow, setIsShow] = useState<boolean>(show || false);
  const toggle = () => setIsShow(!isShow);
  return [isShow, toggle];
};
