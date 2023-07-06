import React, { Dispatch } from "react";
import { SortableAction } from "./reducers";
import { Field } from "./types";

type DropRef = Partial<Field> | null;
type DomRef = Record<string, HTMLDivElement | null>;

export interface SortableState {
  data: Field[]
}

interface SortableRef {
  drop: DropRef;
  doms: DomRef;
  touched: (number | string)[];
  nested: (number | string)[];
  offset: string | null;
  cordinate: { x: number, y: number };
  translate: { x: number, y: number };
  canDrop: boolean;
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
  touched: [],
  nested: [],
  offset: null,
  cordinate: { x: 0, y: 0 },
  translate: { x: 0, y: 0 },
  canDrop: true,
  isTransitioning: false
}

const SortableContext = React.createContext<SortableContextValue>({
  state: defaultState,
  dispatch: () => console.log('dispatch'),
  ref: defaultRef,
});

export const SortableProvider = SortableContext.Provider;
export default SortableContext;