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

    case DndActionType.ADD_ITEM: {
      const { dragItem, dropItem, offset } = action.payload as MoveItemsPayload;

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

      const dropIds = dropDataType === DataType.BLOCK ? utils.countItems(dropData || [], item => item.dataType === DataType.BLOCK) : [];
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

      const dragIds = dragDataType === DataType.BLOCK ? utils.countItems(dragData || [], item => item.dataType === DataType.BLOCK) : [];
      const dropIds = dropDataType === DataType.BLOCK ? utils.countItems(dropData || [], item => item.dataType === DataType.BLOCK) : [];

      const dragCount = dragIds.length + 1;
      const dropCount = dropIds.length;

      const data = [...state.data];
      const draggedItems = data.splice(dragIndex, dragCount);
      const remainingItems = data;

      // if (draggedItems.length > 0) {
      //   const [firstDraggedItem] = draggedItems;
      //   firstDraggedItem.parentId = offset === 'on-middle' ? dropId : dropParentId;
      // }

      // console.log('draggedItems', draggedItems);

      // draggedItems.find(item => {
      //   if (item.id == dragId) {
      //     item.parentId = offset === 'on-middle' ? dropId : dropParentId;
      //   }
      // });

      const [firstDraggedItem] = draggedItems;

      if (firstDraggedItem) {
        firstDraggedItem.parentId = offset === 'on-middle' ? dropId : dropParentId;
      }

      switch (offsetPosition) {
        case 'from-top-over-top':
          dropIndex -= dragCount;
          break;
        case 'from-top-over-bottom':
          dropIndex += dropCount + 1 - dragCount;
          break;
        case 'from-bottom-over-bottom':
          if (dropIds.includes(`${dragId}`)) {
            dropIndex += dropCount
          } else {
            dropIndex += dropCount + 1;
          }
          break;
        case 'over-middle':
          dropIndex += 1;
          break;
        default:
        // from-bottom-over-top
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