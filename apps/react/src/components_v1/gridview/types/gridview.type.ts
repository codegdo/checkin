import { FieldType, KeyValue as KeyValueType, RowValue as RowValueType } from "@/components_v1/types";

export enum GridViewType {
  TABLE = 'TABLE',
  CARD = 'CARD',
  LIST = 'LIST',
  CUSTOM = 'CUSTOM',
}

export type Field = FieldType;
export type KeyValue = KeyValueType;
export type RowValue = RowValueType;

export interface Modal {
  title: string;
  action: string;
}

export interface State {
  data: KeyValue[];
  modal: Modal | null;
}


