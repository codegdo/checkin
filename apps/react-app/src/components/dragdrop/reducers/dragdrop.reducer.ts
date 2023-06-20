import { utils } from "@libs/shared-code";
import { ExtendedField, Field, DndAction, DndActionType, DndState } from "../../types";
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

      console.log(dragItem, dropItem, offset);
      //const 
      const dropIndex = dndHelper.findDropIndex(dragItem, dropItem, offset);

      return state;

      //const updatedData = dndHelper.moveItems(dragItem, dropItem);

      //return { ...state, data: updatedData };
    }

    default: return state;
  }
}