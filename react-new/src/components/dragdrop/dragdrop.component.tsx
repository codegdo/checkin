import React, { PropsWithChildren } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { DragDropProvider } from './dragdrop.context';
import { DragDropRender } from './dragdrop.render';
import { DragDropProps } from './dragdrop.type';
import { DragDropEditor } from './dragdrop.editor';

export const DragDrop: React.FC<PropsWithChildren<DragDropProps>> = ({ children, onCallback, ...props }): JSX.Element => {

  return (
    <DndProvider backend={HTML5Backend}>
      <DragDropProvider {...props}>
        <DragDropRender />
        {children}
        <DragDropEditor />
      </DragDropProvider>
    </DndProvider>
  )
}