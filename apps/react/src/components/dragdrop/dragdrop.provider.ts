import React, { Dispatch } from "react";

import { CurrentRef, State, getCurrentRef, getInitialState } from "./default.value";
import { Action } from "./dragdrop.reducer";

interface ContextValue {
  current: CurrentRef;
  state: State;
  dispatch: Dispatch<Action>;
}

const currentRef = getCurrentRef();
const initialState = getInitialState();

const DragDropContext = React.createContext<ContextValue>({
  current: currentRef,
  state: initialState,
  dispatch: () => console.log('dispatch'),
});

export const DragDropProvider = DragDropContext.Provider;
export default DragDropContext;