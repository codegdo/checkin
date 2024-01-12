import { ComponentField } from "@/components_v1/types";

export type CustomField = ComponentField;

export interface DndState {
  data: CustomField[] | [];
}

export interface DragDropReturn {
  type: string;
  data: DndState;
}