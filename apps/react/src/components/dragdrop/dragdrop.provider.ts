import React from "react";
import { ContextValue } from "./types";
import { initialRef, initialState } from "./reducers";
import { useWrapperContext } from "@/hooks";

const DragDropContext = React.createContext<ContextValue>({
  current: initialRef(),
  state: initialState,
  dispatch: () => console.log('dispatch'),
  props: { data: [] }
});

export const useDragDropContext = () => {
  const context = useWrapperContext(DragDropContext);
  return context;
}

export const DragDropProvider = DragDropContext.Provider;
