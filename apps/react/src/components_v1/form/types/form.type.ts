import { FieldType as FormFieldType, KeyValue as KeyValueType, ObjectValue, RowValue as RowValueType } from "@/components_v1/types";

export enum FormType {
  BASIC = 'BASIC',
  MULTI_STEP = 'MULTI_STEP',
  WIZARD = 'WIZARD',
  INLINE = 'INLINE',
  MODAL = 'MODAL',
  CUSTOM = 'CUSTOM',
}

export type FieldType = FormFieldType;

export interface FormState { }

export type FormValues = Record<string, ObjectValue>

export interface FormResult {
  type: string;
  values: FormValues;
  field?: FieldType;
  isSubmit: boolean;
}

export type KeyValue = KeyValueType;
export type RowValue = RowValueType;