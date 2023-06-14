import { Dispatch } from "react";
import { ExtendedField, Field } from "../../types";

export enum DndActionType {
  INITIAL_ITEMS = 'INITIAL_ITEMS',

  SELECT_ITEM = 'SELECT_ITEM',
  UNSELECT_ITEM = 'UNSELECT_ITEM',
  OPEN_EDITING_ITEM = 'OPEN_EDITING_ITEM',
  CLOSE_EDITING_ITEM = 'CLOSE_EDITING_ITEM',

  ADD_ITEM = 'ADD_ITEM',
  MOVE_ITEM = 'MOVE_ITEM',
  CLONE_ITEM = 'CLONE_ITEM',
  REMOVE_ITEM = 'REMOVE_ITEM',
  UPDATE_ITEM = 'UPDATE_ITEM',
  RESET_ITEM = 'UPDATE_RESET',
}

interface DndRef {
  drop: object;
  dom: object;
}

export interface DndContextValue {
  state: DndState;
  dispatch: Dispatch<DndAction>;
  dnd: DndRef;
}

export interface DndState {
  data: Field[];
  item: ExtendedField | null;
  isEditing: boolean;
  isSelecting: boolean;
}

export interface DndAction<T = any> {
  type: string | DndActionType;
  payload: T;
}