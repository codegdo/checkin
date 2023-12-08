
import { ActionType } from "../reducers";
import { ContextValue, Field } from "../types";

export function useSelect(context: ContextValue, item: Field) {
  const { state, dispatch } = context;
  const { selectedItem, isSelecting, isEditing } = state || {};

  const match = selectedItem?.id == item.id;
  const currentSelecting = match ? isSelecting ?? false : false;
  const currentEditing = match ? isEditing ?? false : false;

  const onClick = (name: keyof typeof ActionType) => {
    switch (name) {
      case ActionType.OPEN_EDITING_ITEM:
        !isEditing && dispatch({type: name});
        break;
      case ActionType.CLOSE_EDITING_ITEM:
        dispatch({type: name});
        break;
      default:
    }
  }

  return {
    isSelecting: currentSelecting,
    isEditing: currentEditing,
    onClick
  }
}