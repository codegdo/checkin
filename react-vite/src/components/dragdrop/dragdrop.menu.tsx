import React, { FC, MouseEvent } from 'react';
import { ActionMenuEnum } from '../../constants';

interface DragDropMenuProps {
  onClick: (actionType: string) => void
}

export function DragDropMenu({ onClick }: DragDropMenuProps) {

  const handleClick = (actionType: string) => {
    onClick(actionType);
  }

  const handleMenuClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className='dnd-menu' onClick={handleMenuClick}>
      <button type='button' onClick={() => handleClick(ActionMenuEnum.MENU_EDIT)}>Edit</button>
      <button type='button' onClick={() => handleClick(ActionMenuEnum.MENU_CLONE)}>Clone</button>
      <button type='button' onClick={() => handleClick(ActionMenuEnum.MENU_REMOVE)}>Remove</button>
    </div>
  );
}