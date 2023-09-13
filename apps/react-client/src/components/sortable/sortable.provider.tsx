import React, { Dispatch } from "react";

import { SortableAction } from "./reducers";
import { SortableField } from "./types";

type ElementList = Record<string, HTMLDivElement | null>;

export interface SortableState {
  data: SortableField[]
}

export interface DndRef {
  dropItem: SortableField | null;
  elements: ElementList;
  parentNode: Node["parentNode"] | null;

  offset: string | null;
  direction: string | null;

  cordinate: { x: number, y: number };
  canDrop: boolean;
}

export interface SortableContextValue {
  state: SortableState;
  dispatch: Dispatch<SortableAction>;
  dnd: DndRef;
}

export const defaultState = {
  data: []
}

export const dndRef = {
  dropItem: null,
  elements: {},
  parentNode: null,
  offset: null,
  direction: null,
  cordinate: { x: 0, y: 0 },
  canDrop: true
}

const SortableContext = React.createContext<SortableContextValue>({
  state: defaultState,
  dispatch: () => console.log('dispatch'),
  dnd: dndRef,
});

export const SortableProvider = SortableContext.Provider;
export default SortableContext;