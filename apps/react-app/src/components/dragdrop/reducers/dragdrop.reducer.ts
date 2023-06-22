import { utils } from "@libs/shared-code";
import { ExtendedField, Field, DndAction, DndActionType, DndState, DataType } from "../../types";
import { defaultStatus } from "../dragdrop.provider";
import { dndHelper } from "../helpers";

interface InitialItemsPayload {
  data: Field[]
}

interface SelectItemPayload {
  item: ExtendedField;
}

interface MoveItemsPayload {
  dragItem: Field;
  dropItem: Field;
  offset: string;
}

type ActionPayload = InitialItemsPayload | SelectItemPayload | MoveItemsPayload | null;

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

    case DndActionType.MOVE_ITEM: {
      const { dragItem, dropItem, offset } = action.payload as MoveItemsPayload;

      const {
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

      const offsetPosition = dndHelper.findDropPosition({
        dragIndex,
        dropIndex,
        offset
      });

      const dragCount = dragDataType == DataType.BLOCK ? utils.countItems(dragData || [], (item) => item.dataType === DataType.BLOCK).length + 1 : 1;
      const dropCount = dropDataType == DataType.BLOCK ? utils.countItems(dropData || [], (item) => item.dataType === DataType.BLOCK).length : 0;

      //const dataType = `${dragDataType}-${dropDataType}`;

      // const newDropIndex = dndHelper.findDropIndex({
      //   dataType,
      //   dragCount,
      //   dropChildren,
      //   dropPosition: dropPosition ?? 0,
      //   offsetPosition
      // });

      const data = [...state.data];

      const draggedItems = data.splice(dragIndex, dragCount);
      const remainingItems = data;

      if (draggedItems.length > 0) {
        const firstDraggedItem = draggedItems[0];
        firstDraggedItem.parentId = offset == 'on-middle' ? dropId : dropParentId;
      }

      // from UP to DOWN
      if(dragIndex - dropIndex == -dragCount) {
        if(offsetPosition == 'from-top-over-top') {
          console.log(-1);
          return state;
        }
      } else if(dragIndex - dropIndex == dropCount + 1) {
        if(offsetPosition == 'from-bottom-over-bottom') {
          console.log(1);
          return state;
        }
      }

      console.log('0');

      if (dragIndex < dropIndex) { 
        console.log('from UP to DOWN');
        dropIndex = dropIndex + dropCount;
      } else if (offset == 'on-middle') {
        console.log('ON MIDDLE');
        dropIndex = dropIndex + 1;
      }

      remainingItems.splice(dropIndex, 0, ...draggedItems);

      remainingItems.forEach((item, index) => {
        item.position = index;
      });

      console.log('updatedData', remainingItems);

      return { ...state, data: [...remainingItems] };
    }

    default: return state;
  }
}