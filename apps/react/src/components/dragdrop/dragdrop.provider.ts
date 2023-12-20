import React from "react";

import { getInitialRef, initialState } from "./reducers";
import { ContextValue } from "./types";

const DragDropContext = React.createContext<ContextValue>({
  current: getInitialRef(),
  state: initialState,
  dispatch: () => console.log('dispatch'),
});

export const DragDropProvider = DragDropContext.Provider;
export default DragDropContext;