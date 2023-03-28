import React, { FC, MouseEvent } from 'react';
import { ActionClickType } from '../../constants';

interface DragDropMenuProps {
  onClick: (actionType: string) => void
}

export const DragDropMenu: FC<DragDropMenuProps> = ({ onClick }): JSX.Element => {
  const handleClick = (actionType: string) => {
    onClick(actionType);
  }

  const handleMenuClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className='dnd-menu' onClick={handleMenuClick}>
      <button type='button' onClick={() => handleClick(ActionClickType.MENU_EDIT)}>Edit</button>
      <button type='button' onClick={() => handleClick(ActionClickType.MENU_CLONE)}>Clone</button>
      <button type='button' onClick={() => handleClick(ActionClickType.MENU_REMOVE)}>Remove</button>
    </div>
  );
}