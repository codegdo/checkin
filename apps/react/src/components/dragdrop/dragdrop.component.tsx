import { useReducer, useRef } from "react";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import { HTML5Backend } from "react-dnd-html5-backend";

import { ActionType, dragdropReducer } from "./reducers";
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

  const handleRedo = () => {
    dispatch({
      type: ActionType.REDO_STEP,
    });
  }

  const handleUndo = () => {
    dispatch({
      type: ActionType.UNDO_STEP,
    });
  }

  return (
    <DndProvider backend={backend}>
      <DragDropProvider value={{ current: currentRef, state, dispatch }}>
        <div>
          <button type="button" onClick={handleRedo}>redo</button>
          <button type="button" onClick={handleUndo}>undo</button>
        </div>
        <DropRender />
      </DragDropProvider>
    </DndProvider>
  );
}

// npx madge src/components/dragdrop/dragdrop.component.tsx --image src/components/dragdrop/dragdrop.graph.png --warning
