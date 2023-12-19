import React, { Dispatch } from "react";


import { CurrentRef, State, currentRef, defaultState } from "./default.value";
import { Action } from "./dragdrop.reducer";

interface ContextValue {
  current: CurrentRef;
  state: State;
  dispatch: Dispatch<Action>;
}

const DragDropContext = React.createContext<ContextValue>({
  state: defaultState,
  dispatch: () => console.log('dispatch'),
  current: currentRef
});

export const DragDropProvider = DragDropContext.Provider;
export default DragDropContext;