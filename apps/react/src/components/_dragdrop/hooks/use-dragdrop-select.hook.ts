
import { DndActionType, DndContextValue } from "../types";
//import { useClickOutside } from "../../../hooks";

export function useDragDropSelect(id: number | string | undefined, ctx: DndContextValue) {
  const { state, dispatch } = ctx;
  const { item, isSelecting, isEditing } = state || {};

  //console.log('CTX', ctx);

  const match = item?.id == id;
  const isSelect = match ? isSelecting ?? false : false;
  const isEdit = match ? isEditing ?? false : false;

  const onClick = (name: keyof typeof DndActionType) => {
    switch (name) {
      case DndActionType.OPEN_EDITING_ITEM:
        !isEditing && dispatch({
          type: name,
          payload: null
        });
        break;
      case DndActionType.CLOSE_EDITING_ITEM:
        dispatch({
          type: name,
          payload: null
        });
        break;
      default:
    }
  }

  return {
    isSelect,
    isEdit,
    onClick
  }
}