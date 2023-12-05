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
  RESET_ITEM = 'RESET_ITEM',

  UNDO_STEP = 'UNDO_STEP',
  REDO_STEP = 'REDO_STEP',
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

      if (!dragItem || !dropItem) return state;

      // Get ids
      const { dragIds } = dndHelper.getIds(dragItem, dropItem);

      const newData = [...state.data];

      const dragIndex = newData.findIndex(item => item.id === dragItem.id);
      const draggedItems = newData.splice(dragIndex, dragIds.length);

      const remainingItems = [...newData];

      const onMiddle = offset === 'on-middle';
      const onBottom = offset === 'on-bottom';

      const [firstDraggedItem] = draggedItems;
      firstDraggedItem.parentId = onMiddle ? dropItem.id : dropItem.parentId;

      let dropIndex = remainingItems.findIndex(item => item.id === dropItem.id);

      if (onMiddle || onBottom) {
        dropIndex += 1;
      }

      remainingItems.splice(dropIndex, 0, ...draggedItems);

      // Update positions for remainingItems
      remainingItems.forEach((item, index) => {
        item.position = index;
      });

      const cloneData = structuredClone(remainingItems)

      const newHistory = [
        ...state.history.slice(0, state.currentIndex + 1),
        cloneData,
      ];

      return { ...state, data: remainingItems, history: newHistory, currentIndex: state.currentIndex + 1 };
    }
    case ActionType.UNDO_STEP: {
      const { currentIndex, history } = state;

      if (currentIndex === 0 || history.length === 0) return state;

      const previousData = history[currentIndex - 1];

      return { ...state, data: previousData, currentIndex: currentIndex - 1 };
    }
    case ActionType.REDO_STEP: {
      const { currentIndex, history } = state;

      if (currentIndex === history.length - 1 || history.length === 0) return state;

      const nextData = history[currentIndex + 1];

      return { ...state, data: nextData, currentIndex: currentIndex + 1 };
    }
    default:
      return state;
  }
};
