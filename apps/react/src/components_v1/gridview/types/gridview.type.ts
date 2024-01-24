import { FieldType, KeyValue as KeyValueType, RowValue as RowValueType } from "@/components_v1/types";

export type Field = FieldType;
export type KeyValue = KeyValueType;
export type RowValue = RowValueType;

export interface State {
  data: KeyValue[];
}

export enum ActionType {
  UPDATE = 'UPDATE',
  REMOVE = 'REMOVE'
}

type Update = RowValue;

export type Payload = Update;

export interface Action {
  type: keyof typeof ActionType;
  payload?: Payload;
}

