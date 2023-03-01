import React, { PropsWithChildren } from 'react';
import { useDragDrop } from '../../hooks';
import { DndItem } from './dragdrop.type';

const DragItem: React.FC<PropsWithChildren<DndItem>> = ({ children, ...item }) => {
  const { name, label, className = 'drag-item' } = item;

  const { drag } = useDragDrop(item);

  return (
    <div ref={drag} className={className}>
      {children ?? label ?? name ?? 'Drag Item'}
    </div>
  );
};

export default DragItem;
