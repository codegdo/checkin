import React from 'react';

import { DragDropProvider } from './dragdrop.provider';
import DragDropRender from './dragdrop.render';
import DragRender from './drag.render';
import { DragField, Field } from '../types';

interface DragDropProps {
  data: Field[];
  dragFields?: DragField[];
}

export function DragDrop({ data, dragFields }: DragDropProps) {

  return (
    <DragDropProvider value=''>
      <DragDropRender data={data} />
      <DragRender data={dragFields} />
    </DragDropProvider>
  )
}