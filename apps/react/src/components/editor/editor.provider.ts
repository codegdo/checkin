import React, { Dispatch } from "react";
import { Action, State } from "./types";
import { defaultState } from "./default.value";

interface ContextValue {
  state: State;
  dispatch: Dispatch<Action>;
}

const EditorContext = React.createContext<ContextValue>({
  state: defaultState,
  dispatch: () => console.log('dispatch'),
});

export const EditorProvider = EditorContext.Provider;
export default EditorContext;