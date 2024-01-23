import { PropsWithChildren } from "react";

import { DragDropProvider } from "./contexts";
import { DndField, DndResult } from "./types";
import { DndOptions, useDragDropState } from "./hooks";
import { DragDropContent } from "./dragdrop.content";

interface IProps extends PropsWithChildren {
  title?: string;
  data?: DndField[];
  options?: DndOptions;
  status?: string;
  onSubmit?: (result: DndResult) => void;
}

export function DragDrop({ data, options, status, children, onSubmit }: IProps) {
  const contextValue = useDragDropState({ data, options, status, callback: onSubmit });

  return (
    <div className="dragdrop">
      <DragDropProvider value={contextValue}>
        {children || <DragDropContent />}
      </DragDropProvider>
    </div>
  );
}

// npx madge src/components_v1/dragdrop/dragdrop.component.tsx --image src/components_v1/dragdrop/dragdrop.graph.png --warning