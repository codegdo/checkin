import React, { } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DragDropBlock } from './dragdrop.block';
import { Render } from './dragdrop.render';

export interface DragDropProps {
  data?: any;
  onCallback?: (key?: string, value?: string) => void;
}

export const DragDrop: React.FC<DragDropProps> = ({ data, onCallback, ...props }): JSX.Element => {

  return <>
    <DndProvider backend={HTML5Backend}>
      <DragDropBlock id="0" role="block">
        <Render data={data} />
      </DragDropBlock>
    </DndProvider>
  </>
}