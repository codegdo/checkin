import { ContextValue } from "./contexts";
import { DndField } from "./types";

interface IProps extends DndField {
  context: ContextValue;
};

export function DropGrid({context, ...grid}: IProps) {

  return <div>
    {
      grid.data?.map(field => {
        return <div key={field.name}>{field.name}</div>
      })
    }
  </div>
}