import { Dispatch } from "react";
import { Field } from "../../types";

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

export enum RestrictedDataType {
  AREA_AREA = 'area_area',

  SECTION_COLUMN = 'section_column',
  SECTION_BLOCK = 'section_block',
  SECTION_PLACEHOLDER = 'section_placeholder',
  SECTION_FIELD = 'section_field',
  SECTION_GRID = 'section_grid',
  SECTION_GROUP = 'section_group',
  SECTION_ELEMENT = 'section_element',

  COLUMN_BLOCK = 'column_block',
  COLUMN_PLACEHOLDER = 'column_placeholder',
  COLUMN_FIELD = 'column_field',
  COLUMN_GRID = 'column_grid',
  COLUMN_GROUP = 'column_group',
  COLUMN_ELEMENT = 'column_element',
}

type DropRef = Partial<Field> | null;
type DomRef = Record<string, HTMLDivElement | null>;

interface DndRef {
  drop: DropRef;
  domList: DomRef;
  touchItems: (string | number)[];
  nestedItems: string[];
  clientX: number;
  clientY: number;
  offset: string;
  canDrop: boolean;
}

export interface DndContextValue {
  state: DndState;
  dispatch: Dispatch<DndAction>;
  dndRef: DndRef;
}

export interface DndState {
  data: DndField[];
  item: DndField | null;
  isEditing: boolean;
  isSelecting: boolean;
}

export interface DndAction<T = unknown> {
  type: string | DndActionType;
  payload: T;
}

export interface DndField extends Field {
  selected?: boolean;
}

export type DndData = Field[];

