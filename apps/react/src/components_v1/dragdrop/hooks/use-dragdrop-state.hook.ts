import { useReducer, useRef } from "react";

import { DndField, DndResult } from "../types";
import { dragdropReducer } from "../reducers";

export interface DndOptions {
  version?: {
    id: number | string;
    timestamp: string;
  }
}

interface DndProps {
  data?: DndField[];
  drags?: {
    elements: DndField[],
    fields: DndField[]
  },
  options?: DndOptions;
  status?: string;
  callback?: (result: DndResult) => void
}

export interface DndRef {
  dropItem: DndField | null;
  coordinate: { x: number, y: number };
  direction: string | null;
  offset: string | null;
}

export const useDragDropState = ({ data = [], options = {}, status, callback }: DndProps) => {
  const ref = useRef<DndRef>({
    dropItem: null,
    coordinate: { x: 0, y: 0 },
    direction: null,
    offset: null
  });

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