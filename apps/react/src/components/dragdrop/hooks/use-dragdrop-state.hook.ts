import { useReducer, useRef } from 'react';
import { CurrentRef, Field } from "../types";
import { initialState, initialRef, dndReducer } from '../reducers';

export const useDragDropState = (data: Field[]) => {

  const ref = useRef<CurrentRef>(initialRef());
  const [state, dispatch] = useReducer(dndReducer, { ...initialState, dataValue: data, dataSource: structuredClone(data) });

  return {
    current: ref.current,
    state,
    dispatch
  };
};
