import React, { useEffect, useReducer, useRef } from 'react';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { DragDropProvider, dndRef, initialState } from './dragdrop.provider';
import DragDropRender from './dragdrop.render';
import DragRender from './drag.render';
import { DragField, Field } from '../types';
import { dndReducer } from './reducers';
import { DndActionType } from './types';
import { useClickOutside } from '../../hooks';

interface DragDropProps {
  data: Field[];
  dragFields?: DragField[];
}

export function DragDrop({ data = [], dragFields = [] }: DragDropProps) {
  const backend = ('ontouchstart' in window) ? TouchBackend : HTML5Backend;
  const [state, dispatch] = useReducer(dndReducer, initialState);
  const { current: dnd } = useRef(dndRef);
  const ref = useRef(null);

  useEffect(() => {
    dispatch({
      type: DndActionType.INITIAL_ITEMS,
      payload: { data }
    });
  }, [data]);

  // useClickOutside(ref, () => {
  //   dispatch({
  //     type: DndActionType.UNSELECT_ITEM,
  //     payload: null
  //   });
  // });

  const handleItemClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    const target = e.target as Element;
    const clickedElement = target.closest('div[data-id]');

    if (clickedElement) {
      const id = clickedElement.getAttribute('data-id');
      const item = state.data.find(item => item.id == id);

      if (item) {
        let selected = false;

        if (state.item?.id == item.id) {
          selected = state.isSelecting;
        }

        const updatedItem = { ...item };

        dispatch({
          type: DndActionType.SELECT_ITEM,
          payload: { item: updatedItem, isSelecting: !selected }
        });
      }
    }
  };

  return (
    <DndProvider backend={backend}>
      <DragDropProvider value={{ state, dispatch, dnd }}>
        <div ref={ref} onClick={handleItemClick}>
          <DragDropRender />
        </div>
        <div>
          <DragRender data={dragFields} />
        </div>
      </DragDropProvider>
    </DndProvider>
  )
}

// npx madge src/components/dragdrop/dragdrop.component.tsx --image src/components/dragdrop/dragdrop.graph.png