import React, { PropsWithChildren } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';

import { DragDropProvider } from './dragdrop.context';
import { DragDropRender } from './dragdrop.render';
import { DragDropProps } from './dragdrop.type';
import { DragDropEditor } from './dragdrop.editor';

export const DragDrop: React.FC<PropsWithChildren<DragDropProps>> = ({ children, onCallback, ...props }): JSX.Element => {
  const backend = ('ontouchstart' in window) ? TouchBackend : HTML5Backend;
  return (
    <DndProvider backend={backend}>
      <DragDropProvider {...props}>
        <DragDropRender />
        {children}
        <DragDropEditor />
      </DragDropProvider>
    </DndProvider>
  )
}