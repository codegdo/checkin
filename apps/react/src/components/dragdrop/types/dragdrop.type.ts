import { Dispatch } from "react";

import { DataType as FieldDataType, Field as FieldType } from "@/components/types";
import { Action } from "../reducers";

export { FieldDataType as DataType };

export interface Field extends FieldType {
  selected?: boolean;
}

export interface State {
  dataSource: Field[];
  currentData: Field[];
  historyData: Field[][];
  historyIndex: number;
  isEditing?: boolean;
  isSelecting?: boolean;
}

export interface CurrentRef {
  dropItem: Partial<Field> | null;
  selectedItem: Field | null;
  selectedRef: Element | null;
  elementRef: Record<string, HTMLDivElement | null>;
  eventRef: {onChange?: (keyValue: any) => void, onClick?: (keyValue: any) => void} | null;
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