import { DataType } from "@/components/types";

import { DndField, DndAction, DndActionType, DndState, DropRef } from "../types";
import { defaultStatus } from "../dragdrop.provider";
import { dndHelper } from "../helpers";
import utils from "@/utils";

interface InitialItemsPayload {
  data: DndField[]
}

interface SelectItemPayload {
  item: DndField;
}

interface MoveItemsPayload {
  dragItem: DndField;
  dropItem: DropRef;
  offset: string;
}

export type ActionPayload = InitialItemsPayload | SelectItemPayload | MoveItemsPayload | null;

export const dndReducer = (state: DndState, action: DndAction<ActionPayload>): DndState => {
  switch (action.type) {

    case DndActionType.INITIAL_ITEMS: {
      const { data } = action.payload as InitialItemsPayload;
      const initialItems = [...data];
      return { ...state, data: initialItems };
    }

    case DndActionType.SELECT_ITEM: {
      const { item } = action.payload as SelectItemPayload;
      const selectItem = { ...item };
      return {
        ...state,
        item: selectItem,
        isSelecting: true,
        isEditing: false
      };
    }

    case DndActionType.UNSELECT_ITEM: {
      return { ...state, item: null, ...defaultStatus };
    }

    case DndActionType.OPEN_EDITING_ITEM: {
      return { ...state, isEditing: true };
    }

    case DndActionType.CLOSE_EDITING_ITEM: {
      return { ...state, isEditing: false };
    }

    case DndActionType.ADD_ITEM: {
      const { dragItem, dropItem, offset } = action.payload as MoveItemsPayload;

      const {
        dataType: dragDataType
      } = dragItem || {};

      const {
        id: dropId,
        dataType: dropDataType,
        data: dropData,
        parentId: dropParentId,
        position: dropPosition
      } = dropItem || {};

      if (!dragItem.id) {
        dragItem.id = dndHelper.generateNewId();
      }

      // set position equal -1 to determine new item
      const newItem = {
        ...dragItem,
        data: [],
        parentId: offset === 'on-middle' ? dropId : dropParentId,
        position: -1,
      };

      const hasChildren = dragDataType === DataType.BLOCK || dragDataType === DataType.SECTION;
      const condition = (item: DndField) => (item.dataType === DataType.BLOCK || item.dataType === DataType.SECTION);

      const dropIds = hasChildren ? utils.countItems(dropData || [], condition) : [];
      const dropCount = dropIds.length;

      let dropIndex = dropPosition ?? 0;

      switch (offset) {
        case 'on-bottom':
          dropIndex += dropCount + 1;
          break;
        case 'on-middle':
          dropIndex += 1;
          break;
        default:
        // on-top
      }

      if (dropDataType === DataType.AREA) {
        dropIndex = offset === 'on-bottom' ? state.data.length : 0;
        newItem.parentId = null;
      }

      const updatedData = [...state.data];

      updatedData.splice(dropIndex, 0, newItem);
      updatedData.forEach((item, index) => {
        item.position = index;
      });

      console.log('ADD_ITEM', updatedData);
      return { ...state, data: updatedData };
    }

    case DndActionType.MOVE_ITEM: {
      const { dragItem, dropItem, offset } = action.payload as MoveItemsPayload;

      const {
        id: dragId,
        dataType: dragDataType,
        data: dragData,
        position: dragPosition
      } = dragItem || {};

      const {
        id: dropId,
        dataType: dropDataType,
        data: dropData,
        parentId: dropParentId,
        position: dropPosition
      } = dropItem || {};

      const dragIndex = dragPosition ?? 0;
      let dropIndex = dropPosition ?? 0;

      const offsetPosition = dndHelper.findDropPosition({ dragIndex, dropIndex, offset });

      const hasChildren = dragDataType === DataType.BLOCK || dragDataType === DataType.SECTION;
      const condition = (item: DndField) => (item.dataType === DataType.BLOCK || item.dataType === DataType.SECTION);

      const dragIds = hasChildren ? utils.countItems(dragData || [], condition) : [];
      const dropIds = hasChildren ? utils.countItems(dropData || [], condition) : [];

      const dragCount = dragIds.length + 1;
      const dropCount = dropIds.length;

      const data = [...state.data];
      const draggedItems = data.splice(dragIndex, dragCount);
      const remainingItems = data;

      const [firstDraggedItem] = draggedItems;

      if (firstDraggedItem) {
        firstDraggedItem.parentId = offset === 'on-middle' ? dropId : dropParentId;
      }

      switch (offsetPosition) {
        case 'from-top-over-top':
          dropIndex -= dragCount;
          break;
        case 'from-top-over-bottom':
        case 'from-top-over-middle':
          dropIndex += dropCount + 1 - dragCount;
          break;
        case 'from-bottom-over-bottom':
          if (dropIds.includes(`${dragId}`)) {
            dropIndex += dropCount
          } else {
            dropIndex += dropCount + 1;
          }
          break;
        case 'from-bottom-over-middle':
          dropIndex += 1;
          break;
        default:
        // from-bottom-over-top
      }

      if (dropDataType === DataType.AREA) {
        dropIndex = offset === 'on-bottom' ? state.data.length : 0;
        firstDraggedItem.parentId = null;
      }

      remainingItems.splice(dropIndex, 0, ...draggedItems);
      remainingItems.forEach((item, index) => {
        item.position = index;
      });

      console.log('MOVE_ITEM', remainingItems);

      return { ...state, data: remainingItems };
    }

    default: return state;
  }
}