import { FieldType, KeyValue as KeyValueType, RowValue as RowValueType } from "@/components_v1/types";

export enum GridViewType {
  TABLE = 'TABLE',
  CARD = 'CARD',
  LIST = 'LIST',
}

export type Field = FieldType;
export type KeyValue = KeyValueType;
export type RowValue = RowValueType;

export interface ModalConfig {
  type: string;
  url?: string;
  params?: Record<string, string>;
}

export interface State {
  data: KeyValue[];
  modal: ModalConfig | null;
}


