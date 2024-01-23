import { FieldType, KeyValue as KeyValueType, RowValue as RowValueType } from "@/components_v1/types";

export type Field = FieldType;
export type KeyValue = KeyValueType;
export type RowValue = RowValueType;

export interface GridViewState {
  data: KeyValue[];
}

