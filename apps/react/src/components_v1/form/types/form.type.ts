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

export interface FormSubmit {
  type: string;
  formData: FormValues;
  eventTarget?: FieldType;
  hasError?: boolean;
  requiredModal?: boolean;
}

export type KeyValue = KeyValueType;
export type RowValue = RowValueType;