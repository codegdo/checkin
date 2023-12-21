import React from "react";
import { ContextValue } from "./types";
import { initialRef, initialState } from "./reducers";

const EditorContext = React.createContext<ContextValue>({
  current: initialRef(),
  state: initialState,
  dispatch: () => console.log('dispatch'),
  props: {}
});

export const EditorProvider = EditorContext.Provider;
export default EditorContext;