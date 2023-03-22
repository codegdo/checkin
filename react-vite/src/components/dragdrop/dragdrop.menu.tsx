import React from 'react';
import { DndActionClickType } from './dragdrop.type';

interface DragDropMenuProps {
  onClick: (name: string) => void
}
function DragDropMenu({ onClick }: DragDropMenuProps): JSX.Element {
  
  const handleClick = (name: string) => {
    onClick(name);
  }

  const handleMenuClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className='dnd-menu' onClick={handleMenuClick}>
      <button type='button' onClick={() => handleClick(DndActionClickType.MENU_EDIT)}>Edit</button>
      <button type='button' onClick={() => handleClick(DndActionClickType.MENU_CLONE)}>Clone</button>
      <button type='button' onClick={() => handleClick(DndActionClickType.MENU_REMOVE)}>Remove</button>
    </div>
  );
};

export default DragDropMenu;