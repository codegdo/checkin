import React, { useEffect, useReducer, useRef } from 'react';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { DragDropProvider, defaultDndRef, initialState } from './dragdrop.provider';
import DragDropRender from './dragdrop.render';
import DragRender from './drag.render';
import { Field } from '../types';
import { dndReducer } from './reducers';
import { DndActionType } from '../types';
import DragDropPreview from './dragdrop.preview';

interface DragDropProps {
  data: Field[];
  dragFields?: Field[];
}

export function DragDrop({ data = [], dragFields = [] }: DragDropProps) {
  const backend = ('ontouchstart' in window) ? TouchBackend : HTML5Backend;
  const [state, dispatch] = useReducer(dndReducer, initialState);
  const { current: dndRef } = useRef(defaultDndRef);

  useEffect(() => {
    dispatch({
      type: DndActionType.INITIAL_ITEMS,
      payload: { data }
    });
  }, [data]);

  return (
    <DndProvider backend={backend}>
      <DragDropProvider value={{ state, dispatch, dndRef }}>
        <DragDropRender />
        <DragRender data={dragFields} />
        <DragDropPreview />
      </DragDropProvider>
    </DndProvider>
  )
}

// npx madge src/components/dragdrop/dragdrop.component.tsx --image src/components/dragdrop/dragdrop.graph.png --warning