import { ComponentField } from "@/components_v1/types";

export type CustomField = ComponentField;


export interface DragDropReturn {
  type: string;
  dndData: Record<string, string>;
}