import { FieldType, KeyValue as KeyValueType } from "@/components_v1/types";

export type TableField = FieldType;

export type KeyValue = KeyValueType & {
  id: string | number;
  value: string | null;
  rowIndex?: number;
}

export interface TableState { }