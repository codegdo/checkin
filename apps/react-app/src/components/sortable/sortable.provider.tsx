import React, { Dispatch } from "react";
import { SortableAction } from "./reducers";
import { Field } from "./types";

type DropRef = Partial<Field> | null;
type DomRef = Record<string, HTMLDivElement | null>;

export interface SortableState {
  data: Field[]
}

export interface SortableRef {
  drop: DropRef;
  doms: DomRef;
  parentNode: Node["parentNode"] | null;
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
  ref: SortableRef;
}

export const defaultState = {
  data: []
}

export const defaultRef = {
  drop: null,
  doms: {},
  parentNode: null,
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
  ref: defaultRef,
});

export const SortableProvider = SortableContext.Provider;
export default SortableContext;