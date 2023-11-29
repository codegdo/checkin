import { SortableField, SortableState } from "../types";

enum ActionType {
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

interface MoveItem {
  dragItem: SortableField;
  dropItem: SortableField | null;
  offset: string | null;
}

type ActionPayload = MoveItem;

export interface SortableAction<T = ActionPayload> {
  type: string | ActionType;
  payload: T;
}

export const sortableReducer = (state: SortableState, { type, payload }: SortableAction<ActionPayload>): SortableState => {
  switch (type) {
    default: return state;
  }
}