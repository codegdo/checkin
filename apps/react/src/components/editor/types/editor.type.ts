import { DataType as FieldDataType, Field as FieldType } from "@/components/types";

export { FieldDataType as DataType };

export interface Field extends FieldType { }

export interface KeyValue {
  key: string;
  value: string;
}




