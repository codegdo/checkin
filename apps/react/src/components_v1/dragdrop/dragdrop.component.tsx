import { PropsWithChildren } from "react";

import { DragDropProvider } from "./contexts";
import { DndField, DndResult } from "./types";
import { useDragDropState } from "./hooks";
import { DropRender } from "./drop.render";

interface IDragDropProps extends PropsWithChildren {
  title?: string;
  data?: DndField[];
  dragData?: DndField[];
  status?: string;
  onSubmit?: (result: DndResult) => void;
}

export function DragDrop({ data, status, children, onSubmit }: IDragDropProps) {
  const contextValue = useDragDropState({ data, status, callback: onSubmit });

  return (
    <DragDropProvider value={contextValue}>
      {children || <DropRender />}
    </DragDropProvider>
  );
}

// npx madge src/components_v1/dragdrop/dragdrop.component.tsx --image src/components_v1/dragdrop/dragdrop.graph.png --warning