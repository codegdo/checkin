import { FieldType as FormFieldType, KeyValue as KeyValueType } from "@/components_v1/types";

export type FieldType = FormFieldType;

export interface FormState { }

export interface FormResult {
  type: string;
  values: Record<string, string | Record<string, string>>;
  isSubmit: boolean;
}

export interface KeyValue extends KeyValueType {
  rowIndex?: number;
}