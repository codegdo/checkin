import { Payload } from ".";

export enum ActionType {
  SELECT_TAB = 'SELECT_TAB',
}

export interface Action<T = Payload> {
  type: string | ActionType;
  payload?: T;
}
