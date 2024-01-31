import { useEffect } from "react";
import { ContextValue } from "./contexts";
import { useDragDrop } from "./hooks";
import { DndField, DragType } from "./types";
import { Table } from "../table";

interface IProps extends DndField {
  context: ContextValue;
}

export function DropGrid({ context, ...grid }: IProps) {
  const { dndRef, drag, drop } = useDragDrop({ dragType: DragType.FIELD, item: grid, context });

  useEffect(() => {
    drag(drop(dndRef));
  }, [dndRef]);

  return (
    <div
      ref={dndRef}
    >
      {
        <Table columns={grid.data} />
      }
    </div>
  );
}