import React, { Dispatch } from "react";
import { Action, CurrentRef, State, initialState, initialRef } from "./reducers";

export interface ContextValue {
  current: CurrentRef;
  state: State;
  dispatch: Dispatch<Action>;
}

const EditorContext = React.createContext<ContextValue>({
  current: initialRef(),
  state: initialState,
  dispatch: () => console.log('dispatch'),
});

export const EditorProvider = EditorContext.Provider;
export default EditorContext;