import React from "react";

import { defaultRef, defaultState } from "./default.value";
import { ContextValue } from "./types";

const SortableContext = React.createContext<ContextValue>({
  state: defaultState,
  dispatch: () => console.log('dispatch'),
  current: defaultRef
});

export const SortableProvider = SortableContext.Provider;
export default SortableContext;