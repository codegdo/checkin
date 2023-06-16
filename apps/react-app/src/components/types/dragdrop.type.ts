import { Dispatch } from "react";
import { ExtendedField, Field } from "./field.type";

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

type DropRef = Partial<Field> | null;
type DomRef = Record<string, HTMLDivElement | null>;

interface DndRef {
  drop: DropRef;
  domList: DomRef;
  touchItems: (string | number)[];
}

export interface DndContextValue {
  state: DndState;
  dispatch: Dispatch<DndAction>;
  dndRef: DndRef;
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