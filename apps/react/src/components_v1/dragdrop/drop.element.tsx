import { ContextValue } from "./contexts";
import { DndField } from "./types";

interface IProps extends DndField {
  context: ContextValue;
};

export function DropElement({context, ...element}: IProps) {

  return (
    <div>dropfield</div>
  );
}