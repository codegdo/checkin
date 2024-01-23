import { RowValue } from ".";

export enum TableActionType {
  UPDATE = 'UPDATE',
  REMOVE = 'REMOVE'
}

type UpdatePayload = RowValue;

export type TablePayload = UpdatePayload;

export interface TableAction {
  type: keyof typeof TableActionType;
  payload?: TablePayload;
}