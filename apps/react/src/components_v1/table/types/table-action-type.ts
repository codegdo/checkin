import { KeyValue } from ".";

export enum TableActionType {
  UPDATE = 'UPDATE',
  RESET = 'reset'
}

type UpdatePayload = {
  rowData: KeyValue;
  rowIndex: number;
}

export type TablePayload = UpdatePayload;

export interface TableAction {
  type: keyof typeof TableActionType;
  payload?: TablePayload;
}