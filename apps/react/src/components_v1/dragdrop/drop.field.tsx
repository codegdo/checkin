import { ContextValue } from "./contexts";
import { DndField } from "./types";

interface IProps extends DndField {
  context: ContextValue;
};

export function DropField({context, ...field}: IProps) {

  return (
    <div>dropfield</div>
  );
}