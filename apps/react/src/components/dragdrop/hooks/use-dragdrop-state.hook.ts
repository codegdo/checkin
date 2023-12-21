import { useReducer, useRef } from 'react';
import { CurrentRef, Field } from "../types";
import { initialState, initialRef, dndReducer } from '../reducers';

interface IProps {
  dropData: Field[]
}

export const useDragDropState = ({dropData}:IProps) => {

  const ref = useRef<CurrentRef>(initialRef());
  const [state, dispatch] = useReducer(dndReducer, { ...initialState, dataValue: dropData, dataSource: structuredClone(dropData) });

  return {
    current: ref.current,
    state,
    dispatch
  };
};
