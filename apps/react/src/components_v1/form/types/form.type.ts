import { FieldType as FormFieldType, KeyValue as KeyValueType, ObjectValue } from "@/components_v1/types";

export type FieldType = FormFieldType;

export interface FormState { }

export type FormValues = Record<string, ObjectValue>

export interface FormResult {
  type: string;
  values: FormValues;
  isSubmit: boolean;
}

export type KeyValue = KeyValueType & {
  id: string | number;
  value: string | null;
  rowIndex?: number;
}