import { SortableState } from "../sortable.provider";
import { Field } from "../types";

interface InitialDataPayload {
  data: Field[]
}

interface MoveItemPayload {
  dragItem: Field;
  dropItem: Field;
  offset: string;
}

type ActionPayload = InitialDataPayload | MoveItemPayload;

export enum SortableActionType {
  INITIAL_DATA = 'INITIAL_DATA',
  MOVE_ITEM = 'MOVE_ITEM'
}

export interface SortableAction<T = unknown> {
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

      console.log(remainingItems);

      return { ...state, data: remainingItems };
      //return state;
    }
    default: return state;
  }
}