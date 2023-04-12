import React, { FC, MouseEvent } from 'react';
import { ActionMenuEnum } from '../../constants';
import { useDragLayer } from 'react-dnd';

interface DragDropMenuProps {
  onClick: (actionType: string) => void
}

export function DragDropMenu({ onClick }: DragDropMenuProps) {

  const { opacity } =
    useDragLayer((monitor) => ({
      opacity: monitor.isDragging() ? 0 : 1
    }));

  const handleClick = (actionType: string) => {
    onClick(actionType);
  }

  const handleMenuClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className='dnd-menu' style={{ opacity }} onClick={handleMenuClick}>
      <button type='button' onClick={() => handleClick(ActionMenuEnum.MENU_EDIT)}>Edit</button>
      <button type='button' onClick={() => handleClick(ActionMenuEnum.MENU_CLONE)}>Clone</button>
      <button type='button' onClick={() => handleClick(ActionMenuEnum.MENU_REMOVE)}>Remove</button>
    </div>
  );
}