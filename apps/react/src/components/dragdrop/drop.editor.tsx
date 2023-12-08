import React from 'react';
import { ActionType } from './reducers';

interface IProps {
  onClick?: (name: keyof typeof ActionType) => void;
}

function DropEditor({ onClick }: IProps) {

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
      <button type="button" name={ActionType.CLOSE_EDITING_ITEM}>Close</button>
    </div>
  )
}

export default DropEditor;