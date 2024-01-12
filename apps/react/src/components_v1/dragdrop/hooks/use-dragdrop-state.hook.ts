import { useReducer, useRef } from "react";

import { CustomField, DragDropReturn } from "../types";
import { dragdropReducer } from "../reducers";

export interface DragDropStateProps {
  data?: CustomField[];
  status?: string;
  callback?: (returnData: DragDropReturn) => void
}

export const useDragDropState = ({ data = [], status, callback }: DragDropStateProps) => {
  const ref = useRef({});
  const [state, dispatch] = useReducer(dragdropReducer, {data});

  const onCallback = (type: string) => {
    callback && callback({
      type,
      data: state
    });
  }

  return {
    status,
    state,
    dispatch,
    onCallback
  }
}