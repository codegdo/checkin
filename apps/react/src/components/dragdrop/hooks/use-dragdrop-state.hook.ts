import { useReducer, useRef } from 'react';
import { CurrentRef, Field } from '../types';
import { initialState, initialRef, dndReducer } from '../reducers';
import { useHistory } from './use-history.hook';

interface Options {
  historyId?: number | string;
  historyVersion?: number | string;
}

export interface IDragDropProps {
  dropData: Field[];
  dragData?: Field[];
  drags?: string[] | Field[];
  options?: Options;
}

export const useDragDropState = ({ dropData = [], dragData, drags, options = {} }: IDragDropProps) => {
  const ref = useRef<CurrentRef>(initialRef());
  const [state, dispatch] = useReducer(dndReducer, {
    ...initialState,
    data: structuredClone(dropData)
  });

  useHistory({
    historyId: options?.historyId,
    historyVersion: options?.historyVersion,
    dispatch,
  });

  return {
    props: {
      dropData,
      dragData,
      drags,
      options
    },
    current: ref.current,
    state,
    dispatch
  };
};
