import React from 'react';
import { DndActionType } from './types';

interface DropEditorProps {
  onCallback?: (name: keyof typeof DndActionType) => void;
}

function DropEditor({ onCallback }: DropEditorProps) {

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
      <button type="button" name={DndActionType.CLOSE_EDITING_ITEM}>Close</button>
    </div>
  )
}

export default DropEditor;