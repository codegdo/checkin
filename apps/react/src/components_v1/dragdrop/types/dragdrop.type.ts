import { FieldType } from "@/components_v1/types";

export enum DndType {
  EMAIL = 'EMAIL',
  FORM = 'FORM',
  TEMPLATE = 'TEMPLATE',
  FILE = 'FILE',
  DASHBOARD = 'DASHBOARD',
}

export enum DragType {
  AREA = 'AREA',
  SECTION = 'SECTION',
  BLOCK = 'BLOCK',
  PLACEHOLDER = 'PLACEHOLDER',
  FIELD = 'FIELD',
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