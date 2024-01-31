import { ContextValue } from "./contexts";
import { DndField } from "./types";

interface IProps extends DndField {
  context: ContextValue;
}

export function DragField({ context, ...field }: IProps) {

  return (
    <div>dragfield</div>
  );
}