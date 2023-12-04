import { dndHelper } from "../helpers";
import { ContextValue, CurrentRef, Field, State } from "../types";

export enum ActionType {
  SELECT_ITEM = 'SELECT_ITEM',
  UNSELECT_ITEM = 'UNSELECT_ITEM',
  OPEN_EDITING_ITEM = 'OPEN_EDITING_ITEM',
  CLOSE_EDITING_ITEM = 'CLOSE_EDITING_ITEM',

  ADD_ITEM = 'ADD_ITEM',
  MOVE_ITEM = 'MOVE_ITEM',
  CLONE_ITEM = 'CLONE_ITEM',
  REMOVE_ITEM = 'REMOVE_ITEM',
  UPDATE_ITEM = 'UPDATE_ITEM',
  RESET_ITEM = 'UPDATE_RESET',
}

interface MoveItem {
  dragItem: Field;
  context: CurrentRef
}

type Payload = MoveItem;

export interface Action<T = Payload> {
  type: string | ActionType;
  payload: T;
}

export const dragdropReducer = (state: State, { type, payload }: Action<Payload>) => {
  switch (type) {
    case ActionType.MOVE_ITEM: {
      const { dragItem, context: { dropItem, offset } } = payload;

      if (!dragItem && !dropItem) return state;

      // Get ids
      const { dragIds, dropIds } = dndHelper.getIds(dragItem, dropItem);

      const data = [...state.data];
      const draggedItems = data.splice(dragItem?.position ?? 0, dragIds.length);
      const remainingItems = data;

      const [firstDraggedItem] = draggedItems;
      firstDraggedItem.parentId = offset === 'on-middle' ? dropItem?.id : dropItem?.parentId;

      //console.log(draggedItems, remainingItems);

      remainingItems.splice(dropItem?.position ?? 0, 0, ...draggedItems);
      remainingItems.forEach((item, index) => {
        item.position = index;
      });

      console.log(remainingItems);

      return { ...state, data: remainingItems };
    }
    default:
      return state;
  }
}