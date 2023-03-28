import React, { PropsWithChildren } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';

import { DragDropProvider } from './dragdrop.context';
import { DropArea } from './drop.area';
import { DragDropEditor } from './dragdrop.editor';
import { DragPreview } from './drag.preview';
import { DragArea } from './drag.area';

export interface DragDropProps extends PropsWithChildren {
  data?: any;
  onCallback?: (key?: string, values?: any) => void;
}

export function DragDrop({ children, ...props }: DragDropProps) {
  const backend = ('ontouchstart' in window) ? TouchBackend : HTML5Backend;
  return (
    <DndProvider backend={backend}>
      <DragDropProvider {...props}>
        <DropArea />
        <DragArea>{children}</DragArea>
        <DragPreview />
        <DragDropEditor />
      </DragDropProvider>
    </DndProvider>
  )
}