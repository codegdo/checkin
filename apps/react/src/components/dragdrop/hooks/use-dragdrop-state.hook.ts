import { useReducer, useRef } from 'react';
import { Ref, Field } from '../types';
import { initialState, initialRef, dndReducer } from '../reducers';
import { useHistory } from './use-history.hook';

interface Options {
  historyId?: number | string;
  historyVersion?: number | string;
}

export interface IDragDropProps {
  data: Field[];
  drags?: {
    elements?: string[] | Field[],
    fields?: Field[]
  };
  options?: Options;
}

export const useDragDropState = ({ data = [], drags = {}, options = {} }: IDragDropProps) => {
  const ref = useRef<Ref>(initialRef());
  const [state, dispatch] = useReducer(dndReducer, {
    ...initialState,
    data: structuredClone(data)
  });

  useHistory({
    historyId: options?.historyId,
    historyVersion: options?.historyVersion,
    dispatch,
  });

  return {
    props: { data, drags, options },
    current: ref.current,
    state,
    dispatch
  };
};
