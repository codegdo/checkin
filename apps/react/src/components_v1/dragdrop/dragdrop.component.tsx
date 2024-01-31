import { PropsWithChildren } from "react";

import { DragDropContext } from "./contexts";
import { DndField, DndResult } from "./types";
import { DndOptions, useDragDropState } from "./hooks";
import { DragDropContent } from "./dragdrop.content";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import { HTML5Backend } from "react-dnd-html5-backend";

interface IProps extends PropsWithChildren {
  title?: string;
  data?: DndField[];
  options?: DndOptions;
  status?: string;
  onSubmit?: (result: DndResult) => void;
}

export function DragDrop({ data, options, status, children, onSubmit }: IProps) {
  const backend = ('ontouchstart' in window) ? TouchBackend : HTML5Backend;
  const contextValue = useDragDropState({ data, options, status, callback: onSubmit });

  return (
    <div className="dragdrop">
      <DndProvider backend={backend}>
        <DragDropContext.Provider value={contextValue}>
          {children || <DragDropContent />}
        </DragDropContext.Provider>
      </DndProvider>
    </div>
  );
}

// npx madge src/components_v1/dragdrop/dragdrop.component.tsx --image src/components_v1/dragdrop/dragdrop.graph.png --warning