import { ComponentField } from "@/components_v1/types";

export type DndField = ComponentField;

export interface DndState {
  data: DndField[];
  history: string[];
  historyIndex: number;
}

export interface DndResult {
  type: string;
  data: DndState;
}