import { ActionType, Field } from ".";

export interface MoveItem {
  dragItem: Field;
  dropItem: Partial<Field> | null;
  offset: string;
}

export interface RemoveItem {
  removeItem: Partial<Field> | null | undefined
}

export interface LoadHistory {
  historyData: Field[][];
  historyIndex: number;
}

export type Payload = LoadHistory | MoveItem | RemoveItem;

export interface Action<T = Payload> {
  type: string | ActionType;
  payload?: T;
}