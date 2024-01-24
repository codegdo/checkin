import { FieldType, KeyValue as KeyValueType, RowValue as RowValueType } from "@/components_v1/types";

export type Field = FieldType;
export type KeyValue = KeyValueType;
export type RowValue = RowValueType;
interface Modal {
  title: string;
  action: string;
}

export interface State {
  data: KeyValue[];
  modal: Modal | null;
}

export enum ActionType {
  ADD = 'ADD',
  CLOSE = 'CLOSE',
  UPDATE = 'UPDATE',
  REMOVE = 'REMOVE'
}

export type UpdatePayload = RowValue;
export type AddPayload = Modal;

export type Payload = AddPayload | UpdatePayload;

export interface Action {
  type: keyof typeof ActionType;
  payload?: Payload;
}

