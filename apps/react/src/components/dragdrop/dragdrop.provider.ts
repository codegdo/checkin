import React from "react";

import { ContextValue } from "./types";
import { defaultRef, defaultState } from "./default.value";

const DragDropContext = React.createContext<ContextValue>({
  state: defaultState,
  dispatch: () => console.log('dispatch'),
  current: defaultRef
});

export const DragDropProvider = DragDropContext.Provider;
export default DragDropContext;