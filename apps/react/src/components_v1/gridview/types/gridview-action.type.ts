import { Modal, RowValue } from "./gridview.type";

export enum ActionType {
  SORT_ASCENDING = 'SORT_ASCENDING',
  SORT_DESCENDING = 'SORT_DESCENDING',
  FILTER = 'FILTER',
  CLEAR_FILTER = 'CLEAR_FILTER',
  SELECT_ROW = 'SELECT_ROW',
  DESELECT_ROW = 'DESELECT_ROW',
  EDIT_ROW = 'EDIT_ROW',
  DELETE_ROW = 'DELETE_ROW',
  ADD_NEW_ROW = 'ADD_NEW_ROW',
  EXPORT_TO_CSV = 'EXPORT_TO_CSV',
  EXPORT_TO_PDF = 'EXPORT_TO_PDF',
  TOGGLE_COLUMN_VISIBILITY = 'TOGGLE_COLUMN_VISIBILITY',
  PIN_COLUMN = 'PIN_COLUMN',
  UNPIN_COLUMN = 'UNPIN_COLUMN',
  GROUP_ROWS = 'GROUP_ROWS',
  UNGROUP_ROWS = 'UNGROUP_ROWS',
  MOVE_COLUMN = 'MOVE_COLUMN',
  RESIZE_COLUMN = 'RESIZE_COLUMN',
  RESET_GRID = 'RESET_GRID',
  REFRESH_GRID = 'REFRESH_GRID',
}

export type UpdatePayload = RowValue;
export type AddPayload = Modal;

export type Payload = AddPayload | UpdatePayload;

export interface Action {
  type: keyof typeof ActionType;
  payload?: Payload;
}
