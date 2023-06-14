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
  drop: {},
  dom: {},
};

const dispatch: DndContextValue['dispatch'] = () => {
  // Default implementation
};

const DragDropContext = React.createContext<DndContextValue>({
  state: initialState,
  dispatch,
  dnd: dndRef
});

export const DragDropProvider = DragDropContext.Provider;
export default DragDropContext;