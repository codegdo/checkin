import React, { memo } from 'react';

import { useWrapperContext } from '../../hooks';

import DragDropContext from './dragdrop.provider';
import DragItem from './drag.item';


function DragRender({ data = [] }: { data: any[] }) {
  const context = useWrapperContext(DragDropContext);

  return (
    <>
      <DragItem />
    </>
  );
}

export default DragRender;