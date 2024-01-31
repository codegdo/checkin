import { useEffect } from "react";
import { Field } from "../field";
import { ContextValue } from "./contexts";
import { useDragDrop } from "./hooks";
import { DndField, DragType } from "./types";

interface IProps extends DndField {
  context: ContextValue;
}

export function DropGroup({ context, ...group }: IProps) {
  const { dndRef, drag, drop } = useDragDrop({ dragType: DragType.FIELD, item: group, context });

  useEffect(() => {
    drag(drop(dndRef));
  }, [dndRef]);

  return (
    <div
      ref={dndRef}
    >
      {
        group.data?.map(field => {
          return <Field key={field.id} {...field} />
        })
      }
    </div>
  );
}