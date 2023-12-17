import { useEffect, useReducer, useRef } from "react";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import { HTML5Backend } from "react-dnd-html5-backend";

import { useHistory } from "./hooks";
import { Field } from "./types";

import { DragDropProvider } from "./dragdrop.provider";
import { defaultRef, defaultState } from "./default.value";
import DropRender from "./drop.render";
import DragDropToolbar from "./dragdrop.toolbar";
import DragPreview from "./drag.preview";
import DragRender, { DraggableElementType } from "./drag.render";
import { DragDropEditor } from "./dragdrop.editor";
import { dragdropReducer } from "./dragdrop.reducer";

interface Option {
  trackingId?: number | string;
  trackingVersion?: number;
}

interface IProps {
  data?: Field[];
  dragData?: Field[];
  dragElements?: DraggableElementType[];
  option?: Option;
}

export function DragDrop({ data = [], dragData = [], dragElements = [], option = {} }: IProps) {
  const backend = ('ontouchstart' in window) ? TouchBackend : HTML5Backend;
  const ref = useRef(defaultRef);
  const [state, dispatch] = useReducer(dragdropReducer, { ...defaultState, currentData: data, dataSource: structuredClone(data) });

  useHistory({
    trackingId: option.trackingId,
    trackingVersion: option.trackingVersion,
    dispatch
  });

  useEffect(() => {
    // Resetting the ref when component unmounts
    return () => {
      ref.current = {...defaultRef, elementRef: {}};
    };
  }, []);

  return (
    <DndProvider backend={backend}>
      <DragDropProvider value={{ current: ref.current, state, dispatch }}>
        <DragDropToolbar />
        <DropRender />
        <DragRender dragData={dragData} dragElements={dragElements} />
        <DragPreview />
        <DragDropEditor />
      </DragDropProvider>
    </DndProvider>
  );
}

// npx madge src/components/dragdrop/dragdrop.component.tsx --image src/components/dragdrop/dragdrop.graph.png --warning
