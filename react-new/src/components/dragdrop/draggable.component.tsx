import React, { useContext } from 'react';
import { DraggableItem } from './draggable.item';
import { DragDropContext } from './dragdrop.context';
import { DragDropContextProps } from './dragdrop.type';

export const Draggable = (): JSX.Element => {
  const ctx = useContext((DragDropContext as Object) as React.Context<DragDropContextProps>);

  if (!ctx) {
    throw new Error();
  }

  const { current, addItem } = ctx;
  return <DraggableItem current={current} addItem={addItem} />
}