import { useReducer, useRef } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";

import { SortableProvider, dndRef, defaultState } from "./sortable.provider";
import { sortableReducer } from "./reducers";
import SortableRender from "./sortable.render";
import { SortableField } from "./types";

interface SortableProps {
  data: SortableField[];
}

export function _Sortable({ data = [] }: SortableProps) {
  const backend = ('ontouchstart' in window) ? TouchBackend : HTML5Backend;
  const { current: dnd } = useRef(dndRef);
  const [state, dispatch] = useReducer(sortableReducer, { ...defaultState, data });

  return (
    <DndProvider backend={backend}>
      <SortableProvider value={{ state, dispatch, dnd }}>
        <SortableRender />
      </SortableProvider>
    </DndProvider>
  );
}
