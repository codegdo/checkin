import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Draggable } from './draggable.component';
import { DragDropBlock } from './dragdrop.block';
import { DragDropProvider } from './dragdrop.context';
import { Render } from './dragdrop.render';
import { DragDropProps } from './dragdrop.type';
import { DragDropEditor } from './dragdrop.editor';

export const DragDrop: React.FC<DragDropProps> = ({ onCallback, ...props }): JSX.Element => {

  return (

    <DndProvider backend={HTML5Backend}>
      <DragDropProvider {...props}>

        <DragDropBlock id="0" role="block" setFocus={() => { }}>
          <Render />
        </DragDropBlock>

        <Draggable />

        <DragDropEditor />

      </DragDropProvider>
    </DndProvider>

  )
}