import { FieldType, KeyValue as KeyValueType } from "@/components_v1/types";

export type Field = FieldType;

export interface KeyValue extends KeyValueType {
  rowIndex?: number;
}