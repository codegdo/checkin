import { RowValue } from ".";

export enum TableActionType {
  UPDATE = 'UPDATE',
  RESET = 'reset'
}

type UpdatePayload = RowValue;

export type TablePayload = UpdatePayload;

export interface TableAction {
  type: keyof typeof TableActionType;
  payload?: TablePayload;
}