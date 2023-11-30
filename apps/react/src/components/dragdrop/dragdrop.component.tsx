import { useReducer, useRef } from "react";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import { HTML5Backend } from "react-dnd-html5-backend";

import { dragdropReducer } from "./reducers";
import { Field } from "./types";

import { DragDropProvider } from "./dragdrop.provider";
import { defaultRef, defaultState } from "./default.value";
import DropRender from "./drop.render";

interface IProps {
  data?: Field[];
  dragItems?: Field[];
}

export function DragDrop({ data = [] }: IProps) {
  const backend = ('ontouchstart' in window) ? TouchBackend : HTML5Backend;
  const { current: currentRef } = useRef(defaultRef);
  const [state, dispatch] = useReducer(dragdropReducer, { ...defaultState, data });

  return (
    <DndProvider backend={backend}>
      <DragDropProvider value={{ current: currentRef, state, dispatch }}>
        <DropRender />
      </DragDropProvider>
    </DndProvider>
  );
}

// npx madge src/components/dragdrop/dragdrop.component.tsx --image src/components/dragdrop/dragdrop.graph.png --warning
