import { Field, State } from "../types";

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
  dragItem: Field;
  dropItem: Field | null;
  offset: string | null;
}

type Payload = MoveItem;

export interface Action<T = Payload> {
  type: string | ActionType;
  payload: T;
}

export const dragdropReducer = (state: State, { type, payload }: Action<Payload>) => {
  switch (type) {
    default: return state;
  }
}