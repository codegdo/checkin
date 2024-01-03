import React from "react";
import { ContextValue } from "./types";
import { initialRef, initialState } from "./reducers";
import { useWrapperContext } from "@/hooks";

const EditorContext = React.createContext<ContextValue>({
  current: initialRef(),
  state: initialState,
  dispatch: () => console.log('dispatch'),
  props: {},
  tabs: []
});

export const useEditorContext = () => {
  return useWrapperContext(EditorContext);
}

export const EditorProvider = EditorContext.Provider;
