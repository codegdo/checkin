import React, { Dispatch } from "react";
import { SortableAction } from "./reducers";
import { Field } from "./types";

type DropItem = Partial<Field> | null;
type ElementList = Record<string, HTMLDivElement | null>;

export interface SortableState {
  data: Field[]
}

export interface DndRef {
  dropItem: DropItem;
  elements: ElementList;
  parentNode: Node["parentNode"] | null;
  dropElement: HTMLElement | null;
  touched: Record<string, number>;
  nested: (number | string)[];
  offset: string | null;
  direction: string | null;
  cordinate: { x: number, y: number };
  translate: { x: number, y: number };
  canDrop: boolean;
  hasChild: boolean;
  isTransitioning: boolean;
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
  dropElement: null,
  touched: {},
  nested: [],
  offset: null,
  direction: null,
  cordinate: { x: 0, y: 0 },
  translate: { x: 0, y: 0 },
  canDrop: true,
  hasChild: true,
  isTransitioning: false
}

const SortableContext = React.createContext<SortableContextValue>({
  state: defaultState,
  dispatch: () => console.log('dispatch'),
  dnd: dndRef,
});

export const SortableProvider = SortableContext.Provider;
export default SortableContext;