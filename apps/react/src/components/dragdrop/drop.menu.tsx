import React from 'react';
import { ActionType } from './reducers';

interface IProps {
  onCallback?: (name: keyof typeof ActionType) => void;
}

function DropMenu({ onCallback }: IProps) {

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    const target = e.target as Element;
    const clickedElement = target.closest('button');

    if (clickedElement) {
      const name = clickedElement.getAttribute('name') as keyof typeof ActionType;
      onCallback && onCallback(name);
    }
  };

  return (
    <div onClick={handleClick}>
      <button type="button" name={ActionType.OPEN_EDITING_ITEM}>Edit</button>
    </div>
  )
}

export default DropMenu;