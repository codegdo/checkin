import { Payload } from "./reducer.type";

export enum ActionType {
  SELECT_TAB = 'SELECT_TAB',
  UPDATE_VALUE = 'UPDATE_VALUE'
}

export interface Action<T = Payload> {
  type: string | ActionType;
  payload?: T;
}
