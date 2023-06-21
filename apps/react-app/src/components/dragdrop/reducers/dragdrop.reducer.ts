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
        dataType: dropDataType,
        data: dropData,
        position: dropPosition
      } = dropItem || {};

      const dragIndex = dragPosition ?? 0;
      const dropIndex = dropPosition ?? 0;

      const offsetPosition = dndHelper.findDropPosition({
        dragIndex,
        dropIndex,
        offset
      });

      const dragCount = dragDataType == DataType.BLOCK ? utils.countItems(dragData || [], (item) => item.dataType === DataType.BLOCK).length + 1 : 1;
      const dropChildren = dropDataType == DataType.BLOCK ? utils.countItems(dropData || [], (item) => item.dataType === DataType.BLOCK).length : 0;

      const dataType = `${dragDataType}-${dropDataType}`;

      //console.log('POSITION', offsetPosition, dragCount, dropCount, dataType);

      const newDropIndex = dndHelper.findDropIndex({
        dataType, 
        dragCount, 
        dropChildren,
        dropPosition: dropPosition ?? 0, 
        offsetPosition
      });



      const draggedItems = state.data.slice(dragIndex, dragIndex + dragCount);
      const remainingItems = state.data.filter((_, index) => index < dragIndex || index >= dragIndex + dragCount);

      console.log('draggedItems', draggedItems, remainingItems);

      return state;

      //const updatedData = dndHelper.moveItems(dragItem, dropItem);

      //return { ...state, data: updatedData };
    }

    default: return state;
  }
}