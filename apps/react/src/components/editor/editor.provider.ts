import React, { Dispatch } from "react";
import { Action, State } from "./reducers";
import { CurrentRef } from "./hooks";

export interface ContextValue {
  current: CurrentRef | object;
  state: State | object;
  dispatch: Dispatch<Action>;
}

const EditorContext = React.createContext<ContextValue>({
  current: {},
  state: {},
  dispatch: () => console.log('dispatch'),
});

export const EditorProvider = EditorContext.Provider;
export default EditorContext;