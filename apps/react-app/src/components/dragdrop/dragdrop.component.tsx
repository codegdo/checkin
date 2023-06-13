import React from 'react';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { DragDropProvider } from './dragdrop.provider';
import DragDropRender from './dragdrop.render';
import DragRender from './drag.render';
import { DragField, Field } from '../types';

interface DragDropProps {
  data: Field[];
  dragFields?: DragField[];
}

export function DragDrop({ data, dragFields }: DragDropProps) {
  const backend = ('ontouchstart' in window) ? TouchBackend : HTML5Backend;

  const handleItemClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = (e.target as HTMLDivElement);

    console.log('PARENT', target.id);

    if (target.nodeName === 'div') {
      // Handle the click on list items
      console.log('Clicked on:', target.textContent);
    }
  };

  return (
    <DndProvider backend={backend}>
      <DragDropProvider value=''>
        <div onClick={handleItemClick}>
          <DragDropRender data={data} />
        </div>
        <div>
          <DragRender data={dragFields} />
        </div>
      </DragDropProvider>
    </DndProvider>
  )
}

// npx madge src/components/dragdrop/dragdrop.component.tsx --image src/components/dragdrop/dragdrop.graph.png