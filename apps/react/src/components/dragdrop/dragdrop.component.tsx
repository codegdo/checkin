import { useEffect, useReducer, useRef } from 'react';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { DragDropProvider, defaultDndRef, initialState } from './dragdrop.provider';
import DropRender from './drop.render';
import DragRender from './drag.render';
import DragPreview from './drag.preview';
import { dndReducer } from './reducers';
import { DndActionType, DndField, DndData } from './types';

interface DragDropProps {
  data: DndData;
  dragFields?: DndField[];
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
        <DropRender />
        <DragRender data={dragFields} />
        <DragPreview />
      </DragDropProvider>
    </DndProvider>
  )
}

// npx madge src/components/dragdrop/dragdrop.component.tsx --image src/components/dragdrop/dragdrop.graph.png --warning