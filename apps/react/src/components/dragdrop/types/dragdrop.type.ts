import { Dispatch } from "react";

import { DataType as FieldDataType, Field as FieldType } from "@/components/types";
import { Action } from "../reducers";

export { FieldDataType as DataType };

export interface Field extends FieldType {
  selected?: boolean;
}

export interface State {
  data: Field[];
  history: Field[][];
  currentIndex: number;
  item?: Partial<Field> | null;
  isEditing?: boolean;
  isSelecting?: boolean;
}

export interface CurrentRef {
  dropItem: Partial<Field> | null;
  elementRefs: Record<string, HTMLDivElement | null>;
  coordinate: {
    x: number;
    y: number;
  }
  offset: string;
  direction: string;
  canDrop: boolean;
}

export interface ContextValue {
  state: State;
  dispatch: Dispatch<Action>;
  current: CurrentRef;
}