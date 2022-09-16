import React, { useContext } from 'react';
import { DragItem } from './drag.item';
import { DragDropContext } from './dragdrop.context';
import { DragDropContextProps } from './dragdrop.type';

export const Drag = (): JSX.Element => {
  const ctx = useContext((DragDropContext as Object) as React.Context<DragDropContextProps>);

  if (!ctx) {
    throw new Error();
  }

  const { current, addItem } = ctx;
  return <DragItem current={current} addItem={addItem} />
}