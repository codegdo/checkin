import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Drag } from './drag.component';
import { DragDropBlock } from './dragdrop.block';
import { Render } from './dragdrop.render';
import { DragDropProps } from './dragdrop.type';

export const DragDrop: React.FC<DragDropProps> = ({ data: dataSource, onCallback, ...props }): JSX.Element => {

  const [data, setData] = useState();
  return <>
    <DndProvider backend={HTML5Backend}>

      <DragDropBlock id="0" role="block">
        <Render data={data} />
      </DragDropBlock>

      <Drag />
    </DndProvider>
  </>
}