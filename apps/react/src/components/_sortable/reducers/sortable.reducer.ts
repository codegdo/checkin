import { SortableState } from "../sortable.provider";
import { DndField } from "../types";

interface InitialDataPayload {
  data: DndField[]
}

interface MoveItemPayload {
  dragItem: DndField;
  dropItem: DndField | null;
  offset: string | null;
}

type ActionPayload = InitialDataPayload | MoveItemPayload;

export enum SortableActionType {
  INITIAL_DATA = 'INITIAL_DATA',
  MOVE_ITEM = 'MOVE_ITEM'
}

export interface SortableAction<T = ActionPayload> {
  type: string | SortableActionType;
  payload: T;
}

export const sortableReducer = (state: SortableState, { type, payload }: SortableAction<ActionPayload>): SortableState => {
  switch (type) {
    case SortableActionType.INITIAL_DATA: {
      const { data } = payload as InitialDataPayload;
      const initialData = [...data];
      return { ...state, data: initialData };
    }
    case SortableActionType.MOVE_ITEM: {
      const p = payload as MoveItemPayload;
      console.log('MOVE ITEM', p);

      const data = [...state.data];
      const draggedItems = data.splice(2, 1);
      const remainingItems = data;

      console.log(draggedItems, remainingItems);

      return { ...state, data: remainingItems };
      //return state;
    }
    default: return state;
  }
}