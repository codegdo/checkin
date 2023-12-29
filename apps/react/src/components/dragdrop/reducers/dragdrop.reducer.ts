import { setSessionStorage } from "@/utils";
import { dndHelper } from "../helpers";
import { Action, ActionType, Ref, LoadHistory, MoveItem, Payload, RemoveItem, State, UndoStep, UpdateItem } from "../types";

const initialState = {
  data: [],
  historyData: [],
  historyIndex: -1,
  isEditing: false,
  isSelecting: false,
  isUndoing: false,
};

const initialRef = (): Ref => {
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

      return {
        ...state,
        data: loadHistoryData,
        historyIndex, historyData,
        isUndoing: false
      };
    }
    case ActionType.ADD_ITEM: {
      const { dragItem, dropItem, offset } = payload as MoveItem;

      if (!dragItem || !dropItem) return state;

      if (!dragItem.id) {
        dragItem.id = dndHelper.generateNewId();
      }

      const newData = [...state.data];

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

      return {
        ...state,
        data: newData,
        historyData: newDataHistory,
        historyIndex,
        isUndoing: false
      };
    }
    case ActionType.MOVE_ITEM: {
      const { dragItem, dropItem, offset } = payload as MoveItem;

      if (!dragItem || !dropItem) return state;

      // Get ids
      const dragIds = dndHelper.getIds(dragItem);
      const dropIds = dndHelper.getIds(dropItem, dragItem?.id);

      const newData = [...state.data];

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

      return {
        ...state,
        data: remainingItems,
        historyData: newDataHistory,
        historyIndex,
        isEditing: false,
        isSelecting: false,
        isUndoing: false
      };
    }
    case ActionType.REMOVE_ITEM: {
      const { removeItem } = payload as RemoveItem;

      if (!removeItem) return state;

      const removeIds = dndHelper.getIds(removeItem);

      const newData = [...state.data];

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

      return {
        ...state,
        data: remainingItems,
        historyData: newDataHistory,
        historyIndex,
        isEditing: false,
        isSelecting: false,
        isUndoing: false
      };
    }
    case ActionType.UPDATE_ITEM: {
      const { updatedItem } = payload as UpdateItem;

      if (!updatedItem) return state;

      const updatedItemId = updatedItem.id;
      const updatedData = state.data.map((item) => {
        if (item.id == updatedItemId) {
          return {
            ...item,
            ...updatedItem,
          };
        }
        return item;
      });

      console.log('UPDATE_ITEM', updatedItem, updatedData);

      const newDataHistory = [
        ...state.historyData.slice(0, state.historyIndex + 1),
        structuredClone(updatedData),
      ];

      // Update currentIndex based on the number of existing history entries
      const historyIndex = state.historyIndex === -1 ? 0 : state.historyIndex + 1;

      // Update sessionStorage
      setSessionStorage({
        dnd_history_data: newDataHistory,
        dnd_history_index: historyIndex,
      });

      return {
        ...state,
        data: updatedData,
        historyData: newDataHistory,
        historyIndex,
        isEditing: false,
        isSelecting: false,
        isUndoing: false
      };
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
      const { dataSource } = payload as UndoStep;

      if (historyIndex == -1) {
        return state;
      }

      if (historyIndex === 0 || historyData.length <= 1) {
        const initialData = structuredClone(dataSource);

        // Update sessionStorage
        setSessionStorage({
          dnd_history_index: -1
        });

        return {
          ...state,
          data: initialData,
          historyIndex: -1,
          isUndoing: true
        };
      }

      const previousData = structuredClone(historyData[historyIndex - 1]);

      // Update sessionStorage
      setSessionStorage({
        dnd_history_index: historyIndex - 1
      });

      return {
        ...state,
        data: previousData,
        historyIndex: historyIndex - 1,
        isSelecting: false,
        isEditing: false,
        isUndoing: true
      };
    }
    case ActionType.REDO_STEP: {
      const { historyIndex, historyData } = state;

      if (historyIndex === historyData.length - 1 || historyData.length === 0) {
        return { ...state, isUndoing: true };
      }

      const nextData = structuredClone(historyData[historyIndex + 1]);

      // Update sessionStorage
      setSessionStorage({
        dnd_history_index: historyIndex + 1
      });

      return {
        ...state,
        data: nextData,
        historyIndex: historyIndex + 1,
        isSelecting: false,
        isEditing: false,
        isUndoing: true,
      };
    }
    default:
      return state;
  }
};

export { initialState, initialRef, dndReducer }
