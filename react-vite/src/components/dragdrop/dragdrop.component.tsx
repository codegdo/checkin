import React, { PropsWithChildren } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';

import DragDropProvider from './dragdrop.context';
import DragEditor from './dragdrop.editor';
import DropArea from './drop.area';
import DragArea from './drag.area';

export interface DragDropProps extends PropsWithChildren {
  data?: any;
  onCallback?: (key?: string, values?: any) => void;
}

const DragDrop: React.FC<DragDropProps> = ({ children, ...props }): JSX.Element => {
  const backend = ('ontouchstart' in window) ? TouchBackend : HTML5Backend;
  return (
    <DndProvider backend={backend}>
      <DragDropProvider {...props}>
        <DropArea />
        <DragArea>{children}</DragArea>
        <DragEditor />
      </DragDropProvider>
    </DndProvider>
  )
}

export default DragDrop;