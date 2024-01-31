import { ContextValue } from "./contexts";
import { DndField } from "./types";

interface IProps extends DndField {
  context: ContextValue;
}

export function DragElement({ context, ...element }: IProps) {

  return (
    <div>dragelement</div>
  );
}