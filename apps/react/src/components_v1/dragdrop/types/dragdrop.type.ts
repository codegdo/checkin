import { FieldType } from "@/components_v1/types";

export enum DndType {
  EMAIL = 'EMAIL',
  FORM = 'FORM',
  TEMPLATE = 'TEMPLATE',
  FILE = 'FILE',
}

export type DndField = FieldType;

export interface DndState {
  data: DndField[];
  history: string[];
  historyIndex: number;
}

export interface DndResult {
  type: string;
  data: DndState;
}