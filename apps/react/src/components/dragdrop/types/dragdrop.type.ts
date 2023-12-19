import { Dispatch } from "react";

import { DataType as FieldDataType, Field as FieldType } from "@/components/types";
import { Action } from "../dragdrop.reducer";

export { FieldDataType as DataType };

export interface Field extends FieldType {
  selected?: boolean;
}

export interface KeyValue {
  key: string;
  value: string;
}


export interface State {
  dataSource: Field[];
  currentData: Field[];
  historyData: Field[][];
  historyIndex: number;
  isEditing?: boolean;
  isSelecting?: boolean;
}

interface CallbackEvent {
  onChange?: (keyValue: KeyValue) => void;
  onClick?: (keyValue: KeyValue) => void;
}

export interface CurrentRef {
  dropItem: Partial<Field> | null;
  selectedItem: { item?: Field, target?: Element, callback?: CallbackEvent } | null;
  elementRef: Record<string, HTMLDivElement | null>;
  coordinate: {
    x: number;
    y: number;
  };
  offset: string;
  direction: string;
  canDrop: boolean;
}

export interface ContextValue {
  current: CurrentRef;
  state: State;
  dispatch: Dispatch<Action>;
}