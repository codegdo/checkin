import React, { useRef } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Draggable } from './draggable.component';
import { DragDropProvider } from './dragdrop.context';
import { Render } from './dragdrop.render';
import { DragDropProps } from './dragdrop.type';
import { DragDropEditor } from './dragdrop.editor';
import { DragDropItem } from './dragdrop.item';

export const DragDrop: React.FC<DragDropProps> = ({ onCallback, ...props }): JSX.Element => {
  const { current } = useRef({});

  return (

    <DndProvider backend={HTML5Backend}>
      <DragDropProvider {...props} current={current}>

        <DragDropItem id="dropstage" role="block" type="div" draggable={false} current={current}>
          <Render />
        </DragDropItem>

        <Draggable />

        <DragDropEditor />

      </DragDropProvider>
    </DndProvider>

  )
}