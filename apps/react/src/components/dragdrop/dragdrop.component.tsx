import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import { HTML5Backend } from "react-dnd-html5-backend";

import { useDragDropState, IDragDropProps } from "./hooks";
import { DragDropProvider } from "./dragdrop.provider";
import DragDropHeader from "./dragdrop-header";
import DragDropMain from "./dragdrop.main";
import DragDropEditor from "./dragdrop.editor";
import DragDropPreview from "./dragdrop.preview";

interface IProps extends IDragDropProps { }

export function DragDrop(props: IProps) {
  const backend = ('ontouchstart' in window) ? TouchBackend : HTML5Backend;
  const dragDropState = useDragDropState(props);

  return (
    <div className="dragdrop">
      <DndProvider backend={backend}>
        <DragDropProvider value={dragDropState}>
          <DragDropHeader />
          <DragDropMain />
          <DragDropPreview />
          <DragDropEditor />
        </DragDropProvider>
      </DndProvider>
    </div>
  );
}

// npx madge src/components/dragdrop/dragdrop.component.tsx --image src/components/dragdrop/dragdrop.graph.png --warning
