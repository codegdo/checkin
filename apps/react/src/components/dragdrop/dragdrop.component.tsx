import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import { HTML5Backend } from "react-dnd-html5-backend";

import { useHistory, useDragDropState } from "./hooks";
import { Field } from "./types";

import { DragDropProvider } from "./dragdrop.provider";

import DragDropToolbar from "./dragdrop.toolbar";
import DragDropPreview from "./dragdrop.preview";
import DragDropMain from "./dragdrop.main";
import DragDropEditor from "./dragdrop.editor";


interface Option {
  historyId?: number | string;
  historyVersion?: number | string;
}

interface IProps {
  dropData?: Field[];
  dragData?: Field[];
  drags?: string[] | Field[];
  option?: Option;
}

export function DragDrop({ dropData = [], dragData = [], drags = [], option = {} }: IProps) {
  const backend = ('ontouchstart' in window) ? TouchBackend : HTML5Backend;
  const dragDropState = useDragDropState({dropData});

  useHistory({
    historyId: option.historyId,
    historyVersion: option.historyVersion,
    dispatch: dragDropState.dispatch
  });

  return (
    <div className="dragdrop">
      <DndProvider backend={backend}>
        <DragDropProvider value={{ ...dragDropState }}>
          <DragDropMain />
          <DragDropToolbar />
          <DragDropPreview />
          <DragDropEditor />
        </DragDropProvider>
      </DndProvider>
    </div>
  );
}

// npx madge src/components/dragdrop/dragdrop.component.tsx --image src/components/dragdrop/dragdrop.graph.png --warning
