import { FieldType as FormFieldType } from "@/components_v1/types";

export type FieldType = FormFieldType;

export interface FormState { }

export interface FormResult {
  type: string;
  values: Record<string, string | Record<string, string>>;
  isSubmit: boolean;
}
