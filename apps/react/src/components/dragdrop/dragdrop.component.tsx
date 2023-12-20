import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import { HTML5Backend } from "react-dnd-html5-backend";

import { useHistory, useDragDropState } from "./hooks";
import { Field } from "./types";

import { DragDropProvider } from "./dragdrop.provider";
import DropRender from "./drop.render";
import DragDropToolbar from "./dragdrop.toolbar";
import DragDropPreview from "./dragdrop.preview";
import DragRender, { DragElementType } from "./drag.render";
import { DragDropEditor } from "./dragdrop.editor";

interface Option {
  trackingId?: number | string;
  trackingVersion?: number;
}

interface IProps {
  data?: Field[];
  dragData?: Field[];
  dragElements?: DragElementType[];
  option?: Option;
}

export function DragDrop({ data = [], dragData = [], dragElements = [], option = {} }: IProps) {
  const backend = ('ontouchstart' in window) ? TouchBackend : HTML5Backend;
  const dragDropState = useDragDropState(data);

  useHistory({
    trackingId: option.trackingId,
    trackingVersion: option.trackingVersion,
    dispatch: dragDropState.dispatch
  });

  return (
    <div className="dragdrop">
      <DndProvider backend={backend}>
        <DragDropProvider value={{ ...dragDropState }}>
          <DropRender />
          <DragRender dragData={dragData} dragElements={dragElements} />

          <DragDropToolbar />
          <DragDropPreview />
          <DragDropEditor />
        </DragDropProvider>
      </DndProvider>
    </div>
  );
}

// npx madge src/components/dragdrop/dragdrop.component.tsx --image src/components/dragdrop/dragdrop.graph.png --warning
