import { ComponentField } from "@/components_v1/types";

export type CustomField = ComponentField;

export interface FormReturn {
  type: string;
  formData: Record<string, string>;
  isSubmit: boolean;
}

export interface FormState {}