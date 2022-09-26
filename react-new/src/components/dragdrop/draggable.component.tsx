import React, { useContext } from 'react';
import { DraggableBlock } from './draggable.block';
import { DragDropContext } from './dragdrop.context';
import { DragDropContextProps } from './dragdrop.type';

export const Draggable = (): JSX.Element => {
  const ctx = useContext((DragDropContext as Object) as React.Context<DragDropContextProps>);

  if (!ctx) {
    throw new Error();
  }

  const { current, addItem, setFocus } = ctx;
  return <DraggableBlock current={current} addItem={addItem} setFocus={setFocus} />
}