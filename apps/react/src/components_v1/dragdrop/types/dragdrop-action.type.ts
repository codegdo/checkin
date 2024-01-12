import { CustomField } from "./dragdrop.type";

export enum DndActionType {
  LOAD_HISTORY = 'LOAD_HISTORY',

  SELECT_ITEM = 'SELECT_ITEM',
  UNSELECT_ITEM = 'UNSELECT_ITEM',
  OPEN_EDITING = 'OPEN_EDITING',
  CLOSE_EDITING = 'CLOSE_EDITING',

  ADD_ITEM = 'ADD_ITEM',
  MOVE_ITEM = 'MOVE_ITEM',
  CLONE_ITEM = 'CLONE_ITEM',
  REMOVE_ITEM = 'REMOVE_ITEM',
  UPDATE_ITEM = 'UPDATE_ITEM',
  RESET_ITEM = 'RESET_ITEM',

  UNDO_STEP = 'UNDO_STEP',
  REDO_STEP = 'REDO_STEP',
}

export interface DndAction {
  type: keyof typeof DndActionType;
  payload?: DndPayload;
}

export interface DndPayload {
  dragItem: CustomField;
  dropItem: Partial<CustomField> | null;
}