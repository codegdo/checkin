import React, { } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Render } from './dragdrop.render';

export interface DragDropProps {
  data?: any;
  onCallback?: (key?: string, value?: string) => void;
}

export const DragDrop: React.FC<DragDropProps> = ({ data, onCallback, ...props }): JSX.Element => {

  return <>
    <DndProvider backend={HTML5Backend}>
      <Render data={data} />
    </DndProvider>
  </>
}