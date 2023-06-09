import React from 'react';

import { DragDropProvider } from './dragdrop.provider';
import DragDropRender from './dragdrop.render';
import DragRender from './drag.render';

function DragDrop() {

  return (
    <DragDropProvider value=''>
      <DragDropRender data={[]} />
      <DragRender data={[]} />
    </DragDropProvider>
  )
}

export default DragDrop;