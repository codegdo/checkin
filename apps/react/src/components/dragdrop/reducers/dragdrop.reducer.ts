import { setSessionStorage } from "@/utils";
import { dndHelper } from "../helpers";
import { Field} from "../types";
import { CurrentRef } from "../hooks";

export enum ActionType {
  LOAD_HISTORY = 'LOAD_HISTORY',

  SELECT_ITEM = 'SELECT_ITEM',
  UNSELECT_ITEM = 'UNSELECT_ITEM',
  OPEN_EDITING = 'OPEN_EDITING',
  CLOSE_EDITING = 'CLOSE_EDITING',

  ADD_ITEM = 'ADD_ITEM',
  MOVE_ITEM = 'MOVE_ITEM',
  CLONE_ITEM = 'CLONE_ITEM',
  REMOVE_ITEM = 'REMOVE_ITEM',
  UPDATE_ITEM = 'UPDATE_ITEM',
  RESET_ITEM = 'RESET_ITEM',

  UNDO_STEP = 'UNDO_STEP',
  REDO_STEP = 'REDO_STEP',
}

export interface MoveItem {
  dragItem: Field;
  dropItem: Partial<Field> | null;
  offset: string;
}

export interface RemoveItem {
  removeItem: Partial<Field> | null | undefined
}

export interface LoadHistory {
  historyData: Field[][];
  historyIndex: number;
}

export type Payload = LoadHistory | MoveItem | RemoveItem;

export interface Action<T = Payload> {
  type: string | ActionType;
  payload?: T;
}

export interface State {
  dataValue: Field[];
  dataSource: Field[];

  historyData: Field[][];
  historyIndex: number;

  isEditing?: boolean;
  isSelecting?: boolean;
}

const initialState = {
  dataSource: [],
  dataValue: [],
  historyData: [],
  historyIndex: -1,
  isEditing: false,
  isSelecting: false,
};

const initialRef = (): CurrentRef => {
  return {
    dropItem: null,
    elementRef: {},
    selectedItem: null,
    dragging: {
      coordinate: { x: 0, y: 0 },
      offset: '',
      direction: '',
    },
    canDrop: true,
  };
};

const dndReducer = (state: State, { type, payload }: Action<Payload>) => {
  switch (type) {
    case ActionType.LOAD_HISTORY: {
      const { historyData, historyIndex } = payload as LoadHistory;

      const loadHistoryData = structuredClone(historyData[historyIndex]);

      // Update sessionStorage
      setSessionStorage({
        dnd_history_index: historyIndex,
      });

      return { ...state, dataValue: loadHistoryData, historyIndex, historyData };
    }
    case ActionType.ADD_ITEM: {
      const { dragItem, dropItem, offset } = payload as MoveItem;

      if (!dragItem || !dropItem) return state;

      if (!dragItem.id) {
        dragItem.id = dndHelper.generateNewId();
      }

      const newData = [...state.dataValue];

      const isMiddleOrBottom = offset === 'on-middle' || offset === 'on-bottom';

      dragItem.parentId = offset === 'on-middle' ? (dropItem.id === 'root-area' ? null : dropItem.id) : dropItem.parentId;

      let dropIndex = newData.findIndex(item => item.id === dropItem.id);

      if (isMiddleOrBottom) {
        dropIndex += dndHelper.getIds(dropItem).length;
      }

      newData.splice(dropIndex, 0, dragItem);

      // Update positions for newData
      newData.forEach((item, index) => {
        item.position = index;
      });

      const cloneData = structuredClone(newData)

      const newDataHistory = [
        ...state.historyData.slice(0, state.historyIndex + 1),
        cloneData,
      ];

      // Update currentIndex based on the number of existing history entries
      const historyIndex = state.historyIndex === -1 ? 0 : state.historyIndex + 1;

      // Update sessionStorage
      setSessionStorage({
        dnd_history_data: newDataHistory,
        dnd_history_index: historyIndex
      });

      return { ...state, dataValue: newData, historyData: newDataHistory, historyIndex };
    }
    case ActionType.MOVE_ITEM: {
      const { dragItem, dropItem, offset } = payload as MoveItem;

      if (!dragItem || !dropItem) return state;

      // Get ids
      const dragIds = dndHelper.getIds(dragItem);
      const dropIds = dndHelper.getIds(dropItem, dragItem?.id);

      const newData = [...state.dataValue];

      const dragIndex = newData.findIndex(item => item.id === dragItem.id);
      const draggedItems = newData.splice(dragIndex, dragIds.length);

      const remainingItems = [...newData];

      const isMiddleOrBottom = offset === 'on-middle' || offset === 'on-bottom';

      const [firstDraggedItem] = draggedItems;
      firstDraggedItem.parentId = offset === 'on-middle' ? dropItem.id : dropItem.parentId;

      let dropIndex = remainingItems.findIndex(item => item.id === dropItem.id);

      if (isMiddleOrBottom) {
        dropIndex += dropIds.length;
      }

      remainingItems.splice(dropIndex, 0, ...draggedItems);

      // Update positions for remainingItems
      remainingItems.forEach((item, index) => {
        item.position = index;
      });

      const cloneData = structuredClone(remainingItems);

      const newDataHistory = [
        ...state.historyData.slice(0, state.historyIndex + 1),
        cloneData,
      ];

      // Update currentIndex based on the number of existing history entries
      const historyIndex = state.historyIndex === -1 ? 0 : state.historyIndex + 1;

      // Update sessionStorage
      setSessionStorage({
        dnd_history_data: newDataHistory,
        dnd_history_index: historyIndex
      });

      return { ...state, dataValue: remainingItems, historyData: newDataHistory, historyIndex };
    }
    case ActionType.REMOVE_ITEM: {
      const { removeItem } = payload as RemoveItem;

      if (!removeItem) return state;

      const removeIds = dndHelper.getIds(removeItem);

      const newData = [...state.dataValue];

      const dragIndex = newData.findIndex(item => item.id == removeItem.id);
      newData.splice(dragIndex, removeIds.length);

      const remainingItems = [...newData];

      // Update positions for remainingItems
      remainingItems.forEach((item, index) => {
        item.position = index;
      });

      const cloneData = structuredClone(remainingItems);

      const newDataHistory = [
        ...state.historyData.slice(0, state.historyIndex + 1),
        cloneData,
      ];

      // Update currentIndex based on the number of existing history entries
      const historyIndex = state.historyIndex === -1 ? 0 : state.historyIndex + 1;

      // Update sessionStorage
      setSessionStorage({
        dnd_history_data: newDataHistory,
        dnd_history_index: historyIndex
      });

      return { ...state, dataValue: remainingItems, historyData: newDataHistory, historyIndex };
    }
    case ActionType.SELECT_ITEM: {
      return {
        ...state,
        isSelecting: true,
        isEditing: false
      };
    }
    case ActionType.UNSELECT_ITEM: {
      return {
        ...state,
        isSelecting: false,
        isEditing: false
      };
    }
    case ActionType.OPEN_EDITING: {
      return { ...state, isEditing: true };
    }
    case ActionType.CLOSE_EDITING: {
      return {
        ...state,
        isSelecting: false,
        isEditing: false
      };
    }
    case ActionType.UNDO_STEP: {
      const { historyIndex, historyData } = state;

      if (historyIndex == -1) {
        return state;
      }

      if (historyIndex === 0 || historyData.length <= 1) {
        const initialData = structuredClone(state.dataSource);

        // Update sessionStorage
        setSessionStorage({
          dnd_history_index: -1
        });

        return { ...state, dataValue: initialData, historyIndex: -1 };
      }

      const previousData = structuredClone(historyData[historyIndex - 1]);

      // Update sessionStorage
      setSessionStorage({
        dnd_history_index: historyIndex - 1
      });

      return { ...state, dataValue: previousData, historyIndex: historyIndex - 1 };
    }
    case ActionType.REDO_STEP: {
      const { historyIndex, historyData } = state;

      if (historyIndex === historyData.length - 1 || historyData.length === 0) return state;

      const nextData = structuredClone(historyData[historyIndex + 1]);

      // Update sessionStorage
      setSessionStorage({
        dnd_history_index: historyIndex + 1
      });

      return { ...state, dataValue: nextData, historyIndex: historyIndex + 1 };
    }
    default:
      return state;
  }
};

export { initialState, initialRef, dndReducer }
