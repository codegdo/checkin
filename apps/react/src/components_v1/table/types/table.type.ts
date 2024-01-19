import { FieldType, KeyValue as KeyValueType } from "@/components_v1/types";

export type TableField = FieldType;

export type KeyValue = KeyValueType;

export interface TableState {
  data: KeyValue[];
}