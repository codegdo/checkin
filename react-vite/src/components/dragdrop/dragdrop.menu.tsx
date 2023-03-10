import React from 'react';

interface DragDropMenuProps {
  onClick: (name: string) => void
}
const DragDropMenu: React.FC<DragDropMenuProps> = ({onClick}): JSX.Element => {
  
  const handleClick = (name: string) => {
    onClick(name);
  }

  const handleMenuClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className='dnd-menu' onClick={handleMenuClick}>
      <button type='button' onClick={() => handleClick('MENU_EDIT')}>Edit</button>
      <button type='button' onClick={() => handleClick('MENU_DUPLICATE')}>Duplicate</button>
      <button type='button' onClick={() => handleClick('MENU_DELETE')}>Delete</button>
    </div>
  );
};

export default DragDropMenu;