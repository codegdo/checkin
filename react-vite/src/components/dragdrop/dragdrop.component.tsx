import React, { PropsWithChildren } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';

import { DragDropProvider } from './dragdrop.context';
import { DragDropRender } from './dragdrop.render';
import { DragDropEditor } from './dragdrop.editor';

export interface DragDropProps {
  data: any;
  onCallback?: (key?: string, values?: any) => void;
}

export const DragDrop: React.FC<PropsWithChildren<DragDropProps>> = ({ children, ...props }): JSX.Element => {
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