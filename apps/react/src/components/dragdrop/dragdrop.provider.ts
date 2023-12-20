import React from "react";
import { ContextValue } from "./types";
import { initialRef, initialState } from "./reducers";

const DragDropContext = React.createContext<ContextValue>({
  current: initialRef(),
  state: initialState,
  dispatch: () => console.log('dispatch'),
});

export const DragDropProvider = DragDropContext.Provider;
export default DragDropContext;