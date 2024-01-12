import { useReducer, useRef } from "react";

import { DndField, DndResult } from "../types";
import { dragdropReducer } from "../reducers";

interface IProps {
  data?: DndField[];
  status?: string;
  callback?: (result: DndResult) => void
}

export const useDragDropState = ({ data = [], status, callback }: IProps) => {
  const ref = useRef({ data });
  const [state, dispatch] = useReducer(dragdropReducer, {
    data: structuredClone(data),
    history: [JSON.stringify(data)],
    historyIndex: 0
  });

  const onCallback = (type: string) => {
    const result = {
      type,
      data: state
    };

    callback && callback(result);
  }

  return {
    ref: ref.current,
    status,
    state,
    dispatch,
    onCallback
  }
}