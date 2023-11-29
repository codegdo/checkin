import React from 'react';
import { DndContextValue } from './types';

export const defaultStatus = {
  isSelecting: false,
  isEditing: false,
};

export const initialState = {
  data: [],
  item: null,
  ...defaultStatus
};

export const dndRef = {
  drop: null,
  domList: {},
  touchItems: [],
  nestedItems: [],
  clientX: 0,
  clientY: 0,
  offset: '',
  canDrop: true,
};

const DragDropContext = React.createContext<DndContextValue>({
  state: initialState,
  dispatch: () => console.log('dispatch'),
  dndRef: dndRef,
});

export const DragDropProvider = DragDropContext.Provider;
export default DragDropContext;