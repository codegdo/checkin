import React, { Dispatch } from "react";
import { currentRef, defaultState } from "./default.value";
import { Action, State } from "./editor.reducer";
import { KeyValue } from "./types";


interface CurrentRef {
  onChange?: ((keyValue: KeyValue) => void) | null;
}

interface ContextValue {
  current: CurrentRef
  state: State;
  dispatch: Dispatch<Action>;
}

const EditorContext = React.createContext<ContextValue>({
  current: currentRef,
  state: defaultState,
  dispatch: () => console.log('dispatch'),
});

export const EditorProvider = EditorContext.Provider;
export default EditorContext;