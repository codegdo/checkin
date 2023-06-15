import React, { memo } from 'react';

import { useWrapperContext } from '../../hooks';
import DragDropContext from './dragdrop.provider';

import DragItem from './drag.item';
import { DragField } from '../types';

interface DragRenderProps {
  data?: DragField[];
}

function DragRender({ data = [] }: DragRenderProps) {
  const ctx = useWrapperContext(DragDropContext);

  return (
    <>
      <DragItem />
    </>
  );
}

export default DragRender;