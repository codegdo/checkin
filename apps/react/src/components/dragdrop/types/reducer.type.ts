import { Field } from "./dragdrop.type";

export interface MoveItem {
  dragItem: Field;
  dropItem: Partial<Field> | null;
  offset: string;
}

export interface RemoveItem {
  removeItem: Partial<Field> | null | undefined
}

export interface UpdateItem {
  updatedItem: Partial<Field>
}

export interface LoadHistory {
  historyData: Field[][];
  historyIndex: number;
}

export interface UndoStep {
  dataSource: Field[]
}

export type Payload = LoadHistory | MoveItem | RemoveItem | UpdateItem | UndoStep;