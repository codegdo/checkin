import React from 'react';
import { DndActionType } from './types';

interface DropMenuProps {
  onCallback?: (name: keyof typeof DndActionType) => void;
}

function DropMenu({ onCallback }: DropMenuProps) {

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    const target = e.target as Element;
    const clickedElement = target.closest('button');

    if (clickedElement) {
      const name = clickedElement.getAttribute('name') as keyof typeof DndActionType;
      onCallback && onCallback(name);
    }
  };

  return (
    <div onClick={handleClick}>
      <button type="button" name={DndActionType.OPEN_EDITING_ITEM}>Edit</button>
    </div>
  )
}

export default DropMenu;