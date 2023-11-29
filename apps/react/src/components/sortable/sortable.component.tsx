import { useReducer, useRef } from "react";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import { HTML5Backend } from "react-dnd-html5-backend";

import { sortableReducer } from "./reducers";
import { SortableField } from "./types";

import { SortableProvider } from "./sortable.provider";
import { defaultRef, defaultState } from "./default.value";
import SortableRender from "./sortable.render";


interface SortableProps {
  data?: SortableField[];
  dragFields?: SortableField[];
}

export function Sortable({ data = [] }: SortableProps) {
  const backend = ('ontouchstart' in window) ? TouchBackend : HTML5Backend;
  const { current: currentRef } = useRef(defaultRef);
  const [state, dispatch] = useReducer(sortableReducer, { ...defaultState, data });

  return (
    <DndProvider backend={backend}>
      <SortableProvider value={{ current: currentRef, state, dispatch }}>
        <SortableRender />
      </SortableProvider>
    </DndProvider>
  );
}

// npx madge src/components/sortable/sortable.component.tsx --image src/components/sortable/sortable.graph.png --warning