
import { ActionType } from "../reducers";
import { ContextValue, Field } from "../types";

export function useOnClick(context: ContextValue, item: Field) {
  const { state, dispatch } = context;
  const { selectedItem, isSelecting, isEditing } = state || {};

  const match = selectedItem?.id == item.id;
  const onSelecting = match ? isSelecting ?? false : false;
  const onEditing = match ? isEditing ?? false : false;

  const handleClick = (name: keyof typeof ActionType) => {
    switch (name) {
      case ActionType.OPEN_EDITING_ITEM:
        !isEditing && dispatch({ type: name });
        break;
      case ActionType.CLOSE_EDITING_ITEM:
        dispatch({ type: name });
        break;
      default:
    }
  }

  return {
    isSelecting: onSelecting,
    isEditing: onEditing,
    handleClick
  }
}