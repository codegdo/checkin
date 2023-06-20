import React from 'react';
import { DndContextValue } from '../types';

export const defaultStatus = {
  isSelecting: false,
  isEditing: false,
};

export const initialState = {
  data: [],
  item: null,
  ...defaultStatus
};

export const defaultDndRef = {
  drop: null,
  domList: {},
  touchItems: [],
  nestedItems: [],
  clientX: 0,
  clientY: 0,
  offset: '',
  canDrop: true
};

const dispatch: DndContextValue['dispatch'] = () => {
  // Default implementation
};

const DragDropContext = React.createContext<DndContextValue>({
  state: initialState,
  dispatch,
  dndRef: defaultDndRef,
});

export const DragDropProvider = DragDropContext.Provider;
export default DragDropContext;