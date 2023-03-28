import React, { FC, PropsWithChildren } from 'react';
import { useWrapperContext } from '../../hooks';
import {useDragDrop} from './hooks/use-dragdrop.hook';
import { DragDropContext } from './dragdrop.context';
import { DndItem } from './dragdrop.type';

type DragItemProps = PropsWithChildren<DndItem>;

export const DragItem: FC<DragItemProps> = ({ children, ...item }): JSX.Element => {
  const { dndRef, state, dispatch } = useWrapperContext(DragDropContext);
  const { name, label, className = 'drag-item' } = item;

  const { drag } = useDragDrop(item, dndRef, state, dispatch);

  return (
    <div ref={drag} className={className}>
      {children ?? label ?? name ?? 'Drag Item'}
    </div>
  );
};

