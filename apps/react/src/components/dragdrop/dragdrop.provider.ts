import React, { Dispatch } from "react";

import { defaultRef, defaultState } from "./default.value";
import { DndField, DndState } from "./types";
import { DragDropAction } from "./reducers";

interface DndCurrent {
  drop: Partial<DndField> | null;
  elements: Record<string, HTMLDivElement | null>;
  cordinate: {
    x: number;
    y: number;
  }
  offset: string;
  canDrop: boolean;
}

export interface DndContextValue {
  state: DndState;
  dispatch: Dispatch<DragDropAction>;
  current: DndCurrent;
}

const DragDropContext = React.createContext<DndContextValue>({
  state: defaultState,
  dispatch: () => console.log('dispatch'),
  current: defaultRef
});

export const DragDropProvider = DragDropContext.Provider;
export default DragDropContext;