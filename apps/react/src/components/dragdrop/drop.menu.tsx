import React from 'react';
import { ActionType } from './dragdrop.reducer';

export interface IDropMenu {
  onClick?: (name: keyof typeof ActionType) => void;
}

function DropMenu({ onClick }: IDropMenu) {

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    const target = e.target as Element;
    const clickedElement = target.closest('button');

    if (clickedElement) {
      const name = clickedElement.getAttribute('name') as keyof typeof ActionType;
      onClick && onClick(name);
    }
  };

  return (
    <div onClick={handleClick}>
      <button type="button" name={ActionType.OPEN_EDITING}>Edit</button>
      <button type="button" name={ActionType.REMOVE_ITEM}>Remove</button>
    </div>
  )
}

export default DropMenu;