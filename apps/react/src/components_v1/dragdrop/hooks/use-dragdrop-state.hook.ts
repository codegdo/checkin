import { useReducer, useRef } from "react";

import { DndField, DndResult } from "../types";
import { dragdropReducer } from "../reducers";

export interface DndOptions {
  version?: {
    id: number | string;
    timestamp: string;
  }
}

interface IProps {
  data?: DndField[];
  drags?: {
    elements: DndField[],
    fields: DndField[]
  },
  options?: DndOptions;
  status?: string;
  callback?: (result: DndResult) => void
}

export const useDragDropState = ({ data = [], options = {}, status, callback }: IProps) => {
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
    options,
    ref: ref.current,
    status,
    state,
    dispatch,
    onCallback
  }
}