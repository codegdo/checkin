import { dndHelper } from "../helpers";
import { CurrentRef, Field, State } from "../types";

export enum ActionType {
  LOAD_HISTORY = 'LOAD_HISTORY',
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
  payload?: T;
}

export const dragdropReducer = (state: State, { type, payload }: Action<Payload>) => {
  switch (type) {
    case ActionType.MOVE_ITEM: {
      const { dragItem, context: { dropItem, offset } } = payload as MoveItem;

      if (!dragItem || !dropItem) return state;

      // Get ids
      const { dragIds } = dndHelper.getIds(dragItem, dropItem);

      const newData = [...state.currentData];

      const dragIndex = newData.findIndex(item => item.id === dragItem.id);
      const draggedItems = newData.splice(dragIndex, dragIds.length);

      const remainingItems = [...newData];

      const isMiddleOrBottom = offset === 'on-middle' || offset === 'on-bottom';

      const [firstDraggedItem] = draggedItems;
      firstDraggedItem.parentId = offset === 'on-middle' ? dropItem.id : dropItem.parentId;

      let dropIndex = remainingItems.findIndex(item => item.id === dropItem.id);

      if (isMiddleOrBottom) {
        dropIndex += 1;
      }

      remainingItems.splice(dropIndex, 0, ...draggedItems);

      // Update positions for remainingItems
      remainingItems.forEach((item, index) => {
        item.position = index;
      });

      const cloneData = structuredClone(remainingItems)

      const newDataHistory = [
        ...state.dataHistory.slice(0, state.historyIndex + 1),
        cloneData,
      ];

      // Update currentIndex based on the number of existing history entries
      const historyIndex = state.historyIndex === -1 ? 0 : state.historyIndex + 1;

      // Update sessionStorage

      return { ...state, currentData: remainingItems, dataHistory: newDataHistory, historyIndex };
    }
    case ActionType.UNDO_STEP: {
      const { historyIndex, dataHistory } = state;

      if (historyIndex == -1) {
        return state;
      }

      if (historyIndex === 0 || dataHistory.length <= 1) {
        const initialData = structuredClone(state.dataSource);
        return { ...state, currentData: initialData, historyIndex: -1 };
      }

      const previousData = structuredClone(dataHistory[historyIndex - 1]);

      return { ...state, currentData: previousData, historyIndex: historyIndex - 1 };
    }
    case ActionType.REDO_STEP: {
      const { historyIndex, dataHistory } = state;

      if (historyIndex === dataHistory.length - 1 || dataHistory.length === 0) return state;

      const nextData = structuredClone(dataHistory[historyIndex + 1]);

      return { ...state, currentData: nextData, historyIndex: historyIndex + 1 };
    }
    default:
      return state;
  }
};
