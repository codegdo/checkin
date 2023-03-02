import React, { PropsWithChildren } from 'react';
import { useDragDrop, useWrapperContext } from '../../hooks';
import { DragDropContext } from './dragdrop.context';
import { DndItem } from './dragdrop.type';

const DragItem: React.FC<PropsWithChildren<DndItem>> = ({ children, ...item }) => {
  const context = useWrapperContext(DragDropContext);
  const { name, label, className = 'drag-item' } = item;

  const { drag } = useDragDrop({ ...item, ...context });

  return (
    <div ref={drag} className={className}>
      {children ?? label ?? name ?? 'Drag Item'}
    </div>
  );
};

export default DragItem;
