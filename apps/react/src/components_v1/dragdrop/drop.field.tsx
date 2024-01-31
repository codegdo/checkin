import { useEffect } from "react";
import { ContextValue } from "./contexts";
import { useDragDrop } from "./hooks";
import { DndField, DragType } from "./types";
import { Field } from "../field";

interface IProps extends DndField {
  context: ContextValue;
}

export function DropField({ context, ...props }: IProps) {
  const { dndRef, drag, drop } = useDragDrop({ dragType: DragType.FIELD, item: props, context });

  useEffect(() => {
    drag(drop(dndRef));
  }, [dndRef]);

  return (
    <div
      ref={dndRef}
    >
      <Field {...props} />
    </div>
  );
}