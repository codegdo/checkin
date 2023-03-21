import React, { PropsWithChildren } from 'react';
import { useWrapperContext } from '../../hooks';
import useDragDrop from './use-dragdrop.hook';
import { DragDropContext } from './dragdrop.context';
import { DndItem } from './dragdrop.type';

const DragItem: React.FC<PropsWithChildren<DndItem>> = ({ children, ...item }) => {
  const { dndRef, state, dispatch } = useWrapperContext(DragDropContext);
  const { name, label, className = 'drag-item' } = item;

  const { drag } = useDragDrop(item, dndRef, state, dispatch);

  return (
    <div ref={drag} className={className}>
      {children ?? label ?? name ?? 'Drag Item'}
    </div>
  );
};

export default DragItem;
