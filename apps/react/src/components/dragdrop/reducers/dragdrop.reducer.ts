import { DndField, DndState } from "../types";

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
  dragItem: DndField;
  dropItem: DndField | null;
  offset: string | null;
}

type ActionPayload = MoveItem;

export interface DragDropAction<T = ActionPayload> {
  type: string | ActionType;
  payload: T;
}

export const dragdropReducer = (state: DndState, { type, payload }: DragDropAction<ActionPayload>): DndState => {
  switch (type) {
    default: return state;
  }
}