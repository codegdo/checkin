
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
      case ActionType.OPEN_EDITING:
        !isEditing && dispatch({ type: name });
        break;
      case ActionType.CLOSE_EDITING:
        dispatch({ type: name });
        break;
      case ActionType.REMOVE_ITEM:
        delete context.current.elementRef[`${item.id}`];

        dispatch({
          type: name,
          payload: {
            removeItem: selectedItem
          }
        });
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