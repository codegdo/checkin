import React, { Dispatch } from "react";

import { defaultRef, defaultState } from "./default.value";

import { SortableField, SortableState } from "./types";
import { SortableAction } from "./reducers";

interface SortCurrent {
  drop: Partial<SortableField> | null;
  elements: Record<string, HTMLDivElement | null>;
  cordinate: {
    x: number;
    y: number;
  }
  offset: string;
  canDrop: boolean;
}

export interface SortableContextValue {
  state: SortableState;
  dispatch: Dispatch<SortableAction>;
  current: SortCurrent;
}

const SortableContext = React.createContext<SortableContextValue>({
  state: defaultState,
  dispatch: () => console.log('dispatch'),
  current: defaultRef
});

export const SortableProvider = SortableContext.Provider;
export default SortableContext;