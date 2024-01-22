import { FieldType, KeyValue as KeyValueType, RowValue as RowValueType } from "@/components_v1/types";

export type TableField = FieldType;

export type KeyValue = KeyValueType;
export type RowValue = RowValueType;

export interface TableState {
  data: KeyValue[];
}

