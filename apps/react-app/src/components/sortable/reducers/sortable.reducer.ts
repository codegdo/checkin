import { SortableState } from "../sortable.provider";
import { Field } from "../types";

interface InitialDataPayload {
  data: Field[]
}

type ActionPayload = InitialDataPayload;

export enum SortableActionType {
  INITIAL_DATA = 'INITIAL_DATA',
}

export interface SortableAction<T = any> {
  type: string | SortableActionType;
  payload: T;
}

export const sortableReducer = (state: SortableState, {type, payload}: SortableAction<ActionPayload>): any => {
  switch(type) {
    case SortableActionType.INITIAL_DATA: {
      const { data } = payload as InitialDataPayload;
      const initialData = [...data];
      return { ...state, data: initialData };
    }
    default: return state;
  }
}