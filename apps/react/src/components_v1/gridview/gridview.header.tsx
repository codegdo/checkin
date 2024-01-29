import { ContextValue } from "./contexts";
import { ActionType } from "./types";

interface IProps {
  context: ContextValue
}


export function GridViewHeader({ context }: IProps) {
  const { onClick } = context;

  const handleAdd = () => {
    onClick && onClick(ActionType.ADD_NEW_ROWS);
  };
  const handleEdit = () => { };

  return (
    <div>
      <button type="button" name="add" onClick={handleAdd}>Add</button>
      <input type="checkbox" name="edit" onClick={handleEdit} />
    </div>
  );
}