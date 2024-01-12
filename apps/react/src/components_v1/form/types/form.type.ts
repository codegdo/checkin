import { ComponentField } from "@/components_v1/types";

export type FormFieldType = ComponentField;

export interface FormState { }

export interface FormResult {
  type: string;
  values: Record<string, string>;
  isSubmit: boolean;
}