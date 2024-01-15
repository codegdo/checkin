import { ContextValue } from "./contexts";
import { DndField } from "./types";

interface IProps extends DndField {
  context: ContextValue;
};

export function DropGroup({context, ...group}: IProps) {

  return <div>
    {
      group.data?.map(field => {
        return <div key={field.name}>{field.name}</div>
      })
    }
  </div>
}