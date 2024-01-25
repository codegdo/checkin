import { DndField } from "./dragdrop.type";

export enum DndActionType {
  // History Actions
  LOAD_HISTORY = 'LOAD_HISTORY',
  UNDO_STEP = 'UNDO_STEP',
  REDO_STEP = 'REDO_STEP',

  // Selection Actions
  SELECT_ITEM = 'SELECT_ITEM',
  UNSELECT_ITEM = 'UNSELECT_ITEM',
  CLEAR_SELECTION = 'CLEAR_SELECTION',

  // Editing Actions
  OPEN_EDITING = 'OPEN_EDITING',
  CLOSE_EDITING = 'CLOSE_EDITING',
  SAVE_CHANGES = 'SAVE_CHANGES',

  // Item Manipulation Actions
  ADD_ITEM = 'ADD_ITEM',
  MOVE_ITEM = 'MOVE_ITEM',
  CLONE_ITEM = 'CLONE_ITEM',
  REMOVE_ITEM = 'REMOVE_ITEM',
  UPDATE_ITEM = 'UPDATE_ITEM',
  RESET_ITEM = 'RESET_ITEM',
  RESET_ALL_ITEMS = 'RESET_ALL_ITEMS',

  // Grouping and Sorting Actions
  GROUP_ITEMS = 'GROUP_ITEMS',
  UNGROUP_ITEMS = 'UNGROUP_ITEMS',
  SORT_ITEMS_ASCENDING = 'SORT_ITEMS_ASCENDING',
  SORT_ITEMS_DESCENDING = 'SORT_ITEMS_DESCENDING',

  // Filtering Actions
  FILTER_ITEMS = 'FILTER_ITEMS',
  CLEAR_FILTERS = 'CLEAR_FILTERS',

  // Navigation Actions
  GO_TO_PAGE = 'GO_TO_PAGE',
  NEXT_PAGE = 'NEXT_PAGE',
  PREVIOUS_PAGE = 'PREVIOUS_PAGE',

  // Visualization Actions
  ZOOM_IN = 'ZOOM_IN',
  ZOOM_OUT = 'ZOOM_OUT',

  // Context Menu Actions
  OPEN_CONTEXT_MENU = 'OPEN_CONTEXT_MENU',
  CLOSE_CONTEXT_MENU = 'CLOSE_CONTEXT_MENU',
  CONTEXT_MENU_ITEM_CLICK = 'CONTEXT_MENU_ITEM_CLICK',
}

export interface DndAction {
  type: keyof typeof DndActionType | string;
  payload?: DndPayload;
}

export interface DndPayload {
  dragItem: DndField;
  dropItem: Partial<DndField> | null;
}