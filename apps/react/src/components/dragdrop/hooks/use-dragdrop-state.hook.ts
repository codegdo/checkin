import { useReducer, useRef } from 'react';
import { Field, KeyValue } from "../types";
import { initialState, initialRef, dndReducer } from '../reducers';

interface CallbackEvent {
  onChange?: (keyValue: KeyValue) => void;
  onClick?: (keyValue: KeyValue) => void;
}

export interface CurrentRef {
  dropItem: Partial<Field> | null;
  selectedItem: { item?: Field, target?: Element, callback?: CallbackEvent } | null;
  elementRef: Record<string, HTMLDivElement | null>;
  dragging: {
    coordinate: {
      x: number;
      y: number;
    };
    offset: string;
    direction: string;

  };
  canDrop: boolean;
}

export const useDragDropState = (data: Field[]) => {

  const ref = useRef<CurrentRef>(initialRef());
  const [state, dispatch] = useReducer(dndReducer, { ...initialState, dataValue: data, dataSource: structuredClone(data) });

  return {
    current: ref.current,
    state,
    dispatch
  };
};
